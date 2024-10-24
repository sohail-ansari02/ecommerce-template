export interface Product {
  _id: string | number;
  images: [string, string];
  name: string;
  price: number;
  onSale: boolean;
  oldPrice?: number; //(only show on sale)
}
