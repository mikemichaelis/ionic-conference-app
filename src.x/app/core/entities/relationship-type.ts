import { EntityBase } from './entity-base';
import { Test } from './test';
import { Relationship } from './relationship';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class RelationshipType extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: RelationshipType) { }
    /// </code>

    // Generated code. Do not place code below this line.
    type: string;
    Tests: Test[];
    Relationship: Relationship[];
}

