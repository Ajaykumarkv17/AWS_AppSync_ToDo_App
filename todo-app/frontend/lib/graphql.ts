export const createTodo = `
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      description
      completed
      priority
      owner
      createdAt
      updatedAt
      version
    }
  }
`;

export const updateTodo = `
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      title
      description
      completed
      priority
      owner
      updatedAt
      version
    }
  }
`;

export const toggleTodo = `
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
      updatedAt
      version
    }
  }
`;

export const deleteTodo = `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export const listMyTodos = `
  query ListMyTodos {
    listMyTodos {
      id
      title
      description
      completed
      priority
      owner
      createdAt
      updatedAt
      version
    }
  }
`;

export const onCreateTodo = `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
      id
      title
      description
      completed
      priority
      owner
      createdAt
      updatedAt
      version
    }
  }
`;

export const onUpdateTodo = `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
      id
      title
      description
      completed
      priority
      owner
      updatedAt
      version
    }
  }
`;

export const onDeleteTodo = `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
      id
    }
  }
`;
