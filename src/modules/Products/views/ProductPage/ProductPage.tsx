import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Typography } from "@mui/material";
import { useProduct } from "../../hooks/useProduct";
import classes from "./ProductPage.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { usePutProduct } from "../../hooks/usePutProduct";

export default function ProductPage() {
  const [isEdit, setIsEdit] = useState({ showInput: false, inputName: "" });
  const { id } = useParams();
  const [isLoading, product] = useProduct(Number(id));
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutate = usePutProduct();
  function editProduct(data: any) {
    product[isEdit.inputName] = data[isEdit.inputName];
    mutate(product);
    setIsEdit({ showInput: false, inputName: "" });
  }
  return (
    <>
      {!isLoading ? (
        <div className={classes.productContainer}>
          <div className={classes.productImage}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={classes.productInfo}>
            <Typography className={classes.infoBlock} variant="h5">
              Название: <EditIcon onClick={() => setIsEdit({ showInput: true, inputName: "title" })} />
              {isEdit.showInput && isEdit.inputName === "title" ? (
                <form onSubmit={handleSubmit(editProduct)} className={classes.editBlock}>
                  <Input {...register("title", { required: true })} fullWidth defaultValue={product.title} />
                  {errors.title && <div>This field is required</div>}
                  <Button type="submit" variant="contained">
                    Сохранить
                  </Button>
                </form>
              ) : (
                <span>{product?.title}</span>
              )}
            </Typography>
            <Typography className={classes.infoBlock} variant="subtitle1">
              Категория: <EditIcon onClick={() => setIsEdit({ showInput: true, inputName: "category" })} />
              {isEdit.showInput && isEdit.inputName === "category" ? (
                <form onSubmit={handleSubmit(editProduct)} className={classes.editBlock}>
                  <Input {...register("category", { required: true })} fullWidth defaultValue={product.category} />
                  {errors.category && <div>This field is required</div>}
                  <Button type="submit" variant="contained">
                    Сохранить
                  </Button>
                </form>
              ) : (
                <span>{product?.category}</span>
              )}
            </Typography>
            <Typography className={classes.infoBlock} variant="subtitle1">
              Цена: <EditIcon onClick={() => setIsEdit({ showInput: true, inputName: "price" })} />
              {isEdit.showInput && isEdit.inputName === "price" ? (
                <form onSubmit={handleSubmit(editProduct)} className={classes.editBlock}>
                  <Input {...register("price", { required: true })} fullWidth defaultValue={product.price} />
                  {errors.price && <div>This field is required</div>}
                  <Button type="submit" variant="contained">
                    Сохранить
                  </Button>
                </form>
              ) : (
                <span>${product?.price}</span>
              )}
            </Typography>
            <Typography className={classes.infoBlock} variant="subtitle1">
              Описание: <EditIcon onClick={() => setIsEdit({ showInput: true, inputName: "description" })} />
              {isEdit.showInput && isEdit.inputName === "description" ? (
                <form onSubmit={handleSubmit(editProduct)} className={classes.editBlock}>
                  <Input {...register("description", { required: true })} fullWidth defaultValue={product.description} />
                  {errors.description && <div>This field is required</div>}
                  <Button type="submit" variant="contained">
                    Сохранить
                  </Button>
                </form>
              ) : (
                <span>{product?.description}</span>
              )}
            </Typography>
            <div className={classes.controls}>
              <Button variant="contained">Купить</Button>
              <Button onClick={() => navigate("/catalog")} variant="contained">
                Назад
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>Загрузка</div>
      )}
    </>
  );
}
