import { EntityBase } from './entity-base';
import { Answer } from './answer';
import { Day } from './day';
import { Test } from './test';
import { Relationship } from './relationship';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Session extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Session) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    relationship_guid: string;
    day_guid: string;
    test_guid: string;
    complete: boolean;
    score: number;
    updated: Date;
    updated_by: string;
    created: Date;
    created_by: string;
    timestamp: any;
    Test: Test;
    Day: Day;
    Answers: Answer[];
    Relationship: Relationship;
}

