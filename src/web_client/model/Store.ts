
import { observable } from 'mobx';
import 'whatwg-fetch';

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

  constructor(fetchQueryFn: (query: string) => Promise<any>) {
    this.fetchQuery = fetchQueryFn;
  }

  async _loadTypeaheadProducts(partialName: string) {
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

  onSearchValueChange(event) {
    this.counter += 1;
    this._loadTypeaheadProducts(event.target.value);
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
