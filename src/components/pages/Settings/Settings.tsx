import { useState } from "react";
import { useFormik } from "formik";
import { useTheme } from "../../../Context/ThemeContext/Theme.context.tsx";

export default function Settings() {
  const { darkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold text-yellow-500">Settings</h1>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl text-black dark:text-white">
        <h2 className="text-xl font-semibold mb-4 text-yellow-500">
          Profile Settings{" "}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            className="p-3 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-yellow-500 dark:outline-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="p-3 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-yellow-500 dark:outline-2"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl text-black dark:text-white">
        <h2 className="text-xl font-semibold mb-4 text-yellow-500">
          Change Password
        </h2>

        <div className="space-y-4">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            className="w-full p-3 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-yellow-500 dark:outline-2"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            className="w-full p-3 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-yellow-500 dark:outline-2"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className="w-full p-3 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-yellow-500 dark:outline-2"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl text-black dark:text-white">
        <h2 className="text-xl font-semibold mb-4 text-yellow-500">
          Preferences
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p>Dark Mode</p>

            <button
              type="button"
              onClick={toggleTheme}
              className={`w-14 h-7 rounded-full transition ${
                darkMode ? "bg-yellow-500" : "bg-gray-700"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition transform ${
                  darkMode ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p>Notifications</p>

            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 rounded-full transition ${
                notifications ? "bg-yellow-500" : "bg-gray-700"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition transform ${
                  notifications ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition cursor-pointer"
      >
        Save Changes
      </button>
    </form>
  );
}
