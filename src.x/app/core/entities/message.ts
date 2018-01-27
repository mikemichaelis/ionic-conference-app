import { EntityBase } from './entity-base';
import { User } from './user';
import { Relationship } from './relationship';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Message extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Message) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    sender_guid: string;
    receiver_guid: string;
    relationship_guid: string;
    html: string;
    read: boolean;
    read_on: Date;
    created_by: string;
    created: Date;
    timestamp: any;
    Sender: User;
    Receiver: User;
    Relationship: Relationship;
}

