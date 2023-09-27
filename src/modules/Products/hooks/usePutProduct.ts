import { queryClient } from "../../..";
import { Product } from "../../../models";
import { ProductApi } from "../API/ProductApi";
import { useMutation } from "@tanstack/react-query";

export function usePutProduct() {
  const { mutate } = useMutation({
    mutationFn: (productId: Product) => ProductApi.updateProduct(productId),
    onSuccess: (data) => {
      const productsCache = queryClient.getQueryData(["products"]) as Array<Product>;
      queryClient.setQueryData(['product', data!.id], data)
      if (productsCache) {
        const filteredCache = productsCache.map((product: Product) => {
          return product.id === data!.id ? data : product
        });
        queryClient.setQueryData(["products"], filteredCache);
      }
    },
  });
  return mutate;
}
