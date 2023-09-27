import axios from "axios";

export class CategoriesApi {
  static async getAllCategories() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
