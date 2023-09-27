export type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export type User = {
  id: number;
  email: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}
