import { gql } from 'apollo-server-lambda';

export default gql`

enum BillingMode {
  daily
  weekly
  monthly
  quaterly
  yearly
}

type Subscription {
  id: String!
  name: String!
  price: Float!
  billingMode: BillingMode!
  split: Int!
  dailyPrice: Float!
}

input SubscriptionInput {
  name: String!
  price: Float!
  billingMode: BillingMode!
  split: Int!
}

type SaveSubscriptionResponse {
  subscription: Subscription!
}

type DeleteSubscriptionResponse {
  success: Boolean!
}

type Query {
  subscriptions: [Subscription!]
  subscription(id: ID): Subscription
}

type Mutation {
  saveSubscription(input: SubscriptionInput!, id: ID): SaveSubscriptionResponse
  deleteSubscription(id: ID!): DeleteSubscriptionResponse
}

schema {
  query: Query
  mutation: Mutation
}

`;
