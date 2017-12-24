
import { observable } from 'mobx';
import 'whatwg-fetch';
import { RouterStore } from 'mobx-router';

interface Bunny {
  _id: string;
  name: string;
  count: number;
}

export class Store {

  fetchQuery: (query: string) => Promise<any>;
  @observable bunnies: Array<Bunny> = [];
  @observable selectedBunny: Bunny;
  @observable router: RouterStore;

  constructor(fetchQueryFn: (query: string) => Promise<any>) {
    this.fetchQuery = fetchQueryFn;
    this.router = new RouterStore();
  }

  async loadBunnies() {
    const queryBunnies = 'query { bunnies { _id, name, count } }';
    const res = await this.fetchQuery(queryBunnies);
    this.bunnies = res.bunnies;
  }

  async loadBunny(id: string) {
    const queryBunny = `query { bunny(id: "${id}") { _id, name, count } }`;
    const res = await this.fetchQuery(queryBunny);
    this.selectedBunny = res.bunny;
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
