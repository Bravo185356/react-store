import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./styles/nullstyle.css";
import "./styles/style.scss";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { setIsAuth } from "./store/slices/isAuth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (cookies.token) {
      dispatch(setIsAuth(true));
    }
    if(location.pathname === '/') {
      navigate('/catalog')
    }
  }, [dispatch, cookies.token, location.pathname, navigate]);

  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
