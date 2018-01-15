
import { observable } from 'mobx';
import 'whatwg-fetch';
import { setTimeout } from 'timers';
import { computed } from 'mobx';
import { Product, StockInfo } from '../../common/Interfaces';


interface ProductCount {
  count: number;
  product: Product;
}

async function _loadStock(productIds: string[], fetchQueryFn): Promise<StockInfo> {
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
  return await fetchQueryFn(query);
}

/*function _genStockMatrix(stock) {

}*/

export class Store {

  fetchQuery: (query: string) => Promise<any>;
  @observable router;
  @observable productsFromSearch: Array<Product> = [];
  @observable cart: Map<string, ProductCount>;
  selectedProduct: Product;
  searchTimeout: any;

  constructor(fetchQueryFn: (query: string) => Promise<any>) {
    this.fetchQuery = fetchQueryFn;
    this.cart = new Map();
  }

  async _loadTypeaheadProducts(partialName: string) {
    if (partialName === '') {
      this.productsFromSearch = [];
    } else {
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
      const res = await this.fetchQuery(query);
      this.productsFromSearch = res.productsTypeahead;
    }
  }

  async _loadStockMatrix() {
    const productIds = this.getCartAsArray.map(pc => `"${pc.product._id}"`);
    const query = `
      query {
        stockMatrix(productIds: [${productIds.join(', ')}]) {
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
    const res = await this.fetchQuery(query);
    console.log(JSON.stringify(res, null, 2));
  }

  getProductCount(productId: string): number {
    const productCount = this.cart.get(productId);
    return productCount ? productCount.count : 0;
  }

  @computed
  get getCartAsArray(): ProductCount[] {
    return Array.from(this.cart.values());
  }

  onSearchValueChange(event) {
    const TIMEOUT = 400;
    clearTimeout(this.searchTimeout);
    this.searchTimeout =
      setTimeout(this._loadTypeaheadProducts.bind(this, event.target.value), TIMEOUT);
  }

  onProductSelected(selectedProduct) {
    this.selectedProduct = selectedProduct;
  }

  onProductCountChanged(product: Product, count: number) {
    const productCount = this.cart.get(product._id) || { product, count };
    productCount.count = count;
    this.cart.set(product._id, productCount);
  }

  async onMatrixPageDisplay() {
    const productIds = this.getCartAsArray.map(pc => pc.product._id);
    const stock = await _loadStock(productIds, this.fetchQuery);
    console.log(JSON.stringify(stock, null, 2));
  }

}

async function fetchQuery(query: String): Promise<any> {
  try {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    if(json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }
    return json.data;
  } catch (err) {
    console.error(err);
    throw new Error(JSON.stringify(err));
  }
}

export let store = new Store(fetchQuery);
