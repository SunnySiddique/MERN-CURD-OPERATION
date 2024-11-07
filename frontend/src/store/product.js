import axios from "axios";
import { create } from "zustand";
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      const res = await axios.post("/api/products", newProduct);
      const data = res.data;
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully." };
    } catch (error) {
      return { success: false, message: "Error creating product.", error };
    }
  },
  fetchProducts: async () => {
    const res = await axios.get("/api/products");
    set({ products: res.data.data });
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await axios.put(`/api/products/${pid}`, updatedProduct);
    if (!res.data.success) return { success: false, message: res.data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? res.data.data : product
      ),
    }));
    return { success: true, message: res.data.message };
  },
  deleteProduct: async (pid) => {
    const res = await axios.delete(`/api/products/${pid}`);
    if (!res.data.success) return { success: false, message: res.data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: res.data.message };
  },
}));
