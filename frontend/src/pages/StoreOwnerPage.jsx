import { storeAPI } from "../utils/api";

const StoreOwnerPage = () => {
  const [dashboardData, setDashboarData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await storeAPI.getOwnerDashboard(
          localStorage.getItem("token")
        );
        setDashboarData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      <h3>Store: {dashboardData.store.name}</h3>
      <p>Address: {dashboardData.store.address}</p>
      <p>
        Average Rating:{" "}
        {dashboardData.averageRating
          ? dashboardData.averageRating.toFixed(1)
          : "No ratings yet!"}
      </p>
      <p>Total Ratings: {dashboardData.totalRatings}</p>
      <h4>Ratings</h4>
      <ul>
        {dashboardData.ratings.map((rating, index) => {
          <li key={index}>
            {rating.userName} ({rating.userEmail}): {rating.rating} stars
          </li>;
        })}
      </ul>
    </div>
  );
};

export default StoreOwnerPage;
