# typesafe-functions

[![npm version](https://badge.fury.io/js/typesafe-functions.svg)](https://badge.fury.io/js/typesafe-functions)

A library of typescript interfaces that extend existing firebase functions classes, adding type safety and a better autocomplete experience.

Depends on [typesafe-node-firestore](https://github.com/mozilla-fxa/typesafe-node-firestore).

## Installation

```shell
yarn add typesafe-functions --dev
```

## Usage

You most likely want to import `TypedDocumentBuilder` and define functions document.

```typescript
import * as functions from 'firebase-functions';
import { TypedDocumentBuilder } from 'typesafe-functions';

interface Author {
  penName: string;
  shortBiography: string;
  posts: string[];
};

interface Params {
  authorId: string;
};

const document = functions.firestore.document('authors/{authorId}') as TypedDocumentBuilder<Author, Params>;
```

And trigger your typesafe firestore events.

```typescript
document.onWrite((change, context) => {
  console.log(change.before.data()) //=>  Author | undefined
  console.log(change.after.data()) //=>  Author | undefined
  console.log(context.params.authorId) //=>  string
});

document.onChange((change, context) => {
  console.log(change.before.data()) //=>  Author | undefined
  console.log(change.after.data()) //=>  Author | undefined
  console.log(context.params.authorId) //=>  string
});

document.onWrite((snapshot, context) => {
  console.log(snapshot.data()) //=>  Author
  console.log(context.params.authorId) //=>  string
});

document.onDelete((snapshot, context) => {
  console.log(snapshot.data()) //=>  Author
  console.log(context.params.authorId) //=>  string
});
```

### License

typesafe-functions is [MIT licensed](./LICENSE).