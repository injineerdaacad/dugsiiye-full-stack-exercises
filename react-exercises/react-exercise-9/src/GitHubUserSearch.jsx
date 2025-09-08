import { useState } from "react";

const GitHubUserSearch = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const search = async () => {
    const username = searchUsername.trim();
    if (!username) return;

    setLoading(true);
    setUserData(null);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        `https://api.github.com/users/${username.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("GitHub user not found");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchUsername(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <div>
      <h2>GitHub User Search</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="username"
          placeholder="Enter GitHub username..."
          value={searchUsername}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#ff0000" }}>Error: {error}</p>}

      {userData && (
        <div>
          <h3>{userData.name || userData.login}</h3>
          <img src={userData.avatar_url} alt={userData.login} width="100" />
          <p>Location: {userData.location || "N/A"}</p>
          <p>Public Repos: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
};

export default GitHubUserSearch;