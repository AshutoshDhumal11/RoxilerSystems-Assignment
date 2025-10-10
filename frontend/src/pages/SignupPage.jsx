import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError([]);
    const response = await signup(formData);

    if (response.success) {
      navigate("/login");
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-4 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {error.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error.map((err, index) => (
                <div key={index}>{err}</div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name (20-60 characters)"
                onChange={handleChange}
                minLength={20}
                maxLength={60}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email address"
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <textarea
                name="address"
                value={formData.address}
                rows={3}
                placeholder="Address (max 400 characters)"
                onChange={handleChange}
                maxLength={400}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password (8-16 chars, 1 uppercase, 1 special"
                onChange={handleChange}
                minLength={8}
                maxLength={16}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Creating an account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
