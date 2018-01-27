import { EntityBase } from './entity-base';
import { Day } from './day';
import { Session } from './session';
import { Invite } from './invite';
import { User } from './user';
import { RelationshipType } from './relationship-type';
import { Message } from './message';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Relationship extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Relationship) { }

    public get days(): number {

        if(!this.start) return 0;

        // Calculate the difference in milliseconds
        var difference_ms = Date.now() - this.start.getTime();

        // Convert back to days and return
        return Math.round(difference_ms/(1000*60*60*24));
    }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    user_guid: string;
    partner_guid: string;
    type: string;
    active: boolean;
    private: boolean;
    name: string;
    start: Date;
    end: Date;
    picture_url: string;
    background_url: string;
    updated: Date;
    updated_by: string;
    created_by: string;
    created: Date;
    timestamp: any;
    Day: Day[];
    Invite: Invite[];
    Message: Message[];
    User: User;
    RelationshipType: RelationshipType;
    User1: User;
    Session: Session[];
}

