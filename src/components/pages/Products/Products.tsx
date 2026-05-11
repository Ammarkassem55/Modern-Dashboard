import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import AddProductModel from "../../AddProductModel/AddProductModel";
import EditProductModel from "../../EditProductModel/EditProductModel";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-2xl text-black dark:text-white">
        <h1 className="text-2xl mb-4">Loading...</h1>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="p-6 text-center text-2xl text-black dark:text-white">
        <h1 className="text-2xl mb-4">No products available.</h1>
      </div>
    );
  }

  function handleDelete(id: number) {
    setProducts(products.filter((product) => product.id !== id));
  }
  function handleAddProduct(newProduct: Product) {
    setProducts([newProduct, ...products]);
  }
  function handleEditProduct(editedProduct: Product) {
    setProducts(
      products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product,
      ),
    );
    setSelectedProduct(null);
  }

  return (
    <div className="p-6 text-black dark:text-white">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">Products</h1>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 ">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white w-full md:w-1/2 outline-yellow-500 outline-2
                    "
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white cursor-pointer outline-yellow-500 outline-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-bold py-2 px-4 rounded mb-4 cursor-pointer"
      >
        Add Product
      </button>
      {filteredProducts.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
          No products found
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            className="bg-white dark:bg-gray-900 p-4 rounded-xl text-black dark:text-white flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer shadow-lg"
            key={product.id}
          >
            <div className="h-28 flex items-center justify-center bg-gray-100 dark:bg-white rounded-lg mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-28 object-contain"
              />
            </div>
            <p className="text-lg font-semibold line-clamp-1">
              {product.title}
            </p>
            <p className="text-xl font-bold text-yellow-500">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSelectedProduct(product)}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg text-white font-bold transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white font-bold transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <AddProductModel
          onClose={() => setShowModal(false)}
          onAdd={handleAddProduct}
        />
      )}
      {selectedProduct && (
        <EditProductModel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEdit={handleEditProduct}
        />
      )}
    </div>
  );
}
