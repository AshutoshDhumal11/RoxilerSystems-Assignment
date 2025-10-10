import { useEffect, useState } from "react";
import PasswordUpdate from "../components/common/PasswordUpdate";
import { storeAPI } from "../utils/api";

const StoreOwnerPage = () => {
  const [dashboardData, setDashboarData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await storeAPI.getOwnerDashboard();
        setDashboarData(response.data.storesWithAvgRating[0]);
      } catch (err) {
        console.error("Error fetching store owner dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-medium">
        Error loading dashboard!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Update Password
          </h3>
          <div className="mt-2 max-w-full flex justify-center text-sm text-gray-500">
            <PasswordUpdate />
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-3 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Store Information
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-8">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Store Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dashboardData.store.name}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dashboardData.store.email}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dashboardData.store.address}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Average Rating
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dashboardData.averageRating
                  ? dashboardData.averageRating.toFixed(1)
                  : "No ratings yet!"}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Total Ratings
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dashboardData.totalRatings}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Ratings
          </h3>
        </div>

        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {dashboardData.ratings.map((rating, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {rating.userName}
                      </div>
                      <div>{rating.userEmail}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-yellow-400 text-lg">
                      {"★".repeat(rating.rating)}
                      {"☆".repeat(5 - rating.rating)}
                    </div>
                    <div>
                      {new Date(rating.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {dashboardData.ratings.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              No ratings yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerPage;
