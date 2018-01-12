import * as React from 'react';
import { observer } from 'mobx-react';
import { Store, store } from '../model/Store';

interface IProps {
  store: Store;
}

function SearchProducts(props: IProps) {
  return (
    <div>
      Busca aqui
    </div>
  );
}

export default observer(SearchProducts);
