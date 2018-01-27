import { EntityBase } from './entity-base';
import { Day } from './day';
import { Feeling } from './feeling';
import { Thought } from './thought';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Memory extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Memory) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    day_guid: string;
    updated: Date;
    updated_by: string;
    created: Date;
    created_by: string;
    timestamp: any;
    Day: Day;
    Feelings: Feeling[];
    Thoughts: Thought[];
}

