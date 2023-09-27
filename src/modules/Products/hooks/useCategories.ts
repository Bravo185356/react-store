import { CategoriesApi } from "../API/CategoriesApi";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { data } = useQuery({ queryKey: ["categories"], queryFn: CategoriesApi.getAllCategories, staleTime: 5 * 60 * 1000 });
  return data;
}
