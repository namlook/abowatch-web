import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type ReactiveFunction<TParam> = () => TParam;
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

export const SubscriptionFormDocument = gql`
    query SubscriptionForm($id: ID) {
  subscription(id: $id) {
    id
    name
    price
    billingMode
    dividedBy
  }
}
    `;

/**
 * __useSubscriptionFormQuery__
 *
 * To run a query within a Vue component, call `useSubscriptionFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionFormQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSubscriptionFormQuery({
 *   id: // value for 'id'
 * });
 */
export function useSubscriptionFormQuery(variables?: SubscriptionFormQueryVariables | VueCompositionApi.Ref<SubscriptionFormQueryVariables> | ReactiveFunction<SubscriptionFormQueryVariables>, options: VueApolloComposable.UseQueryOptions<SubscriptionFormQuery, SubscriptionFormQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SubscriptionFormQuery, SubscriptionFormQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SubscriptionFormQuery, SubscriptionFormQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SubscriptionFormQuery, SubscriptionFormQueryVariables>(SubscriptionFormDocument, variables, options);
}
export type SubscriptionFormQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SubscriptionFormQuery, SubscriptionFormQueryVariables>;
export const SubscriptionFormSaveSubscriptionDocument = gql`
    mutation SubscriptionFormSaveSubscription($input: SubscriptionInput!, $id: ID) {
  saveSubscription(input: $input, id: $id) {
    subscription {
      id
    }
  }
}
    `;

/**
 * __useSubscriptionFormSaveSubscriptionMutation__
 *
 * To run a mutation, you first call `useSubscriptionFormSaveSubscriptionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionFormSaveSubscriptionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSubscriptionFormSaveSubscriptionMutation({
 *   variables: {
 *     input: // value for 'input'
 *     id: // value for 'id'
 *   },
 * });
 */
export function useSubscriptionFormSaveSubscriptionMutation(options: VueApolloComposable.UseMutationOptions<SubscriptionFormSaveSubscriptionMutation, SubscriptionFormSaveSubscriptionMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SubscriptionFormSaveSubscriptionMutation, SubscriptionFormSaveSubscriptionMutationVariables>>) {
  return VueApolloComposable.useMutation<SubscriptionFormSaveSubscriptionMutation, SubscriptionFormSaveSubscriptionMutationVariables>(SubscriptionFormSaveSubscriptionDocument, options);
}
export type SubscriptionFormSaveSubscriptionMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SubscriptionFormSaveSubscriptionMutation, SubscriptionFormSaveSubscriptionMutationVariables>;
export const SubscriptionsListDocument = gql`
    query SubscriptionsList {
  subscriptions {
    id
    name
    price
    dividedBy
    billingMode
  }
}
    `;

/**
 * __useSubscriptionsListQuery__
 *
 * To run a query within a Vue component, call `useSubscriptionsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionsListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSubscriptionsListQuery();
 */
export function useSubscriptionsListQuery(options: VueApolloComposable.UseQueryOptions<SubscriptionsListQuery, SubscriptionsListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SubscriptionsListQuery, SubscriptionsListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SubscriptionsListQuery, SubscriptionsListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SubscriptionsListQuery, SubscriptionsListQueryVariables>(SubscriptionsListDocument, {}, options);
}
export type SubscriptionsListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SubscriptionsListQuery, SubscriptionsListQueryVariables>;
