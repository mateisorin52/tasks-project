import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTaskInput = {
  /** Example field (placeholder) */
  content: Scalars['String']['input'];
  /** Example field (placeholder) */
  done: Scalars['Boolean']['input'];
  /** Example field (placeholder) */
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** Example field (placeholder) */
  email: Scalars['String']['input'];
  /** Example field (placeholder) */
  fname: Scalars['String']['input'];
  /** Example field (placeholder) */
  lname: Scalars['String']['input'];
  /** Example field (placeholder) */
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateTaskMutation: Task;
  RemoveTaskMutation: Task;
  UpdateTaskMutation: Task;
  createUserMutation: User;
  removeUserMutation: User;
  updateUserMutation: User;
};


export type MutationCreateTaskMutationArgs = {
  createTaskInput: CreateTaskInput;
};


export type MutationRemoveTaskMutationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateTaskMutationArgs = {
  updateTaskInput: UpdateTaskInput;
};


export type MutationCreateUserMutationArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveUserMutationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserMutationArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  TaskQuery: Task;
  TasksQuery: Array<Task>;
  user: User;
};


export type QueryTaskQueryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTasksQueryArgs = {
  filters?: InputMaybe<TaskFilters>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Task = {
  __typename?: 'Task';
  /** Example field (placeholder) */
  content: Scalars['String']['output'];
  /** Example field (placeholder) */
  created_at: Scalars['String']['output'];
  /** Example field (placeholder) */
  done: Scalars['Boolean']['output'];
  /** Example field (placeholder) */
  id: Scalars['Int']['output'];
  /** Example field (placeholder) */
  title: Scalars['String']['output'];
};

export type TaskFilters = {
  search: Scalars['String']['input'];
  /** Example field (placeholder) */
  sortByDate: Scalars['String']['input'];
};

export type UpdateTaskInput = {
  /** Example field (placeholder) */
  content: Scalars['String']['input'];
  /** Example field (placeholder) */
  done: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  /** Example field (placeholder) */
  title: Scalars['String']['input'];
};

export type UpdateUserInput = {
  /** Example field (placeholder) */
  email: Scalars['String']['input'];
  /** Example field (placeholder) */
  fname: Scalars['String']['input'];
  /** Example field (placeholder) */
  id: Scalars['String']['input'];
  /** Example field (placeholder) */
  lname: Scalars['String']['input'];
  /** Example field (placeholder) */
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  /** Example field (placeholder) */
  email: Scalars['String']['output'];
  /** Example field (placeholder) */
  fname: Scalars['String']['output'];
  /** Example field (placeholder) */
  id: Scalars['Int']['output'];
  /** Example field (placeholder) */
  lname: Scalars['String']['output'];
  /** Example field (placeholder) */
  password: Scalars['String']['output'];
};

export type CreateTaskMutationMutationVariables = Exact<{
  createTaskInput: CreateTaskInput;
}>;


export type CreateTaskMutationMutation = { __typename?: 'Mutation', CreateTaskMutation: { __typename?: 'Task', id: number, title: string, content: string, done: boolean, created_at: string } };

export type RemoveTaskMutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveTaskMutationMutation = { __typename?: 'Mutation', RemoveTaskMutation: { __typename?: 'Task', id: number, title: string, content: string, done: boolean, created_at: string } };

export type UpdateTaskMutationMutationVariables = Exact<{
  updateTaskInput: UpdateTaskInput;
}>;


export type UpdateTaskMutationMutation = { __typename?: 'Mutation', UpdateTaskMutation: { __typename?: 'Task', id: number, title: string, content: string, done: boolean, created_at: string } };

export type CreateUserMutationMutationVariables = Exact<{
  CreateUserInput: CreateUserInput;
}>;


export type CreateUserMutationMutation = { __typename?: 'Mutation', createUserMutation: { __typename?: 'User', id: number, fname: string, lname: string, email: string, password: string } };

export type TasksQueryQueryVariables = Exact<{
  filters?: InputMaybe<TaskFilters>;
}>;


export type TasksQueryQuery = { __typename?: 'Query', TasksQuery: Array<{ __typename?: 'Task', id: number, title: string, content: string, done: boolean, created_at: string }> };


export const CreateTaskMutationDocument = gql`
    mutation CreateTaskMutation($createTaskInput: CreateTaskInput!) {
  CreateTaskMutation(createTaskInput: $createTaskInput) {
    id
    title
    content
    done
    created_at
  }
}
    `;
export type CreateTaskMutationMutationFn = Apollo.MutationFunction<CreateTaskMutationMutation, CreateTaskMutationMutationVariables>;

/**
 * __useCreateTaskMutationMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutationMutation, { data, loading, error }] = useCreateTaskMutationMutation({
 *   variables: {
 *      createTaskInput: // value for 'createTaskInput'
 *   },
 * });
 */
export function useCreateTaskMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutationMutation, CreateTaskMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutationMutation, CreateTaskMutationMutationVariables>(CreateTaskMutationDocument, options);
      }
