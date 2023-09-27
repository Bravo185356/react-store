import { Product } from "../../../../models";
import { useProducts } from "../../hooks/useProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
import classes from "./CatalogPage.module.scss";
import CatalogForm from "../../components/CatalogForm/CatalogForm";
import { useState } from "react";
import { Button } from "@mui/material";

export default function CatalogPage() {
  const [isLoading, products] = useProducts();
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  
  return (
    <>
      <div className={classes.buttonWrap}>
        <Button className={classes.showFormButton} onClick={() => setShowNewProductForm(!showNewProductForm)} variant="contained">
          Добавить товар
        </Button>
      </div>
      {showNewProductForm && <CatalogForm />}
      {!isLoading ? (
        <div className={classes.catalog}>
          {products?.map((product: Product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div>Загрузка</div>
      )}
    </>
  );
}
