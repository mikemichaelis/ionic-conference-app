import { EntityBase } from './entity-base';
import { Breadcrumb } from './breadcrumb';
import { Feeling } from './feeling';
import { Memory } from './memory';
import { Note } from './note';
import { Picture } from './picture';
import { Session } from './session';
import { Thought } from './thought';
import { Relationship } from './relationship';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Day extends EntityBase {

    /// <code> Place custom code between <code> tags
    /// [Initializer]
    static initializer(entity: Day) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    guid: string;
    relationship_guid: string;
    datetimme: Date;
    updated: Date;
    updated_by: string;
    created: Date;
    created_by: string;
    timestamp: any;
    Sessions: Session[];
    Feelings: Feeling[];
    Memories: Memory[];
    Notes: Note[];
    Pictures: Picture[];
    Thoughts: Thought[];
    Breadcrumbs: Breadcrumb[];
    Relationship: Relationship;
}

