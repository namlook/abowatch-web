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

export enum BillingMode {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Quaterly = 'quaterly',
  Yearly = 'yearly'
}

export type Subscription = {
  __typename?: 'Subscription';
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  billingMode: BillingMode;
  dividedBy: Scalars['Int'];
};

export type SubscriptionInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  billingMode: BillingMode;
  dividedBy: Scalars['Int'];
};

export type SaveSubscriptionResponse = {
  __typename?: 'SaveSubscriptionResponse';
  subscription: Subscription;
};

export type Query = {
  __typename?: 'Query';
  subscriptions?: Maybe<Array<Subscription>>;
  subscription?: Maybe<Subscription>;
};

export type QuerySubscriptionArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  saveSubscription?: Maybe<SaveSubscriptionResponse>;
};

export type MutationSaveSubscriptionArgs = {
  input: SubscriptionInput;
  id?: Maybe<Scalars['ID']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type SubscriptionFormQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type SubscriptionFormQuery = (
  { __typename?: 'Query' }
  & { subscription?: Maybe<(
    { __typename?: 'Subscription' }
    & Pick<Subscription, 'id' | 'name' | 'price' | 'billingMode' | 'dividedBy'>
  )>; }
);

export type SubscriptionFormSaveSubscriptionMutationVariables = Exact<{
  input: SubscriptionInput;
  id?: Maybe<Scalars['ID']>;
}>;

export type SubscriptionFormSaveSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & { saveSubscription?: Maybe<(
    { __typename?: 'SaveSubscriptionResponse' }
    & { subscription: (
      { __typename?: 'Subscription' }
      & Pick<Subscription, 'id'>
    ); }
  )>; }
);

export type SubscriptionsListQueryVariables = Exact<{ [key: string]: never }>;

export type SubscriptionsListQuery = (
  { __typename?: 'Query' }
  & { subscriptions?: Maybe<Array<(
    { __typename?: 'Subscription' }
    & Pick<Subscription, 'id' | 'name' | 'price' | 'dividedBy' | 'billingMode'>
  )>>; }
);

export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[];
        };
      }
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
