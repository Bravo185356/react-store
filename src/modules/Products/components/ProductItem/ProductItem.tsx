import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../../../models";
import classes from "./ProductItem.module.scss";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const mutate = useDeleteProduct();

  function deleteProduct() {
    mutate(product.id);
  }
  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", p: 2 }}>
      <div className={classes.deleteButtonWrap}>
        <DeleteIcon onClick={deleteProduct} />
      </div>
      <CardMedia sx={{ objectFit: "contain" }} component="img" alt={product.title} height="140" image={product.image} />
      <CardContent sx={{ flexGrow: 1, p: "10px 0px" }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
          Категория: {product.category}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
          Цена: ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" className={classes.description}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 0, gap: 1 }}>
        <Button variant="contained" size="small">
          В корзину
        </Button>
        <Link to={`/catalog/${product.id}`}>
          <Button variant="contained" size="small">
            Подробней
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
