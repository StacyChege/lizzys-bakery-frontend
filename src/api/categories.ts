import axiosInstance from './axiosInstance';
import type Category from '../types/Category';

// This function does ONE thing: ask the backend for all categories.
// It doesn't touch React state at all — that happens in the component that calls this.
export async function fetchCategories(): Promise<Category[]> {
  const response = await axiosInstance.get<Category[]>('/categories/');
  return response.data;
}