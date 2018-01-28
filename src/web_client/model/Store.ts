
import { observable } from 'mobx';
import 'whatwg-fetch';
import { setTimeout } from 'timers';
import { computed } from 'mobx';
import { Product, StockInfo } from '../../common/Interfaces';
import * as network from '../lib/network';
import views from '../model/Views';

function objToGrahqlStr(obj: any): string {
  const str = JSON.stringify(obj);
  return str.replace(/\"([^(\")"]+)\":/g, '$1:');
}

type ProductId = string;

interface CartItem {
  product: Product;
  qty: number;
  dentalId: string;
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

interface OrderDetail {
  productId: ProductId;
  dentalId: string;
  qty: number;
  price: number;
}

interface IStockQuery {
  productId: ProductId;
  qty: number;
}

async function _loadStock(products: IStockQuery[]): Promise<StockInfo> {
  const query = `
    query {
      stockMatrix(products: ${objToGrahqlStr(products)}) {
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

async function sendOrder(userId: string, orderDetails: OrderDetail[]) {
  const orderDetailsStr = objToGrahqlStr(orderDetails);
  const mutationQuery = `
    mutation {
      newOrder(userId: "${userId}", orderDetails: ${orderDetailsStr})
    }
  `;
  const res = await network.fetchQuery(mutationQuery);
  return res;
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

  getProductQty(productId: string): number {
    const productQty = this.cart.get(productId);
    return productQty ? productQty.qty : 0;
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

  onProductQtyChanged(product: Product, qty: number) {
    if (qty === 0) {
      this.cart.delete(product._id);
    } else {
      const cartItem = this.cart.get(product._id) || { product, qty, dentalId: '' };
      cartItem.qty = qty;
      this.cart.set(product._id, cartItem);
    }
  }

  async onMatrixPageDisplay() {
    const products: IStockQuery[] = this.getCartAsArray.map(pc => ({
      productId: pc.product._id,
      qty: pc.qty,
    }));
    const stock = await _loadStock(products);
    this.stockMatrix = _genStockMatrix(stock);
  }

  async onDentalOfProductSelected(productId: string, dentalId: string) {
    this.cart.get(productId).dentalId = dentalId;
  }

  async onOrderRequested() {
    const orderDetails:OrderDetail[] = this.getCartAsArray.map((cartItem) => {
      const dentalIndex = this.stockMatrix.dentals.findIndex(d => d._id === cartItem.dentalId);
      const product = this.stockMatrix.products.find(p => p.id === cartItem.product._id);
      const price = product.productPrices[dentalIndex];
      return {
        productId: cartItem.product._id,
        dentalId: cartItem.dentalId,
        qty: cartItem.qty,
        price,
        name: cartItem.product.name,
        description: cartItem.product.description,
      };
    });
    await sendOrder('userID', orderDetails);
    this.cart = new Map();
  }

}

export let store = new Store();
