import { EntityBase } from './entity-base';
import { User } from './user';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Permission extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Permission) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    user_guid: string;
    relationships: number;
    partnerships: number;
    chat: boolean;
    tests: string;
    timestamp: any;
    User: User;
}

