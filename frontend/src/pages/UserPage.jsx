import { useEffect, useState } from "react";
import { storeAPI } from "../utils/api";
import StoreList from "../components/user/StoreList";

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
    <div>
      <h2>User Dashboard</h2>
      <StoreList stores={stores} onSearch={handleSearch} />
    </div>
  );
};

export default UserPage;
