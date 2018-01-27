import { EntityBase } from './entity-base';
import { Permission } from './permission';
import { Message } from './message';
import { Relationship } from './relationship';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class User extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: User) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    ext_id: string;
    status: string;
    active: boolean;
    pin: string;
    private_pin: string;
    locale: string;
    email: string;
    email_verified: boolean;
    nickname: string;
    name: string;
    given_name: string;
    family_name: string;
    gender: string;
    orientation: string;
    picture_url: string;
    background_url: string;
    theme_id: number;
    push: boolean;
    logout: boolean;
    updated: Date;
    updated_by: string;
    created: Date;
    timestamp: any;
    Permission: Permission;
    Outbox: Message[];
    Inbox: Message[];
    Relationship: Relationship[];
    Relationship1: Relationship[];
}

