import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

import { TodoCreateForm, TodoDeleteForm } from "../ui-components";
import { CompanyCreateForm } from "../ui-components";

import AppTopNavigation from "./components/AppTopNavigation"

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [companies, setCompanies] = useState<Array<Schema["Company"]["type"]>>([]);
  
  const [showTodoModal, setShowTodoModal] = useState(false); // 모달 상태 추가
  const [showCompanyModal, setShowCompanyModal] = useState(false); // 모달 상태 추가

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
    <>
      {/* 네비게이션 바 */}
      <header style={{ margin: 0, padding: 0 }}>
        <AppTopNavigation />
      </header>
  
      <main>
        <h1>My todos</h1>
  
        <button onClick={() => setShowTodoModal(true)}>+ new Todo</button>
  
        {showTodoModal && (
          <div className="modal">
            <TodoCreateForm />
            <button onClick={() => setShowTodoModal(false)}>닫기</button>
          </div>
        )}
  
        <ul>
          {todos.map((todo) => (
            <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
              {todo.content}
            </li>
          ))}
        </ul>
  
        <button onClick={() => setShowCompanyModal(true)}>+ new Company</button>
  
        {showCompanyModal && (
          <div className="modal">
            <CompanyCreateForm />
            <button onClick={() => setShowCompanyModal(false)}>닫기</button>
          </div>
        )}
  
        <h1>Companies</h1>
        <ul>
          {companies.map((company) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
  
        <div>
          🥳 App successfully hosted.
          <br />
          <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
            Review next step of this tutorial.
          </a>
        </div>
  
        <button onClick={signOut}>Sign out</button>
      </main>
    </>
  );
}

export default App;
