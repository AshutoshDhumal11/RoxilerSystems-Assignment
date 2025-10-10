import { useEffect, useState } from "react";
import { storeAPI } from "../utils/api";
import StoreList from "../components/user/StoreList";
import PasswordUpdate from "../components/common/PasswordUpdate";

const UserPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Update Password
          </h3>
          <div className="mt-2 max-w-[full] flex justify-center text-sm text-gray-500">
            <PasswordUpdate />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stores</h2>
        <StoreList />
      </div>
    </div>
  );
};

export default UserPage;
