import { useMutation } from "@tanstack/react-query";
import { ProductApi } from "../API/ProductApi";
import { queryClient } from "../../..";
import { Product } from "../../../models";
import { AddProductInputs } from "../components/CatalogForm/CatalogForm";

export function useAddProduct() {
  const { mutate } = useMutation({
    mutationFn: (formData: AddProductInputs) => ProductApi.addNewProduct(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["products"], [...(queryClient.getQueryData(["products"]) as Array<Product>), data]);
    },
  });
  return [mutate];
}
