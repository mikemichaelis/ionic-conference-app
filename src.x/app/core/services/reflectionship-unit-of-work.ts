import { Injectable } from '@angular/core';
import { EntityManager } from 'breeze-client';
import { Storage } from '@ionic/storage';
// import { Predicate } from 'breeze-client';

import { EntityManagerProvider, UnitOfWork, IRepository, EntityFactory } from './common';

import { Answer, Day, Emotion, Event, Feeling, Memory, Relationship, Session, Test, Thought, User } from '../entities/entity-model';

export class UserFactory extends EntityFactory<User> {
    constructor(manager: EntityManager) {
        super('User', manager)
    }

    create(config: { ext_id: string }): Promise<User> {
        return super.create(config).then(user => {
            return user;
        });
    }
}

export class RelationshipFactory extends EntityFactory<Relationship> {
    constructor(manager: EntityManager) {
        super('Relationship', manager)
    }
    create(config: { user_guid: string,  type: string, name: string, active: boolean, private: boolean,  start: Date } ): Promise<Relationship> {
        return super.create(config).then(relationship => {
            return relationship;
        });
    }
}

export class DayFactory extends EntityFactory<Day> {

        constructor(manager: EntityManager) {
            super('Day', manager)
        }

        create(config: { note: string, relationship_guid: string }): Promise<Day> {
            return super.create(config).then(session => {
                return session;
            });
        }
    }

export class SessionFactory extends EntityFactory<Session> {

    constructor(manager: EntityManager) {
        super('Session', manager)
    }

    create(config: { test_guid: string, relationship_guid: string, day_guid: string }): Promise<Session> {
        return super.create(config).then(session => {
            return session;
        });
    }
}

export class AnswerFactory extends EntityFactory<Answer> {

        constructor(manager: EntityManager) {
            super('Answer', manager)
        }
        ;

        create(config: { session_guid: string, question: number, value: number }): Promise<Answer> {
            return super.create(config).then(session => {
                return session;
            });
        }
    }

@Injectable()
export class ReflectionshipUnitOfWork extends UnitOfWork {

    answerSet: IRepository<Answer>;
    daySet: IRepository<Day>;
    emotionSet: IRepository<Emotion>;
    eventSet: IRepository<Event>;
    feelingSet: IRepository<Feeling>;
    memorySet: IRepository<Memory>;
    relationshipSet: IRepository<Relationship>;
    sessionSet: IRepository<Session>;
    testSet: IRepository<Test>;
    thoughtSet: IRepository<Thought>;
    userSet: IRepository<User>

    userFactory: UserFactory;
    relationshipFactory: RelationshipFactory;
    dayFactory: DayFactory;
    sessionFactory: SessionFactory;
    answerFactory: AnswerFactory;

    constructor(emProvider: EntityManagerProvider, storage: Storage) {
        super(emProvider, storage);


        this.emotionSet = this.createRepository<Emotion>('Emotion', 'EmotionSet');
        this.eventSet = this.createRepository<Event>('Event', 'EventSet');
        this.feelingSet = this.createRepository<Feeling>('Feeling', 'FeelingSet');
        this.memorySet = this.createRepository<Memory>('Memory', 'MemorySet');
        this.relationshipSet = this.createRepository<Relationship>('Relationship', 'RelationshipSet');
        this.relationshipFactory = new RelationshipFactory(this.manager);
        this.thoughtSet = this.createRepository<Thought>('Thought', 'ThoughtSet');

        this.sessionSet = this.createRepository<Session>('Session', 'SessionSet');
        this.sessionFactory = new SessionFactory(this.manager);
        this.answerSet = this.createRepository<Answer>('Answer', 'AnswerSet');
        this.answerFactory = new AnswerFactory(this.manager);

        this.dayFactory = new DayFactory(this.manager);
        this.daySet = this.createRepository<Day>('Day', 'DaySet');

        this.userFactory = new UserFactory(this.manager);
        this.userSet = this.createRepository<User>('User', 'UserSet');

        this.testSet = this.createRepository<Test>('Test', 'TestSet');
    }
}