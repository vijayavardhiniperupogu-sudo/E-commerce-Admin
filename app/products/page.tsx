"use client";

import { useState, useEffect } from "react";
import { productsData, ProductType } from "@/lib/data";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("products");
      return stored ? JSON.parse(stored) : productsData;
    }
    return productsData;
  });

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const openAddForm = () => {
    setFormData({ name: "", price: "", stock: "" });
    setEditIndex(null);
    setShowForm(true);
  };

  const openEditForm = (index: number) => {
    const p = products[index];
    setFormData({
      name: p.name,
      price: p.price.toString(),
      stock: p.stock.toString(),
    });
    setEditIndex(index);
    setShowForm(true);
  };

  const saveProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) return;

    const newProduct: ProductType = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
    } else {
      setProducts([...products, newProduct]);
    }

    setShowForm(false);
  };

  const deleteProduct = (index: number) => {
    const updated = products.filter((_: ProductType, i: number) => i !== index);
    setProducts(updated);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Products</h1>

      <button
        onClick={openAddForm}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">
                  {p.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                </td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEditForm(index)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-xl font-bold mb-4">
              {editIndex !== null ? "Edit Product" : "Add Product"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              className="w-full mb-4 p-2 border rounded"
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />

            <div className="flex justify-between">
              <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-3 py-1 rounded">
                Cancel
              </button>
              <button onClick={saveProduct} className="bg-blue-600 text-white px-3 py-1 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}