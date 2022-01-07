import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: User;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Allows the user to log in */
  login: LoginResponse;
  logout: LogoutResponse;
  /** Registers a new User */
  register: RegisterResponse;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  uptime: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  token: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginResponse';
    token: string;
    user: {
      __typename?: 'User';
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
};

export type UptimeQueryVariables = Exact<{ [key: string]: never }>;

export type UptimeQuery = { __typename?: 'Query'; uptime: number };

export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const UptimeDocument = gql`
  query Uptime {
    uptime
  }
`;

/**
 * __useUptimeQuery__
 *
 * To run a query within a React component, call `useUptimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useUptimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUptimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useUptimeQuery(
  baseOptions?: Apollo.QueryHookOptions<UptimeQuery, UptimeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UptimeQuery, UptimeQueryVariables>(
    UptimeDocument,
    options
  );
}
export function useUptimeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UptimeQuery, UptimeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UptimeQuery, UptimeQueryVariables>(
    UptimeDocument,
    options
  );
}
export type UptimeQueryHookResult = ReturnType<typeof useUptimeQuery>;
export type UptimeLazyQueryHookResult = ReturnType<typeof useUptimeLazyQuery>;
export type UptimeQueryResult = Apollo.QueryResult<
  UptimeQuery,
  UptimeQueryVariables
>;
