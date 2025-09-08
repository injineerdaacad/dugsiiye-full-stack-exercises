import UserList from "./UserList";

const App = () => {
  const users = [
   { id: 1, name: "Injineer Daacad", email: "injineerdaacad@gmail.com" },
   { id: 2, name: "Injineer Socdaal", email: "injineersocdaal@gmail.com" },
   { id: 3, name: "Injineer Dheere", email: "injineerdheere@gmail.com" },
   { id: 4, name: "Injineer UK", email: "injineeruk@gmail.com" },
   { id: 5, name: "Injineer Colaad", email: "injineercolaad@gmail.com" }
  ];

  return <UserList users={users} />;
};

export default App;