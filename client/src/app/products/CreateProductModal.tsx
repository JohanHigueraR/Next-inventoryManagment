import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-[var(--color-text)] mb-1";
  const inputCssStyles =
    "block w-full mb-3 p-2 border-2 border-[var(--color-gray-300)] rounded-md bg-[var(--color-card-bg)] text-[var(--color-text)] placeholder-[var(--color-gray-500)] focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200";

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* Fondo semitransparente, deja ver el contenido detrás */}
      <div className="absolute inset-0  bg-opacity-70 backdrop-blur-sm transition-all" />
      <div className="relative p-6 border border-[var(--color-gray-200)] w-full max-w-md shadow-2xl rounded-xl bg-[var(--color-card-bg)]">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            min={0}
            max={5}
            step={0.1}
            className={inputCssStyles}
            required
          />

          {/* CREATE ACTIONS */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-card-bg)] rounded font-semibold hover:bg-[var(--color-blue-400)] transition-colors"
            >
              Create
            </button>
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-[var(--color-gray-500)] text-[var(--color-card-bg)] rounded font-semibold hover:bg-[var(--color-gray-700)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;