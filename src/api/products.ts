import axiosInstance from './axiosInstance';
import type Product  from '../types/Product';

// category and search are both optional — if you don't pass them, we fetch everything.
// This one function will be reused for both Hr 1 (no filters) and Hr 2 (with filters).
export async function fetchProducts(category?: string, search?: string): Promise<Product[]> {
  const response = await axiosInstance.get<Product[]>('/products/', {
    params: { category, search },
    // axios automatically skips any param that's undefined — so calling
    // fetchProducts() with no arguments correctly hits /api/products/ with no query string
  });
  return response.data;
}