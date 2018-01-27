import { EntityBase } from './entity-base';
import { Day } from './day';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Breadcrumb extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Breadcrumb) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    day_guid: string;
    datetime: Date;
    lat: number;
    lon: number;
    created: Date;
    created_by: string;
    timestamp: any;
    Day: Day;
}

