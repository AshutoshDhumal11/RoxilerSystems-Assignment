import Dashboard from "../components/admin/Dashboard";
import UserList from "../components/admin/UserList";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("stores")}>Stores</button>
        <button onClick={() => setActiveTab("addUser")}>Add User</button>
        <button onClick={() => setActiveTab("addStore")}>Add Store</button>
      </nav>
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "users" && <UserList />}
      {activeTab === "stores" && <StoreList />}
      {activeTab === "addUser" && <AddUser />}
      {activeTab === "addStore" && <AddStore />}
    </div>
  );
};

export default AdminPage;
