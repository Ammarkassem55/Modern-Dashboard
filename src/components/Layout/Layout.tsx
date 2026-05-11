import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faUsers,
  faBox,
  faCartShopping,
  faGear,
  faRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Layout() {
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">
      <button
        onClick={() => setOpenSidebar(true)}
        className="
          md:hidden
          fixed top-4 right-4 z-50
          bg-yellow-500
          text-black
          w-10 h-10
          rounded-lg
          shadow-lg
          cursor-pointer
        "
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="
            fixed inset-0
            bg-black/50
            z-30
            md:hidden
          "
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-40
          h-screen w-64
          bg-white dark:bg-gray-900
          shadow-lg
          p-5
          flex flex-col
          transition-transform duration-300

          ${openSidebar ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        <button
          onClick={() => setOpenSidebar(false)}
          className="
            md:hidden
            self-end
            text-white
            text-2xl
            mb-4
            cursor-pointer
          "
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="font-bold text-yellow-500 text-2xl mb-8">Admin Panel</h1>

        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            onClick={() => setOpenSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 border-b border-gray-300 dark:border-gray-700 transition-all duration-200 hover:translate-x-2 px-2 rounded ${
                isActive
                  ? "text-white bg-gray-800"
                  : "text-yellow-600 dark:text-yellow-500"
              }`
            }
          >
            <FontAwesomeIcon icon={faHouse} />
            Dashboard
          </NavLink>

          <NavLink
            to="/users"
            onClick={() => setOpenSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 border-b border-gray-300 dark:border-gray-700 transition-all duration-200 hover:translate-x-2 px-2 rounded ${
                isActive
                  ? "text-white bg-gray-800"
                  : "text-yellow-600 dark:text-yellow-500"
              }`
            }
          >
            <FontAwesomeIcon icon={faUsers} />
            Users
          </NavLink>

          <NavLink
            to="/products"
            onClick={() => setOpenSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 border-b border-gray-300 dark:border-gray-700 transition-all duration-200 hover:translate-x-2 px-2 rounded ${
                isActive
                  ? "text-white bg-gray-800"
                  : "text-yellow-600 dark:text-yellow-500"
              }`
            }
          >
            <FontAwesomeIcon icon={faBox} />
            Products
          </NavLink>

          <NavLink
            to="/orders"
            onClick={() => setOpenSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 border-b border-gray-300 dark:border-gray-700 transition-all duration-200 hover:translate-x-2 px-2 rounded ${
                isActive
                  ? "text-white bg-gray-800"
                  : "text-yellow-600 dark:text-yellow-500"
              }`
            }
          >
            <FontAwesomeIcon icon={faCartShopping} />
            Orders
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setOpenSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 border-b border-gray-300 dark:border-gray-700 transition-all duration-200 hover:translate-x-2 px-2 rounded ${
                isActive
                  ? "text-white bg-gray-800"
                  : "text-yellow-600 dark:text-yellow-500"
              }`
            }
          >
            <FontAwesomeIcon icon={faGear} />
            Settings
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="
            mt-auto
            flex items-center gap-4
            py-3 px-2
            rounded
            text-red-500
            hover:bg-red-500
            hover:text-white
            transition-all duration-200
            cursor-pointer
          "
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-8 md:ml-0">
        <Outlet />
      </main>
    </div>
  );
}
