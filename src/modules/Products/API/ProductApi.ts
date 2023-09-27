import axios from "axios";
import { Product } from "../../../models";

export class ProductApi {
  static async getProducts() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getProduct(id: number) {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return response.data
    } catch (error) {
      console.log(error);
    }
  }
  static async addNewProduct(newProductInfo: any) {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', {
        newProductInfo
      })
      // API возвращает только id, поэтому добавляем id к product и возвращаем целый объект
      newProductInfo.id = response.data.id
      return newProductInfo
    } catch (error) {
      console.log(error)
    }
  }
  static async deleteProduct(id: number) {
    try {
      const response = await axios.delete(`https://fakestoreapi.com/products/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  static async updateProduct(product: Product) {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, {
        product
      })
      // API возвращает только id, поэтому добавляем id к product и возвращаем целый объект
      product.id = response.data.id
      return product
    } catch (error) {
      console.log(error)
    }
  }
}
