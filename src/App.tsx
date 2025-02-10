import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

import TodoCreateForm from "../ui-components/TodoCreateForm";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [companies, setCompanies] = useState<Array<Schema["Company"]["type"]>>([]);
  
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  useEffect(() => {
    const companySubscription = client.models.Company.observeQuery().subscribe({
      next: (data) => setCompanies([...data.items]),
    });

    const accountSubscription = client.models.Account.observeQuery().subscribe({
      next: (data) => setCompanies([...data.items]),
    });

    return () => {
      companySubscription.unsubscribe();
      accountSubscription.unsubscribe();
    };

  }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  // function createTodo(content: string) {
  //   client.models.Todo.create({ content });
  // }
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My todos</h1>
      {/* <button onClick={createTodo}>+ new</button> */}
      {/* 모달 열기 버튼 */}
      <button onClick={() => setShowModal(true)}>+ new</button>

      {/* 모달이 열려 있을 때만 표시 */}
      {showModal && (
        <div className="modal">
          <TodoCreateForm />
          <button onClick={() => setShowModal(false)}>닫기</button>
        </div>
      )}
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
