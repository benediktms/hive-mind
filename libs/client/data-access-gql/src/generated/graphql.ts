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

export type Collective = {
  __typename?: 'Collective';
  id: Scalars['Float'];
};

export type ConfirmEmailInput = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export type ConfirmEmailResponse = {
  __typename?: 'ConfirmEmailResponse';
  message: Scalars['String'];
};

export type CreateCollectiveInput = {
  collectiveName: Scalars['String'];
  features?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateCollectiveResponse = {
  __typename?: 'CreateCollectiveResponse';
  collective: Collective;
};

export type CurrentUserResponse = {
  __typename?: 'CurrentUserResponse';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: ConfirmEmailResponse;
  /** Create a new collective. The creator will automatically be the first admin */
  createCollective: CreateCollectiveResponse;
  /** Allows the user to log in */
  login: LoginResponse;
  logout: LogoutResponse;
  /** Registers a new User */
  register: RegisterResponse;
  requestPasswordReset: RequestPasswordResetResponse;
  resetPassword: ResetPasswordResponse;
};

export type MutationConfirmEmailArgs = {
  input: ConfirmEmailInput;
};

export type MutationCreateCollectiveArgs = {
  input: CreateCollectiveInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type Query = {
  __typename?: 'Query';
  currentUser: CurrentUserResponse;
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
  message: Scalars['String'];
};

export type RequestPasswordResetInput = {
  email: Scalars['String'];
};

export type RequestPasswordResetResponse = {
  __typename?: 'RequestPasswordResetResponse';
  email: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message: Scalars['String'];
};

export type ConfirmEmailMutationVariables = Exact<{
  input: ConfirmEmailInput;
}>;

export type ConfirmEmailMutation = {
  __typename?: 'Mutation';
  confirmEmail: { __typename?: 'ConfirmEmailResponse'; message: string };
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'LoginResponse'; message: string };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: 'Mutation';
  logout: { __typename?: 'LogoutResponse'; message: string };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'RegisterResponse'; message: string };
};

export type RequestResetMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;

export type RequestResetMutation = {
  __typename?: 'Mutation';
  requestPasswordReset: {
    __typename?: 'RequestPasswordResetResponse';
    email: string;
    token: string;
  };
};

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: { __typename?: 'ResetPasswordResponse'; message: string };
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser: {
    __typename?: 'CurrentUserResponse';
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type UptimeQueryVariables = Exact<{ [key: string]: never }>;

export type UptimeQuery = { __typename?: 'Query'; uptime: number };

export const ConfirmEmailDocument = gql`
  mutation ConfirmEmail($input: ConfirmEmailInput!) {
    confirmEmail(input: $input) {
      message
    }
  }
`;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<
  ConfirmEmailMutation,
  ConfirmEmailMutationVariables
>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmEmailMutation,
    ConfirmEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmEmailMutation,
    ConfirmEmailMutationVariables
  >(ConfirmEmailDocument, options);
}
export type ConfirmEmailMutationHookResult = ReturnType<
  typeof useConfirmEmailMutation
>;
export type ConfirmEmailMutationResult =
  Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<
  ConfirmEmailMutation,
  ConfirmEmailMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      message
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
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      message
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const RequestResetDocument = gql`
  mutation RequestReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      email
      token
    }
  }
`;
export type RequestResetMutationFn = Apollo.MutationFunction<
  RequestResetMutation,
  RequestResetMutationVariables
>;

/**
 * __useRequestResetMutation__
 *
 * To run a mutation, you first call `useRequestResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestResetMutation, { data, loading, error }] = useRequestResetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestResetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestResetMutation,
    RequestResetMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestResetMutation,
    RequestResetMutationVariables
  >(RequestResetDocument, options);
}
export type RequestResetMutationHookResult = ReturnType<
  typeof useRequestResetMutation
>;
export type RequestResetMutationResult =
  Apollo.MutationResult<RequestResetMutation>;
export type RequestResetMutationOptions = Apollo.BaseMutationOptions<
  RequestResetMutation,
  RequestResetMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      message
    }
  }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult =
  Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      id
      email
      firstName
      lastName
    }
  }
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
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
