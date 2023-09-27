import { ProductApi } from "../API/ProductApi";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  const { isLoading, data } = useQuery({ queryKey: ["products"], queryFn: ProductApi.getProducts, staleTime: 5 * 60 * 1000 });
  return [isLoading, data];
}
