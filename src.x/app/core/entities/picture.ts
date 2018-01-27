import { EntityBase } from './entity-base';
import { Day } from './day';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Picture extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Picture) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    day_guid: string;
    datetime: Date;
    name: string;
    created: Date;
    created_by: string;
    timestamp: any;
    Day: Day;
}

