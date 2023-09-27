import App from "../App";
import CatalogPage from "../modules/Products/views/CatalogPage/CatalogPage";
import { createBrowserRouter } from "react-router-dom";
import ProductPage from "../modules/Products/views/ProductPage/ProductPage";
import AuthPage from "../modules/Auth/views/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: 'catalog/:id',
        element: <ProductPage />
      },
      {
        path: 'auth',
        element: <AuthPage />
      }
    ],
  },
]);

export default router;
