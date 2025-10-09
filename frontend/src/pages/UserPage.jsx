import { useEffect, useState } from "react";
import { storeAPI } from "../utils/api";
import StoreList from "../components/user/StoreList";
import PasswordUpdate from "../components/common/PasswordUpdate";

const UserPage = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await storeAPI.getStores(
          localStorage.getItem("token"),
          filters
        );
        setStores(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStores();
  }, [filters]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Update Password
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <PasswordUpdate />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Stores</h2>
        <StoreList stores={stores} onSearch={handleSearch}/>
      </div>
    </div>
  );
};

export default UserPage;
