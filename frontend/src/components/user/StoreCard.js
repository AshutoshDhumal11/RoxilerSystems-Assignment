import { useState } from "react";
import { storeAPI } from "../../utils/api";

const StoreCard = ({ store }) => {
  const [userRating, setUserRating] = useState(store.userRating || 0);
  const [overallRating, setOverallRating] = useState(store.overallRating);

  const handleRate = async (rating) => {
    try {
      await storeAPI.rateStore(localStorage.getItem("token"), store.id, rating);
      setUserRating(rating);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h3>{store.name}</h3>
      <p>Address: {store.address}</p>
      <p>
        Overall Rating:{" "}
        {overallRating ? overallRating.toFixed(1) : "No ratings yet"}
      </p>
      <p>Your Rating: {userRating || "Not rated"}</p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => handleRate(star)}>
            {star} {userRating === star ? "(Current)" : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;
