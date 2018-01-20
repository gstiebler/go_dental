
import { observable } from 'mobx';
import 'whatwg-fetch';
import { setTimeout } from 'timers';
import { computed } from 'mobx';
import { Product, StockInfo } from '../../common/Interfaces';
import * as network from '../lib/network';
import views from '../model/Views';


type ProductId = string;

interface CartItem {
  product: Product;
  count: number;
  dentalId?: string;
}

interface StockMatrix {
  dentals: {
    _id: string;
    name: string;
  }[];
  products: {
    id: string;
    name: string;
    productPrices: number[];
  }[];
}

async function _loadStock(productIds: string[]): Promise<StockInfo> {
  const formattedProductIds = productIds.map(pId => `"${pId}"`);
  const query = `
    query {
      stockMatrix(productIds: [${formattedProductIds.join(', ')}]) {
        stockItems {
          product,
          dental,
          price
        },
        products {
          _id,
          name
        },
        dentals {
          _id,
          name
        }
      }
    }
  `;
  const res = await network.fetchQuery(query);
  return res.stockMatrix;
}

function _genStockMatrix(stock: StockInfo): StockMatrix {
  const stockMap: Map<string, number> = new Map();
  for (const stockItem of stock.stockItems) {
    const mapKey = `${stockItem.dental}-${stockItem.product}`;
    stockMap.set(mapKey, stockItem.price);
  }
  const products = stock.products.map((product) => {
    const productPrices = stock.dentals.map((dental) => {
      const id = `${dental._id}-${product._id}`;
      return stockMap.get(id);
    });

    return {
      id: product._id,
      name: product.name,
      productPrices,
    };
  });

  return {
    dentals: stock.dentals,
    products,
  };
}

async function _loadTypeaheadProducts(partialName: string): Promise<Product[]> {
  if (partialName === '') {
    return [];
  }
  const query = `
    query {
      productsTypeahead(partialName: "${partialName}") {
        _id,
        name,
        description,
        code,
        imageURL
      }
    }
  `;
  const res = await network.fetchQuery(query);
  return res.productsTypeahead;
}

export class Store {

  @observable router;
  @observable productsFromSearch: Product[] = [];
  @observable cart: Map<ProductId, CartItem>;
  @observable stockMatrix: StockMatrix;
  selectedProduct: Product;
  searchTimeout: any;

  constructor() {
    this.cart = new Map();
  }

  getProductCount(productId: string): number {
    const productCount = this.cart.get(productId);
    return productCount ? productCount.count : 0;
  }

  @computed
  get getCartAsArray(): CartItem[] {
    return Array.from(this.cart.values());
  }

  async onSearchValueChange(partialName: string) {
    this.productsFromSearch = await _loadTypeaheadProducts(partialName);
  }

  onProductSelected(selectedProduct) {
    this.selectedProduct = selectedProduct;
  }

  onProductCountChanged(product: Product, count: number) {
    if (count === 0) {
      this.cart.delete(product._id);
    } else {
      const cartItem = this.cart.get(product._id) || { product, count };
      cartItem.count = count;
      this.cart.set(product._id, cartItem);
    }
  }

  async onMatrixPageDisplay() {
    const productIds = this.getCartAsArray.map(pc => pc.product._id);
    const stock = await _loadStock(productIds);
    this.stockMatrix = _genStockMatrix(stock);
  }

  async onDentalOfProductSelected(productId: string, dentalId: string) {
    this.cart.get(productId).dentalId = dentalId;
  }

}

export let store = new Store();
