import { useFormik } from "formik";
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};
type props = {
  onClose: () => void;
  onAdd: (product: Product) => void;
};

export default function AddProductModel({ onClose, onAdd }: props) {
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      image: "",
      category: "",
    },
    onSubmit: (values) => {
      const newProduct: Product = {
        id: Date.now(),
        title: values.title,
        price: Number(values.price),
        image: values.image,
        category: values.category,
      };
      onAdd(newProduct);
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-96 text-white">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              id="title"
              name="title"
              placeholder="Product Title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>
          <div className="mb-4">
            <input
              id="price"
              name="price"
              placeholder="Price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>
          <div className="mb-4">
            <input
              id="image"
              name="image"
              placeholder="Image URL"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.image}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
