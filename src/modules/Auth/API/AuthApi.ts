import axios from "axios";

type LoginInputs = {
  login: string;
  password: string;
};

export class AuthApi {
  static async loginByForm(formData: LoginInputs) {
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: formData.login,
        password: formData.password,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data)
    }
  }
}
