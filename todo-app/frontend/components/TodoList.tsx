'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listMyTodos, createTodo, toggleTodo, deleteTodo, onCreateTodo, onUpdateTodo, onDeleteTodo } from '@/lib/graphql';

const client = generateClient();

type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  version: number;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
    setupSubscriptions();
  }, []);

  const fetchTodos = async () => {
    try {
      const result = await client.graphql({ query: listMyTodos });
      setTodos(result.data.listMyTodos || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const setupSubscriptions = () => {
    // Real-time create subscription
    const createSub = client.graphql({ query: onCreateTodo }).subscribe({
      next: ({ data }) => {
        setTodos(prev => [...prev, data.onCreateTodo]);
      },
      error: (error) => console.error('Create subscription error:', error)
    });

    // Real-time update subscription
    const updateSub = client.graphql({ query: onUpdateTodo }).subscribe({
      next: ({ data }) => {
        setTodos(prev => prev.map(todo => 
          todo.id === data.onUpdateTodo.id ? { ...todo, ...data.onUpdateTodo } : todo
        ));
      },
      error: (error) => console.error('Update subscription error:', error)
    });

    // Real-time delete subscription
    const deleteSub = client.graphql({ query: onDeleteTodo }).subscribe({
      next: ({ data }) => {
        setTodos(prev => prev.filter(todo => todo.id !== data.onDeleteTodo.id));
      },
      error: (error) => console.error('Delete subscription error:', error)
    });

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await client.graphql({
        query: createTodo,
        variables: { input: { title, priority } }
      });
      setTitle('');
    } catch (error) {
      console.error('Error creating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await client.graphql({
        query: toggleTodo,
        variables: { id }
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await client.graphql({
        query: deleteTodo,
        variables: { id }
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const priorityColors = {
    LOW: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Real-Time Todos</h1>

      <form onSubmit={handleCreate} className="mb-8 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <p className={`${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.title}
              </p>
            </div>
            <span className={`px-2 py-1 text-xs rounded ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No todos yet. Create one above!</p>
      )}
    </div>
  );
}
