export interface iProduct {
  _id: string | number;
  name: string;
  description: string;
  sizes: string[];
  category: string;
  images: [string, string];
  price: number;
  onSale: boolean;
  oldPrice?: number; //(only show on sale)
  quantity: number; // cart quantity

  weight?: number;
  height?: number;
  addedToCart: boolean;
}