export type CreateTaskMutationMutationHookResult = ReturnType<typeof useCreateTaskMutationMutation>;
export type CreateTaskMutationMutationResult = Apollo.MutationResult<CreateTaskMutationMutation>;
export type CreateTaskMutationMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutationMutation, CreateTaskMutationMutationVariables>;
export const RemoveTaskMutationDocument = gql`
    mutation RemoveTaskMutation($id: Int!) {
  RemoveTaskMutation(id: $id) {
    id
    title
    content
    done
    created_at
  }
}
    `;
export type RemoveTaskMutationMutationFn = Apollo.MutationFunction<RemoveTaskMutationMutation, RemoveTaskMutationMutationVariables>;

/**
 * __useRemoveTaskMutationMutation__
 *
 * To run a mutation, you first call `useRemoveTaskMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTaskMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTaskMutationMutation, { data, loading, error }] = useRemoveTaskMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTaskMutationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTaskMutationMutation, RemoveTaskMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTaskMutationMutation, RemoveTaskMutationMutationVariables>(RemoveTaskMutationDocument, options);
      }
export type RemoveTaskMutationMutationHookResult = ReturnType<typeof useRemoveTaskMutationMutation>;
export type RemoveTaskMutationMutationResult = Apollo.MutationResult<RemoveTaskMutationMutation>;
export type RemoveTaskMutationMutationOptions = Apollo.BaseMutationOptions<RemoveTaskMutationMutation, RemoveTaskMutationMutationVariables>;
export const UpdateTaskMutationDocument = gql`
    mutation UpdateTaskMutation($updateTaskInput: UpdateTaskInput!) {
  UpdateTaskMutation(updateTaskInput: $updateTaskInput) {
    id
    title
    content
    done
    created_at
  }
}
    `;
export type UpdateTaskMutationMutationFn = Apollo.MutationFunction<UpdateTaskMutationMutation, UpdateTaskMutationMutationVariables>;

/**
 * __useUpdateTaskMutationMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutationMutation, { data, loading, error }] = useUpdateTaskMutationMutation({
 *   variables: {
 *      updateTaskInput: // value for 'updateTaskInput'
 *   },
 * });
 */
export function useUpdateTaskMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutationMutation, UpdateTaskMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutationMutation, UpdateTaskMutationMutationVariables>(UpdateTaskMutationDocument, options);
      }
export type UpdateTaskMutationMutationHookResult = ReturnType<typeof useUpdateTaskMutationMutation>;
export type UpdateTaskMutationMutationResult = Apollo.MutationResult<UpdateTaskMutationMutation>;
export type UpdateTaskMutationMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutationMutation, UpdateTaskMutationMutationVariables>;
export const CreateUserMutationDocument = gql`
    mutation CreateUserMutation($CreateUserInput: CreateUserInput!) {
  createUserMutation(createUserInput: $CreateUserInput) {
    id
    fname
    lname
    email
    password
  }
}
    `;
export type CreateUserMutationMutationFn = Apollo.MutationFunction<CreateUserMutationMutation, CreateUserMutationMutationVariables>;

/**
 * __useCreateUserMutationMutation__
 *
 * To run a mutation, you first call `useCreateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutationMutation, { data, loading, error }] = useCreateUserMutationMutation({
 *   variables: {
 *      CreateUserInput: // value for 'CreateUserInput'
 *   },
 * });
 */
export function useCreateUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutationMutation, CreateUserMutationMutationVariables>(CreateUserMutationDocument, options);
      }
export type CreateUserMutationMutationHookResult = ReturnType<typeof useCreateUserMutationMutation>;
export type CreateUserMutationMutationResult = Apollo.MutationResult<CreateUserMutationMutation>;
export type CreateUserMutationMutationOptions = Apollo.BaseMutationOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>;
export const TasksQueryDocument = gql`
    query TasksQuery($filters: TaskFilters) {
  TasksQuery(filters: $filters) {
    id
    title
    content
    done
    created_at
  }
}
    `;

/**
 * __useTasksQueryQuery__
 *
 * To run a query within a React component, call `useTasksQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQueryQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useTasksQueryQuery(baseOptions?: Apollo.QueryHookOptions<TasksQueryQuery, TasksQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TasksQueryQuery, TasksQueryQueryVariables>(TasksQueryDocument, options);
      }
export function useTasksQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQueryQuery, TasksQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TasksQueryQuery, TasksQueryQueryVariables>(TasksQueryDocument, options);
        }
export type TasksQueryQueryHookResult = ReturnType<typeof useTasksQueryQuery>;
export type TasksQueryLazyQueryHookResult = ReturnType<typeof useTasksQueryLazyQuery>;
export type TasksQueryQueryResult = Apollo.QueryResult<TasksQueryQuery, TasksQueryQueryVariables>;