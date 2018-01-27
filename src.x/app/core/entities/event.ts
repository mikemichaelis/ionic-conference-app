import { EntityBase } from './entity-base';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Event extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Event) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    memory_id: number;
    activity_id: number;
    note: string;
    value: number;
    created: Date;
    created_by: string;
}

