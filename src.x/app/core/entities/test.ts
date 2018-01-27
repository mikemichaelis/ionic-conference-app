import { EntityBase } from './entity-base';
import { Session } from './session';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Test extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Test) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    relationship_type: string;
    name: string;
    created: Date;
    Sessions: Session[];
}

