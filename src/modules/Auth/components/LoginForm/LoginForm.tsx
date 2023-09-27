import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import classes from "./LoginForm.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

type Inputs = {
  login: string;
  password: string;
};
const schema = yup
.object({
  login: yup.string().required(),
  password: yup.string().min(6).required(),
})
.required()

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const mutation = useAuth();
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.isAuthSlice.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/catalog");
    }
  }, [navigate, isAuth]);
  async function login() {
    mutation.mutate(watch());
  }
  return (
    <div className={classes.formWrapper}>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Авторизация
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(login)}>
        {mutation.isError && <div>{mutation.error instanceof Error && mutation.error.message}</div>}
        <div className={classes.formBlock}>
          <TextField
            sx={{ width: "100%" }}
            {...register("login", { required: true })}
            defaultValue={"mor_2314"}
            label="Логин"
            variant="standard"
          />
          <div className={classes.errorMessage}>{errors.login?.message}</div>
        </div>
        <div className={classes.formBlock}>
          <TextField
            type="password"
            sx={{ width: "100%" }}
            {...register("password", { required: true, minLength: 6 })}
            defaultValue={"83r5^_"}
            label="Пароль"
            variant="standard"
          />
          {errors.password && (
            <div className={classes.errorMessage}>{errors.password?.message}</div>
          )}
        </div>
        <Button sx={{ width: "40%" }} variant="contained" type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
}
