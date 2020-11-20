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

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  token: Scalars['String'];
  subscriptions?: Maybe<Array<Subscription>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  billingMode: BillingMode;
  split: Scalars['Int'];
  dailyPrice: Scalars['Float'];
};

export type LoginInput = {
  username: Scalars['ID'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  userToken?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  username: Scalars['ID'];
  password: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  userToken?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type SubscriptionInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  billingMode: BillingMode;
  split: Scalars['Int'];
};

export type SaveSubscriptionResponse = {
  __typename?: 'SaveSubscriptionResponse';
  subscription: Subscription;
};

export type DeleteSubscriptionResponse = {
  __typename?: 'DeleteSubscriptionResponse';
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  subscriptions?: Maybe<Array<Subscription>>;
  subscription?: Maybe<Subscription>;
  user?: Maybe<User>;
};

export type QuerySubscriptionArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryUserArgs = {
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<LoginResponse>;
  logout?: Maybe<Scalars['String']>;
  register?: Maybe<RegisterResponse>;
  saveSubscription?: Maybe<SaveSubscriptionResponse>;
  deleteSubscription?: Maybe<DeleteSubscriptionResponse>;
};

export type MutationLoginArgs = {
  username: Scalars['ID'];
  password: Scalars['String'];
};

export type MutationLogoutArgs = {
  token: Scalars['String'];
};

export type MutationRegisterArgs = {
  username: Scalars['ID'];
  password: Scalars['String'];
};

export type MutationSaveSubscriptionArgs = {
  userToken: Scalars['String'];
  input: SubscriptionInput;
  id?: Maybe<Scalars['ID']>;
};

export type MutationDeleteSubscriptionArgs = {
  userToken: Scalars['String'];
  id: Scalars['ID'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type LoginFormMutationVariables = Exact<{
  username: Scalars['ID'];
  password: Scalars['String'];
}>;

export type LoginFormMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'userToken' | 'error'>
  )>; }
);

export type RegisterFormMutationVariables = Exact<{
  username: Scalars['ID'];
  password: Scalars['String'];
}>;

export type RegisterFormMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'userToken' | 'error'>
  )>; }
);

export type SubscriptionFormDeleteMutationVariables = Exact<{
  userToken: Scalars['String'];
  id: Scalars['ID'];
}>;

export type SubscriptionFormDeleteMutation = (
  { __typename?: 'Mutation' }
  & { deleteSubscription?: Maybe<(
    { __typename?: 'DeleteSubscriptionResponse' }
    & Pick<DeleteSubscriptionResponse, 'success'>
  )>; }
);

export type SubscriptionFormQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type SubscriptionFormQuery = (
  { __typename?: 'Query' }
  & { subscription?: Maybe<(
    { __typename?: 'Subscription' }
    & Pick<Subscription, 'id' | 'name' | 'price' | 'billingMode' | 'split'>
  )>; }
);

export type SubscriptionFormSaveMutationVariables = Exact<{
  userToken: Scalars['String'];
  input: SubscriptionInput;
  id?: Maybe<Scalars['ID']>;
}>;

export type SubscriptionFormSaveMutation = (
  { __typename?: 'Mutation' }
  & { saveSubscription?: Maybe<(
    { __typename?: 'SaveSubscriptionResponse' }
    & { subscription: (
      { __typename?: 'Subscription' }
      & Pick<Subscription, 'id'>
    ); }
  )>; }
);

export type AuthQueryVariables = Exact<{
  token: Scalars['String'];
}>;

export type AuthQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )>; }
);

export type LogoutMutationVariables = Exact<{
  token: Scalars['String'];
}>;

export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SubscriptionsListQueryVariables = Exact<{
  userToken: Scalars['String'];
}>;

export type SubscriptionsListQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
    & { subscriptions?: Maybe<Array<(
      { __typename?: 'Subscription' }
      & Pick<Subscription, 'id' | 'name' | 'price' | 'dailyPrice' | 'split' | 'billingMode'>
    )>>; }
  )>; }
);

export const LoginFormDocument = gql`
    mutation LoginForm($username: ID!, $password: String!) {
  login(username: $username, password: $password) {
    userToken
    error
  }
}
    `;

