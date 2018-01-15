
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

interface StockMatrix {
  products: Product[];
  dentals: Dental[];
  dentalStocks: [{
    productStocks: number[];
  }];
}