import { ProductApi } from "../API/ProductApi";
import { useQuery } from "@tanstack/react-query";

export function useProduct(id: number) {
  const { isLoading, data } = useQuery({ queryKey: ["product", id], queryFn: () => ProductApi.getProduct(id), staleTime: 5 * 60 * 1000 });
  return [isLoading, data];
}
