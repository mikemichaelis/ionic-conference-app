import { MetadataStore } from 'breeze-client';

import { Answer } from './answer';
import { Breadcrumb } from './breadcrumb';
import { Day } from './day';
import { Emotion } from './emotion';
import { Event } from './event';
import { Feeling } from './feeling';
import { Memory } from './memory';
import { Monitor } from './monitor';
import { Note } from './note';
import { Picture } from './picture';
import { Session } from './session';
import { Test } from './test';
import { Thought } from './thought';
import { Invite } from './invite';
import { User } from './user';
import { Permission } from './permission';
import { RelationshipType } from './relationship-type';
import { Message } from './message';
import { Device } from './device';
import { Relationship } from './relationship';

export class RegistrationHelper {

    static register(metadataStore: MetadataStore) {
        metadataStore.registerEntityTypeCtor('Answer', Answer, Answer.initializer);
        metadataStore.registerEntityTypeCtor('Breadcrumb', Breadcrumb, Breadcrumb.initializer);
        metadataStore.registerEntityTypeCtor('Day', Day, Day.initializer);
        metadataStore.registerEntityTypeCtor('Emotion', Emotion, Emotion.initializer);
        metadataStore.registerEntityTypeCtor('Event', Event, Event.initializer);
        metadataStore.registerEntityTypeCtor('Feeling', Feeling, Feeling.initializer);
        metadataStore.registerEntityTypeCtor('Memory', Memory, Memory.initializer);
        metadataStore.registerEntityTypeCtor('Monitor', Monitor, Monitor.initializer);
        metadataStore.registerEntityTypeCtor('Note', Note, Note.initializer);
        metadataStore.registerEntityTypeCtor('Picture', Picture, Picture.initializer);
        metadataStore.registerEntityTypeCtor('Session', Session, Session.initializer);
        metadataStore.registerEntityTypeCtor('Test', Test, Test.initializer);
        metadataStore.registerEntityTypeCtor('Thought', Thought, Thought.initializer);
        metadataStore.registerEntityTypeCtor('Invite', Invite, Invite.initializer);
        metadataStore.registerEntityTypeCtor('User', User, User.initializer);
        metadataStore.registerEntityTypeCtor('Permission', Permission, Permission.initializer);
        metadataStore.registerEntityTypeCtor('RelationshipType', RelationshipType, RelationshipType.initializer);
        metadataStore.registerEntityTypeCtor('Message', Message, Message.initializer);
        metadataStore.registerEntityTypeCtor('Device', Device, Device.initializer);
        metadataStore.registerEntityTypeCtor('Relationship', Relationship, Relationship.initializer);
    }
}
