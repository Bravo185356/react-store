import { useCookies } from "react-cookie";
import { AuthApi } from "../API/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../../store/hooks";
import { setIsAuth } from "../../../store/slices/isAuth";

type FormData = {
  login: string;
  password: string;
};

export function useAuth() {
  const [, setCookies] = useCookies();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: (formData: FormData) => AuthApi.loginByForm(formData),
    onSuccess: (data) => {
      if (data) {
        setCookies("token", data.token);
        dispatch(setIsAuth(true));
      }
    }
  });
  return mutation;
}
