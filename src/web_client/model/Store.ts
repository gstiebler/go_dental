
import { observable } from 'mobx';
import 'whatwg-fetch';
import { setTimeout } from 'timers';

interface Product {
  _id: string;
  name: string;
  code: string;
  description: number;
  imageURL: string;
}

export class Store {

  fetchQuery: (query: string) => Promise<any>;
  @observable router;
  @observable productsFromSearch: Array<Product> = [];
  @observable counter: number = 0;
  searchTimeout: any;

  constructor(fetchQueryFn: (query: string) => Promise<any>) {
    this.fetchQuery = fetchQueryFn;
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

  onSearchValueChange(event) {
    const TIMEOUT = 400;
    clearTimeout(this.searchTimeout);
    this.searchTimeout =
      setTimeout(this._loadTypeaheadProducts.bind(this, event.target.value), TIMEOUT);
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
