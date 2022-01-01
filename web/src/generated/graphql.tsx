import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Fridge = {
  __typename?: 'Fridge';
  fridgeIngredients: Array<FridgeIngredient>;
  id: Scalars['String'];
};

export type FridgeIngredient = {
  __typename?: 'FridgeIngredient';
  fridgeId: Scalars['String'];
  id: Scalars['String'];
  ingredient?: Maybe<Ingredient>;
  ingredientId: Scalars['String'];
  name: Scalars['String'];
};

export type FridgeIngredientResponse = {
  __typename?: 'FridgeIngredientResponse';
  errors?: Maybe<Array<Scalars['String']>>;
  fridgeIngredient?: Maybe<FridgeIngredient>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['String'];
  name: Scalars['String'];
  recipeIngredients?: Maybe<Array<RecipeIngredient>>;
};

export type IngredientInput = {
  name: Scalars['String'];
};

export type IngredientResponse = {
  __typename?: 'IngredientResponse';
  errors?: Maybe<Array<Scalars['String']>>;
  ingredient?: Maybe<Ingredient>;
};

export type Login = {
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFridgeIngredient: FridgeIngredientResponse;
  addIngredient: IngredientResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationAddFridgeIngredientArgs = {
  name: Scalars['String'];
};


export type MutationAddIngredientArgs = {
  input: IngredientInput;
};


export type MutationLoginArgs = {
  input: Login;
};


export type MutationRegisterArgs = {
  input: Login;
};

export type Query = {
  __typename?: 'Query';
  fridge?: Maybe<Fridge>;
  ingredientByName?: Maybe<Ingredient>;
  ingredients: Array<Ingredient>;
  me?: Maybe<User>;
  userByName: User;
};


export type QueryIngredientByNameArgs = {
  name: Scalars['String'];
};


export type QueryUserByNameArgs = {
  name: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  author?: Maybe<User>;
  authorId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  recipeIngredients?: Maybe<Array<RecipeIngredient>>;
  saves: Scalars['Int'];
  steps?: Maybe<Array<RecipeStep>>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  id: Scalars['String'];
  ingredientId: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['String'];
  recipeId: Scalars['String'];
};

export type RecipeStep = {
  __typename?: 'RecipeStep';
  desc: Scalars['String'];
  id: Scalars['String'];
  recipeId: Scalars['String'];
  stepNum: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  authoredRecipes?: Maybe<Array<Recipe>>;
  createdAt: Scalars['String'];
  fridge: Fridge;
  fridgeId: Scalars['String'];
  id: Scalars['String'];
  savedRecipes: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AddFridgeIngredientMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddFridgeIngredientMutation = { __typename?: 'Mutation', addFridgeIngredient: { __typename?: 'FridgeIngredientResponse', errors?: Array<string> | null | undefined, fridgeIngredient?: { __typename?: 'FridgeIngredient', name: string } | null | undefined } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', username: string, id: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', username: string, id: string } | null | undefined } };

export type AllIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllIngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', name: string }> };

export type FridgeQueryVariables = Exact<{ [key: string]: never; }>;


export type FridgeQuery = { __typename?: 'Query', fridge?: { __typename?: 'Fridge', fridgeIngredients: Array<{ __typename?: 'FridgeIngredient', name: string }> } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string } | null | undefined };


export const AddFridgeIngredientDocument = gql`
    mutation AddFridgeIngredient($name: String!) {
  addFridgeIngredient(name: $name) {
    errors
    fridgeIngredient {
      name
    }
  }
}
    `;
export type AddFridgeIngredientMutationFn = Apollo.MutationFunction<AddFridgeIngredientMutation, AddFridgeIngredientMutationVariables>;

/**
 * __useAddFridgeIngredientMutation__
 *
 * To run a mutation, you first call `useAddFridgeIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFridgeIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFridgeIngredientMutation, { data, loading, error }] = useAddFridgeIngredientMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddFridgeIngredientMutation(baseOptions?: Apollo.MutationHookOptions<AddFridgeIngredientMutation, AddFridgeIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFridgeIngredientMutation, AddFridgeIngredientMutationVariables>(AddFridgeIngredientDocument, options);
      }
export type AddFridgeIngredientMutationHookResult = ReturnType<typeof useAddFridgeIngredientMutation>;
export type AddFridgeIngredientMutationResult = Apollo.MutationResult<AddFridgeIngredientMutation>;
export type AddFridgeIngredientMutationOptions = Apollo.BaseMutationOptions<AddFridgeIngredientMutation, AddFridgeIngredientMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      username
      id
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(input: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      username
      id
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AllIngredientsDocument = gql`
    query AllIngredients {
  ingredients {
    name
  }
}
    `;

/**
 * __useAllIngredientsQuery__
 *
 * To run a query within a React component, call `useAllIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllIngredientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllIngredientsQuery(baseOptions?: Apollo.QueryHookOptions<AllIngredientsQuery, AllIngredientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllIngredientsQuery, AllIngredientsQueryVariables>(AllIngredientsDocument, options);
      }
export function useAllIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllIngredientsQuery, AllIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllIngredientsQuery, AllIngredientsQueryVariables>(AllIngredientsDocument, options);
        }
export type AllIngredientsQueryHookResult = ReturnType<typeof useAllIngredientsQuery>;
export type AllIngredientsLazyQueryHookResult = ReturnType<typeof useAllIngredientsLazyQuery>;
export type AllIngredientsQueryResult = Apollo.QueryResult<AllIngredientsQuery, AllIngredientsQueryVariables>;
export const FridgeDocument = gql`
    query Fridge {
  fridge {
    fridgeIngredients {
      name
    }
  }
}
    `;

/**
 * __useFridgeQuery__
 *
 * To run a query within a React component, call `useFridgeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFridgeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFridgeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFridgeQuery(baseOptions?: Apollo.QueryHookOptions<FridgeQuery, FridgeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FridgeQuery, FridgeQueryVariables>(FridgeDocument, options);
      }
export function useFridgeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FridgeQuery, FridgeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FridgeQuery, FridgeQueryVariables>(FridgeDocument, options);
        }
export type FridgeQueryHookResult = ReturnType<typeof useFridgeQuery>;
export type FridgeLazyQueryHookResult = ReturnType<typeof useFridgeLazyQuery>;
export type FridgeQueryResult = Apollo.QueryResult<FridgeQuery, FridgeQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;