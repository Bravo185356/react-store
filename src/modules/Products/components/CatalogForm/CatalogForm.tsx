import { Button, FormControl, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import classes from "./CatalogForm.module.scss";
import { useAddProduct } from "../../hooks/useAddProduct";
import { useCategories } from "../../hooks/useCategories";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type AddProductInputs = {
  title: string;
  price: number;
  category: string;
  description: string;
  image?: any;
};
const schema = yup
  .object({
    title: yup.string().required('Обязательное поле'),
    price: yup.number().typeError('Укажите число').positive('Должно быть положительное число').required('Обязательное поле'),
    category: yup.string().required('Обязательное поле'),
    description: yup.string().required('Обязательное поле'),
  })
  .required();
export default function CatalogForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddProductInputs>({
    resolver: yupResolver(schema),
  });
  const [mutate] = useAddProduct();
  const categories = useCategories();

  async function addNewProduct(data: AddProductInputs) {
    data.image = data.image[0].name;
    mutate(data);
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit(addNewProduct)}>
      <FormControl className={classes.formBlock}>
        <TextField sx={{ width: "100%" }} {...register("title", { required: true })} label="Имя" variant="standard" />
        <div className={classes.errorMessage}>{errors.title?.message}</div>
      </FormControl>
      <FormControl className={classes.formBlock}>
        <TextField
          type="number"
          sx={{ width: "100%" }}
          {...register("price", { required: true })}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label="Цена"
          variant="standard"
        />
        <div className={classes.errorMessage}>{errors.price?.message}</div>
      </FormControl>
      <FormControl>
        <Select
          value={watch("category") || ""}
          {...register("category", { required: true })}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories?.map((category: string) => {
            return (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
        <div className={classes.errorMessage}>{errors.category?.message}</div>
      </FormControl>
      <FormControl className={classes.formBlock}>
        <TextField
          type="text"
          sx={{ width: "100%" }}
          {...register("description", { required: true })}
          label="Описание"
          variant="standard"
        />
        <div className={classes.errorMessage}>{errors.description?.message}</div>
      </FormControl>
      <FormControl className={classes.formBlock}>
        <Button component="label" variant="contained">
          Upload file
          <input {...register("image", { required: true })} className={classes.fileInput} type="file" />
        </Button>
      </FormControl>
      <div className={classes.buttonWrap}>
        <Button sx={{ width: "40%" }} variant="contained" type="submit">
          Добавить
        </Button>
      </div>
    </form>
  );
}
