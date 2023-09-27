import classes from "./Header.module.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCookies } from "react-cookie";
import { setIsAuth } from "../../store/slices/isAuth";

export default function Header() {

  const [,,removeCookies] = useCookies(['token'])

  const isAuth = useAppSelector((state) => state.isAuthSlice.isAuth);
  const dispatch = useAppDispatch()

  function logout() {
    removeCookies('token')
    dispatch(setIsAuth(false))
  }

  return (
    <header className={classes.header}>
      <div className={classes.title}>Store</div>
      <Link className={classes.link} to={'/catalog'}>Каталог</Link>
      {!isAuth ? (
        <Link to="auth">
          <Button variant="contained">Войти</Button>
        </Link>
      ) : (
        <Button onClick={logout} variant="contained">Выйти</Button>
      )}
    </header>
  );
}