/**
 * __useLoginFormMutation__
 *
 * To run a mutation, you first call `useLoginFormMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginFormMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginFormMutation({
 *   variables: {
 *     username: // value for 'username'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginFormMutation(options: VueApolloComposable.UseMutationOptions<LoginFormMutation, LoginFormMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginFormMutation, LoginFormMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginFormMutation, LoginFormMutationVariables>(LoginFormDocument, options);
}
export type LoginFormMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginFormMutation, LoginFormMutationVariables>;
export const RegisterFormDocument = gql`
    mutation RegisterForm($username: ID!, $password: String!) {
  register(username: $username, password: $password) {
    userToken
    error
  }
}
    `;

/**
 * __useRegisterFormMutation__
 *
 * To run a mutation, you first call `useRegisterFormMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterFormMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterFormMutation({
 *   variables: {
 *     username: // value for 'username'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useRegisterFormMutation(options: VueApolloComposable.UseMutationOptions<RegisterFormMutation, RegisterFormMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterFormMutation, RegisterFormMutationVariables>>) {
  return VueApolloComposable.useMutation<RegisterFormMutation, RegisterFormMutationVariables>(RegisterFormDocument, options);
}
export type RegisterFormMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterFormMutation, RegisterFormMutationVariables>;
export const SubscriptionFormDeleteDocument = gql`
    mutation SubscriptionFormDelete($userToken: String!, $id: ID!) {
  deleteSubscription(userToken: $userToken, id: $id) {
    success
  }
}
    `;

/**
 * __useSubscriptionFormDeleteMutation__
 *
 * To run a mutation, you first call `useSubscriptionFormDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionFormDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSubscriptionFormDeleteMutation({
 *   variables: {
 *     userToken: // value for 'userToken'
 *     id: // value for 'id'
 *   },
 * });
 */
export function useSubscriptionFormDeleteMutation(options: VueApolloComposable.UseMutationOptions<SubscriptionFormDeleteMutation, SubscriptionFormDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SubscriptionFormDeleteMutation, SubscriptionFormDeleteMutationVariables>>) {
  return VueApolloComposable.useMutation<SubscriptionFormDeleteMutation, SubscriptionFormDeleteMutationVariables>(SubscriptionFormDeleteDocument, options);
}
export type SubscriptionFormDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SubscriptionFormDeleteMutation, SubscriptionFormDeleteMutationVariables>;
export const SubscriptionFormDocument = gql`
    query SubscriptionForm($id: ID) {
  subscription(id: $id) {
    id
    name
    price
    billingMode
    split
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
export const SubscriptionFormSaveDocument = gql`
    mutation SubscriptionFormSave($userToken: String!, $input: SubscriptionInput!, $id: ID) {
  saveSubscription(userToken: $userToken, input: $input, id: $id) {
    subscription {
      id
    }
  }
}
    `;

/**
 * __useSubscriptionFormSaveMutation__
 *
 * To run a mutation, you first call `useSubscriptionFormSaveMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionFormSaveMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSubscriptionFormSaveMutation({
 *   variables: {
 *     userToken: // value for 'userToken'
 *     input: // value for 'input'
 *     id: // value for 'id'
 *   },
 * });
 */
export function useSubscriptionFormSaveMutation(options: VueApolloComposable.UseMutationOptions<SubscriptionFormSaveMutation, SubscriptionFormSaveMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SubscriptionFormSaveMutation, SubscriptionFormSaveMutationVariables>>) {
  return VueApolloComposable.useMutation<SubscriptionFormSaveMutation, SubscriptionFormSaveMutationVariables>(SubscriptionFormSaveDocument, options);
}
export type SubscriptionFormSaveMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SubscriptionFormSaveMutation, SubscriptionFormSaveMutationVariables>;
export const AuthDocument = gql`
    query Auth($token: String!) {
  user(token: $token) {
    username
  }
}
    `;

/**
 * __useAuthQuery__
 *
 * To run a query within a Vue component, call `useAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAuthQuery({
 *   token: // value for 'token'
 * });
 */
export function useAuthQuery(variables: AuthQueryVariables | VueCompositionApi.Ref<AuthQueryVariables> | ReactiveFunction<AuthQueryVariables>, options: VueApolloComposable.UseQueryOptions<AuthQuery, AuthQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AuthQuery, AuthQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AuthQuery, AuthQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AuthQuery, AuthQueryVariables>(AuthDocument, variables, options);
}
export type AuthQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AuthQuery, AuthQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout($token: String!) {
  logout(token: $token)
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation({
 *   variables: {
 *     token: // value for 'token'
 *   },
 * });
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>>) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const SubscriptionsListDocument = gql`
    query SubscriptionsList($userToken: String!) {
  user(token: $userToken) {
    username
    subscriptions {
      id
      name
      price
      dailyPrice
      split
      billingMode
    }
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
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSubscriptionsListQuery({
 *   userToken: // value for 'userToken'
 * });
 */
export function useSubscriptionsListQuery(variables: SubscriptionsListQueryVariables | VueCompositionApi.Ref<SubscriptionsListQueryVariables> | ReactiveFunction<SubscriptionsListQueryVariables>, options: VueApolloComposable.UseQueryOptions<SubscriptionsListQuery, SubscriptionsListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SubscriptionsListQuery, SubscriptionsListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SubscriptionsListQuery, SubscriptionsListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SubscriptionsListQuery, SubscriptionsListQueryVariables>(SubscriptionsListDocument, variables, options);
}
export type SubscriptionsListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SubscriptionsListQuery, SubscriptionsListQueryVariables>;
