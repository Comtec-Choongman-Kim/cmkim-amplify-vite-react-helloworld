/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $condition: ModelAccountConditionInput
    $input: CreateAccountInput!
  ) {
    createAccount(condition: $condition, input: $input) {
      account_id
      account_name
      createdAt
      description
      id
      updatedAt
      __typename
    }
  }
`;
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $condition: ModelCompanyConditionInput
    $input: CreateCompanyInput!
  ) {
    createCompany(condition: $condition, input: $input) {
      createdAt
      description
      id
      name
      updatedAt
      __typename
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $condition: ModelTodoConditionInput
    $input: CreateTodoInput!
  ) {
    createTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      isDone
      updatedAt
      __typename
    }
  }
`;
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $condition: ModelAccountConditionInput
    $input: DeleteAccountInput!
  ) {
    deleteAccount(condition: $condition, input: $input) {
      account_id
      account_name
      createdAt
      description
      id
      updatedAt
      __typename
    }
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $condition: ModelCompanyConditionInput
    $input: DeleteCompanyInput!
  ) {
    deleteCompany(condition: $condition, input: $input) {
      createdAt
      description
      id
      name
      updatedAt
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $condition: ModelTodoConditionInput
    $input: DeleteTodoInput!
  ) {
    deleteTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      isDone
      updatedAt
      __typename
    }
  }
`;
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $condition: ModelAccountConditionInput
    $input: UpdateAccountInput!
  ) {
    updateAccount(condition: $condition, input: $input) {
      account_id
      account_name
      createdAt
      description
      id
      updatedAt
      __typename
    }
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $condition: ModelCompanyConditionInput
    $input: UpdateCompanyInput!
  ) {
    updateCompany(condition: $condition, input: $input) {
      createdAt
      description
      id
      name
      updatedAt
      __typename
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $condition: ModelTodoConditionInput
    $input: UpdateTodoInput!
  ) {
    updateTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      isDone
      updatedAt
      __typename
    }
  }
`;
