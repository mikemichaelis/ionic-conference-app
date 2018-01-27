import { EntityBase } from './entity-base';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Emotion extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Emotion) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    emotionEnum: number;
    feeling_id: number;
    value: number;
    created: Date;
    created_by: string;
}

