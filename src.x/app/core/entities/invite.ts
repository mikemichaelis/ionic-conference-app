import { EntityBase } from './entity-base';
import { Relationship } from './relationship';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Invite extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Invite) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    relationship_guid: string;
    email: string;
    phone: string;
    message: string;
    created: Date;
    created_by: string;
    timestamp: any;
    Relationship: Relationship;
}

