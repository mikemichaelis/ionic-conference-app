// import { Metadata } from './../entities/metadata';
import { Injectable} from '@angular/core';
import { config, EntityManager, DataService, MetadataStore, EntityType, DataProperty } from 'breeze-client';
import remove from 'lodash-es/remove';
import includes from 'lodash-es/includes';

// Import required breeze adapters. Rollup.js requires the use of breeze.base.debug.js, which doesn't include
// the breeze adapters.
import 'breeze-client/breeze.dataService.webApi';
import 'breeze-client/breeze.modelLibrary.backingStore';
import 'breeze-client/breeze.uriBuilder.json';
import 'breeze-client/breeze.uriBuilder.odata';

import { AjaxAngularAdapter } from 'breeze-bridge-angular';
import { AuthHttp } from 'angular2-jwt';
import { EntityTypeAnnotation } from '../entities/entity-type-annotation';
import { RegistrationHelper } from '../entities/registration-helper';

import * as globals from '../../../globals';

// The EntityManagerProvider manages a static master manager and a per instance sandbox manager.
@Injectable()
export class EntityManagerProvider {

    private static _preparePromise: Promise<any>;
    private static _masterManager: EntityManager;

    constructor(public authHttp: AuthHttp) {
    }

    prepare(metadata: string): Promise<any> {
        if (!EntityManagerProvider._preparePromise) {

            // Inject AuthHttp in
            config.registerAdapter('ajax', () => new AjaxAngularAdapter(<any>this.authHttp));
            config.initializeAdapterInstance('ajax', AjaxAngularAdapter.adapterName, true);

            let dataService = new DataService({
                serviceName: globals.api_url,
                hasServerMetadata: false
            });

            let masterManager = EntityManagerProvider._masterManager = new EntityManager({
                dataService: dataService,
            });

            masterManager.metadataStore.importMetadata(metadata);
            RegistrationHelper.register(masterManager.metadataStore);
            this.registerAnnotations(masterManager.metadataStore);

            return EntityManagerProvider._preparePromise = Promise.resolve();
        }

        return EntityManagerProvider._preparePromise;
    }

    reset(manager: EntityManager): void {
        if (manager) {
            manager.clear();
            this.seedManager(manager);
        }
    }

    newManager(): EntityManager {
        let manager = EntityManagerProvider._masterManager.createEmptyCopy();
        this.seedManager(manager);
        return manager;
    }

    private seedManager(manager: EntityManager) {
        manager.importEntities(EntityManagerProvider._masterManager.exportEntities(null, { asString: false, includeMetadata: false }));
    }

    private registerAnnotations(metadataStore: MetadataStore) {
        metadataStore.getEntityTypes().forEach((t: EntityType) => {
            let et = <EntityType>t;
            let ctor = <any>et.getCtor();
            if (ctor && ctor.getEntityTypeAnnotation) {
                let etAnnotation = <EntityTypeAnnotation>ctor.getEntityTypeAnnotation();
                et.validators.push(...etAnnotation.validators);
                etAnnotation.propertyAnnotations.forEach((pa) => {
                    let prop = et.getProperty(pa.propertyName);
                    prop.validators.push(...pa.validators);
                    prop.displayName = pa.displayName;
                });
                this.ignoreForSerialization(metadataStore, t, ...etAnnotation.ignoreForSerialization);
            }
        });
    }

    private ignoreForSerialization(metadataStore: MetadataStore, typeInfo: string | EntityType, ...propertyNames: string[]) {
        if (!propertyNames || propertyNames.length == 0) return;

        let entityType = typeof (typeInfo) === 'string' ? <EntityType>metadataStore.getEntityType(<string>typeInfo) : <EntityType>typeInfo;

        // Recursively walk the inheritance tree and ignore the same properties for all parent types
        let parentTypes = metadataStore.getEntityTypes().filter(type => {
            let parentType = <EntityType>type;
            return parentType.baseEntityType && parentType.baseEntityType === entityType;
        });
        parentTypes.forEach((parentType: EntityType) => this.ignoreForSerialization(metadataStore, parentType, ...propertyNames));

        // Now ignore for current type
        let dps = propertyNames.map(propertyName => {
            let dp = entityType.getDataProperty(propertyName);
            if (!dp) {
                console.warn(`No data property with name ${propertyName} found in entity type ${entityType.shortName}`);
            }
            return dp;
        });
        // Get all the nulls out
        remove(dps, dp => !dp);

        // Get existing ignored properties
        let ignoredProperties: DataProperty[] = (<any>entityType).$ignoredProperties;

        // Signals that we've already installed our custom serializerFn
        if (ignoredProperties) {
            remove(dps, dp => includes(ignoredProperties, dp))
            ignoredProperties = ignoredProperties.concat(dps);
        } else {
            // First ignored properties for this entity type
            ignoredProperties = dps;
            let origSerializerFn: (dataProperty: DataProperty, value: any) => any = (<any>entityType).serializerFn;
            entityType.setProperties({
                serializerFn: (dp, value) => {
                    if (includes((<any>entityType).$ignoredProperties, dp)) {
                        // Return undefined if property is ignored for serialization
                        return undefined;
                    }

                    return origSerializerFn ? origSerializerFn(dp, value) : value;
                }
            });
        }
        (<any>entityType).$ignoredProperties = ignoredProperties;
    }
}

