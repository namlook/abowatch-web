export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  greetings?: Maybe<Scalars['String']>;
  words?: Maybe<Array<Scalars['String']>>;
  counter: Scalars['Int'];
};


export type QueryGreetingsArgs = {
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  increment: Scalars['Int'];
};


export type MutationIncrementArgs = {
  step: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CounterQueryVariables = Exact<{ [key: string]: never; }>;


export type CounterQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'counter'>
);

export type GreetingsQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GreetingsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'greetings'>
);

export type IncrementMutationVariables = Exact<{
  step: Scalars['Int'];
}>;


export type IncrementMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'increment'>
);


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    