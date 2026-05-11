import { useFormik } from "formik";
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};
type Props = {
  product: Product;
  onClose: () => void;
  onEdit: (product: Product) => void;
};

export default function EditProductModel({ product, onClose, onEdit }: Props) {
  const formik = useFormik({
    initialValues: {
      title: product.title,
      price: product.price,
      image: product.image,
    },
    onSubmit: (values) => {
      onEdit({
        ...product,
        title: values.title,
        price: Number(values.price),
        image: values.image,
      });
      onClose();
    },
  });
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center  ">
      <div className="bg-gray-900 p-6 rounded-xl w-96 text-white ">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full p-2 rounded bg-gray-800 mb-4"
          />
          <input
            type="number"
            placeholder="Price"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="w-full p-2 rounded bg-gray-800 mb-4"
          />
          <input
            type="text"
            placeholder="Image URL"
            onChange={formik.handleChange}
            value={formik.values.image}
            className="w-full p-2 rounded bg-gray-800 mb-4"
          />
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
