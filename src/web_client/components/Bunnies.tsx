import * as React from 'react';
import { observer } from 'mobx-react';
import { Store, store } from '../model/Store';
import { Link } from 'mobx-router';
import views from '../model/Views';

interface IProps {
  store: Store;
}

function BunniesView(props: IProps) {
  const bunniesHTML = props.store.bunnies.map(b => {
    return <li><Link view={views.selectedBunny} params={{id: b._id}} store={store}>{ b.name }</Link> - { b.count }</li>;
  });

  return (
    <div>
      <ul>
        { bunniesHTML }
      </ul>
    </div>
  );
}

export default observer(BunniesView);
