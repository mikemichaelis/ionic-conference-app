import { EntityBase } from './entity-base';
import { Day } from './day';
import { Memory } from './memory';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Feeling extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Feeling) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    day_guid: string;
    memory_guid: string;
    note: string;
    created_by: string;
    created: Date;
    timestamp: any;
    Day: Day;
    Memory: Memory;
}

