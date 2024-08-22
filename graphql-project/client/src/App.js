import { gql, useQuery } from "@apollo/client";


const query = gql` 
query GetTodosWithUser{
  getTodos {
    id
    title
    completed
    user {
      id
      name
    }
  }
}`


function App() {
  const { data, loading } = useQuery(query)
  if (loading) return <h1>Loading .....! </h1>

  return (
    <div className="container mt-5">
      <h1 className="text-center">User Data</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos.map((todo) =>
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.user.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
