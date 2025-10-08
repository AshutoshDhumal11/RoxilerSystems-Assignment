import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <div>
        <h1>Welcome to Store Rating App</h1>
        {user ? (
          <div>
            <p>You are logged in as {user.role}.</p>
            <p>Use the navigation to access you dashboard.</p>
          </div>
        ) : (
          <p>Please log in or signup</p>
        )}
      </div>
    </div>
  );
};

export default Home;
