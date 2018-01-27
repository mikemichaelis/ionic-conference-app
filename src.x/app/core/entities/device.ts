import { EntityBase } from './entity-base';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Device extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Device) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    user_guid: string;
    uuid: string;
    cordova: string;
    model: string;
    platform: string;
    version: string;
    manufacturer: string;
    isVirtual: boolean;
    serial: string;
}

