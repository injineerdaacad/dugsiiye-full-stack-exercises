import { useState } from "react";

interface User {
  username: string;
  email: string;
}

const UserCard = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {setUser({username: "Eng. Honest", email: "injineerdaacad@gmail.com"})};
  const handleLogout = () => {setUser(null)};

  return (
    <div className="p-6 bg-white rounded-md shadow-md w-80 text-center">
      {user ? (
        <>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md w-full cursor-pointer hover:scale-105 transition-all duration-200"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p className="mb-4">No user found.</p>

          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full cursor-pointer hover:scale-105 transition-all duration-200"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default UserCard;