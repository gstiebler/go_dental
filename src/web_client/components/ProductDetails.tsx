import * as React from 'react';
import views from '../model/Views';
import { observer } from 'mobx-react';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { Product } from '../../common/Interfaces';
import { Store } from '../model/Store';

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

function onCountChanged(store: Store, product: Product, event) {
  const value = Number(event.target.value);
  store.onProductCountChanged(product, value);
}
@observer
class ProductDetails extends React.Component<IProps> {
  render() {
    const { classes, store } = this.props;
    const value = store.getProductCount(store.selectedProduct._id);
    return (
      <Paper>
        <img src={store.selectedProduct.imageURL} />
        <Typography>Produto: {store.selectedProduct.name}</Typography>
        <Typography>Descrição: {store.selectedProduct.description}</Typography>
        <Typography>Quantidade: </Typography>
        <TextField
            label="Quantidade"
            value={value}
            onChange={event => onCountChanged(store, store.selectedProduct, event)}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
      </Paper>
    );
  }
}

const temp = (props: IProps) => <ProductDetails {...props} />;

export default withStyles(styles)(temp);
