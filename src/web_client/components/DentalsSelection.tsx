import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}


@observer
class DentalsSelection extends React.Component<IProps> {
  render() {
    const { store, classes } = this.props;

    const headerColumns = store.stockMatrix.dentals.map((dental) => {
      return (<TableCell numeric key={dental._id} >{ dental.name }</TableCell>);
    });

    const productColumns = store.stockMatrix.products.map((product) => {
      const productRow = product.productPrices.map((pp) => {
        return <TableCell numeric>{pp}</TableCell>;
      });
      return <TableRow key={product.id}>{ productRow }</TableRow>;
    });

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              { headerColumns }
            </TableRow>
          </TableHead>
          <TableBody>
            { productColumns }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const temp = (props: IProps) => <DentalsSelection {...props} />;

export default withStyles(styles)(temp);
