import * as React from 'react';
import views from '../model/Views';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { Product } from '../../common/Interfaces';

const styles = {
  card: {
    width: 345,
  },
  media: {
    height: 200,
  },
};


interface IProps {
  product: Product;
  goTo: () => any;
  classes?: any;
}

function ProductCard(props: IProps) {
  const { product, goTo, classes } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={product.imageURL}
        title={product.name}
      />
      <CardContent>
        <Typography type="headline" component="h2">
          { product.name }
          </Typography>
        <Typography component="p">
          { product.description }
        </Typography>
      </CardContent>
      <CardActions>
        <Button dense color="primary">
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(ProductCard);