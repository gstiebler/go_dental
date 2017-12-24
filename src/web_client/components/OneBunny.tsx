import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';

interface IProps {
  store: Store;
}

function OneBunnyView(props: IProps) {
  const selectedBunny = props.store.selectedBunny;
  if (!selectedBunny) return null;

  return (
    <div>
      { selectedBunny.name } - { selectedBunny.count }
    </div>
  );
}

export default observer(OneBunnyView);
