import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-100">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full border border-gray-300 focus:outline-none  focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300 p-3 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full border border-gray-300 focus:outline-none focus:border-yellow-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-300"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 rounded-lg p-3 hover:cursor-pointer hover:bg-gray-600  text-yellow-500 font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
