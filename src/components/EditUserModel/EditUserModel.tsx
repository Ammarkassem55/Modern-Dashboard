import { useFormik } from "formik";
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
type props = {
  user: User;
  onClose: () => void;
  onUpdate: (user: User) => void;
};

export default function EditUserModel({ user, onClose, onUpdate }: props) {
  const formik = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,
      email: user.email,
    },
    onSubmit: (values) => {
      onUpdate({ ...user, ...values });
      onClose();
    },
  });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-96 text-white">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
