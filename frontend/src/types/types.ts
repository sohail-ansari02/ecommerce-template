export interface iProduct {
  _id: string | number;
  name: string;
  description: string;
  category: string;
  images: [string, string];
  price: number;
  onSale: boolean;
  oldPrice?: number; //(only show on sale)
  quantity: number; // product quantity
  
  sizes?: any[];
  weight?: any[];
  height?: any[];
  woodType?: any[];
  addedToCart: boolean;

  type: 'gada' | 'dandpaat' | 'barbell' | 'combo' | 'mudgar';
}
