
export interface Product {
  _id: string;
  name: string;
  code: string;
  description?: number;
  imageURL?: string;
}

interface Dental {
  _id: string;
  name: string;
}

interface StockInfo {
  products: [{
    _id: string;
    name: string;
  }];
  dentals: {
    _id: string;
    name: string;
  }[];
  stockItems: [{
    product: string;
    dental: string;
    price: number;
  }];
}