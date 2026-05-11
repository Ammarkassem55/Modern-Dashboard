import axios from "axios";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import AddUserModal from "../../AddUserModel/AddUserModel";
import EditUserModel from "../../EditUserModel/EditUserModel";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 4;

  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  function handleDelete(id: number) {
    setUsers(users.filter((user) => user.id !== id));
  }

  function handleAddUser(newUser: User) {
    setUsers([newUser, ...users]);
  }

  function handleEditUser(updatedUser: User) {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );

    setSelectedUser(null);
  }

  return (
    <div className="p-4 md:p-6 text-black dark:text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-yellow-500">Users Table</h1>

        <button
          onClick={() => setShowModal(true)}
          className="
            bg-yellow-500 hover:bg-yellow-400
            text-black
            font-bold
            py-3 px-5
            rounded-xl
            cursor-pointer
            transition
            shadow-md
          "
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="
                  border-b
                  border-gray-200 dark:border-gray-700
                  bg-white dark:bg-gray-900
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  text-gray-800 dark:text-white
                  transition-colors
                "
              >
                <td className="p-4 whitespace-nowrap font-medium">
                  #{user.id}
                </td>

                <td className="p-4 whitespace-nowrap">{user.name}</td>

                <td className="p-4 whitespace-nowrap text-yellow-600 dark:text-yellow-500">
                  @{user.username}
                </td>

                <td className="p-4 whitespace-nowrap">{user.email}</td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="
                        bg-red-500 hover:bg-red-600
                        text-white
                        font-bold
                        py-2 px-3
                        rounded-lg
                        cursor-pointer
                        transition
                      "
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <button
                      onClick={() => setSelectedUser(user)}
                      className="
                        bg-blue-500 hover:bg-blue-600
                        text-white
                        font-bold
                        py-2 px-3
                        rounded-lg
                        cursor-pointer
                        transition
                      "
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="
            px-4 py-2
            bg-gray-200 dark:bg-gray-700
            text-black dark:text-white
            rounded-lg
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition
            cursor-pointer
            disabled:opacity-50
          "
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`
              px-4 py-2
              rounded-lg
              transition
              cursor-pointer

              ${
                currentPage === i + 1
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="
            px-4 py-2
            bg-gray-200 dark:bg-gray-700
            text-black dark:text-white
            rounded-lg
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition
            cursor-pointer
            disabled:opacity-50
          "
        >
          Next
        </button>
      </div>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddUser}
        />
      )}

      {selectedUser && (
        <EditUserModel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={handleEditUser}
        />
      )}
    </div>
  );
}
