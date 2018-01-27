import { EntityBase } from './entity-base';
import { User } from './user';
import { Relationship } from './relationship';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Monitor extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Monitor) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    user_guid: string;
    relationship1_guid: string;
    relationship2_guid: string;
    updated: Date;
    updated_by: string;
    created: Date;
    created_by: string;
    timestamp: any;
    User: User;
    Relationship: Relationship;
    Relationship1: Relationship;
}

