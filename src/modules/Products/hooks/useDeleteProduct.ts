import { queryClient } from "../../..";
import { Product } from "../../../models";
import { ProductApi } from "../API/ProductApi";
import { useMutation } from "@tanstack/react-query";

export function useDeleteProduct() {
  const { mutate } = useMutation({
    mutationFn: (productId: number) => ProductApi.getProduct(productId),
    onSuccess: (data) => {
      const productsCache = queryClient.getQueryData(["products"]) as Array<Product>;
      const filteredCache = productsCache.filter((product: Product) => product.id !== data.id);
      queryClient.setQueryData(["products"], filteredCache);
    },
  });
  return mutate;
}
