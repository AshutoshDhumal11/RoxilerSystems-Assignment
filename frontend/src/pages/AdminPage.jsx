import { useState } from "react";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserList from "../components/admin/UserList";
import AddUserForm from "../components/admin/AddUserForm";
import AddStoreForm from "../components/admin/AddStoreForm";
import StoreList from "../components/admin/StoreList";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", name: "Dashboard" },
    { id: "users", name: "Users" },
    { id: "stores", name: "Stores" },
    { id: "add-user", name: "Add User" },
    { id: "add-store", name: "Add Store" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <UserList />;
      case "stores":
        return <StoreList />;
      case "add-user":
        return <AddUserForm />;
      case "add-store":
        return <AddStoreForm />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap cursor-pointer py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default AdminPage;
