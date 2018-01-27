import { EntityBase } from './entity-base';
import { Session } from './session';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Answer extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Answer) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    session_guid: string;
    question: number;
    value: number;
    created: Date;
    created_by: string;
    timestamp: any;
    Session: Session;
}

