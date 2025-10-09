import { useState } from "react";
import StoreCard from "./StoreCard";

const StoreList = ({ stores, onSearch }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ name, address });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
