import * as functions from 'firebase-functions';
import * as firestore from '@google-cloud/firestore';
import { TypedDocumentSnapshot, TypedQueryDocumentSnapshot } from 'typesafe-node-firestore';

interface TypedEventContext<T extends { [option: string]: any }> extends functions.EventContext {
  readonly params: T;
};

export interface TypedDocumentBuilder<T extends firestore.DocumentData, U extends { [option: string]: any } = {}> extends functions.firestore.DocumentBuilder {
  onWrite(handler: (change: functions.Change<TypedDocumentSnapshot<T>>, context: TypedEventContext<U>) => PromiseLike<any> | any): functions.CloudFunction<functions.Change<firestore.DocumentSnapshot>>;
  onUpdate(handler: (change: functions.Change<TypedQueryDocumentSnapshot<T>>, context: TypedEventContext<U>) => PromiseLike<any> | any): functions.CloudFunction<functions.Change<firestore.QueryDocumentSnapshot>>;
  onCreate(handler: (snapshot: TypedQueryDocumentSnapshot<T>, context: TypedEventContext<U>) => PromiseLike<any> | any): functions.CloudFunction<firestore.QueryDocumentSnapshot>;
  onDelete(handler: (snapshot: TypedQueryDocumentSnapshot<T>, context: TypedEventContext<U>) => PromiseLike<any> | any): functions.CloudFunction<firestore.QueryDocumentSnapshot>;
};