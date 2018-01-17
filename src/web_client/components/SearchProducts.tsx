import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import ProductCard from './ProductCard';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
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

const SPACING = 16;

let timeoutRef;
function onSearchValueChange(store: Store, partialName: string) {
  const TIMEOUT = 400;
  clearTimeout(timeoutRef);
  timeoutRef =
    setTimeout(() => {
      store.onSearchValueChange(partialName);
    }, TIMEOUT);
}

@observer
class SearchProducts extends React.Component<IProps> {
  render() {
    const { store, classes } = this.props;
    const goTo = store.router.goTo.bind(store.router);
    return (
      <div>
        <TextField
            id='search'
            label='Busca'
            className={classes.textField}
            onChange={event => onSearchValueChange(store, event.target.value)}
            margin='normal'
        />
        <Grid container justify='flex-start' spacing={SPACING} >
          { store.productsFromSearch.map(product => (
            <Grid key={product.code} item>
              <ProductCard product={ product } goTo={ goTo } />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const temp = (props: IProps) => <SearchProducts {...props} />;

export default withStyles(styles)(temp);
