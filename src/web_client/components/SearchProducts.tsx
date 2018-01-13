import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function SearchProducts(props: IProps) {
  const { store, classes } = props;
  console.log('render2: ', JSON.stringify(store.counter));
  console.log('render: ', JSON.stringify(store.productsFromSearch));
  return (
    <div>
      <TextField
          id='search'
          label='Busca'
          className={classes.textField}
          onChange={store.onSearchValueChange.bind(store)}
          margin='normal'
        />
      { store.productsFromSearch.map(p => <span> { p.name } - { p.description } </span>) }
    </div>
  );
}

export default observer(withStyles(styles)(SearchProducts));
