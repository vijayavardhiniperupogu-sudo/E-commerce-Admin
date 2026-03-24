"use client";

import { useState, useEffect } from "react";
import { productsData, ProductType } from "@/lib/data";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("products");
      try {
        return stored ? JSON.parse(stored) : productsData;
      } catch {
        return productsData;
      }
    }
    return productsData;
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    price: number;
    stock: number;
  }>({
    name: "",
    price: 0,
    stock: 0,
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const openAddForm = () => {
    setFormData({ name: "", price: 0, stock: 0 });
    setEditId(null);
    setShowForm(true);
  };

  const openEditForm = (product: ProductType) => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const saveProduct = () => {
    if (!formData.name || formData.price <= 0 || formData.stock < 0) return;

    if (editId) {
      const updated = products.map((p) =>
        p.id === editId ? { ...p, ...formData } : p
      );
      setProducts(updated);
    } else {
      const newProduct: ProductType = {
        id: Date.now().toString(),
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
      };
      setProducts([...products, newProduct]);
    }

    setShowForm(false);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
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
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">
                  {p.price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEditForm(p)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
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
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              className="w-full mb-4 p-2 border rounded"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock: Number(e.target.value),
                })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}