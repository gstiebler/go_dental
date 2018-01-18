import * as React from 'react';
import views from '../model/Views';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { Product } from '../../common/Interfaces';
import { Store } from '../model/Store';

const styles = {
};

interface IProps {
  store: Store;
  classes?: any;
}

function ProductDetails(props: IProps) {
  const { classes, store } = props;
  return (
    <Paper>
        <img src={store.selectedProduct.imageURL} />
        <Typography>Produto: {store.selectedProduct.name}</Typography>
        <Typography>Descrição: {store.selectedProduct.description}</Typography>
    </Paper>
  );
}

export default withStyles(styles)(ProductDetails);
