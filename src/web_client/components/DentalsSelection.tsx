import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import * as _ from 'lodash';

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

  componentDidMount() {
    this.props.store.onMatrixPageDisplay();
  }

  render() {
    const { store, classes } = this.props;

    if (!store.stockMatrix) {
      return <div/>;
    }

    const dentalColumns = store.stockMatrix.dentals.map((dental) => {
      return (<TableCell numeric key={dental._id} >{ dental.name }</TableCell>);
    });
    const headerColumns = [
      <TableCell key='product' >Produto</TableCell>,
      ...dentalColumns,
    ];

    const productColumns = store.stockMatrix.products.map((product) => {
      const productRow = product.productPrices.map((pp) => {
        const formattedValue = _.isUndefined(pp) ? '-' : pp.toFixed(2);
        return <TableCell numeric>{formattedValue}</TableCell>;
      });
      return <TableRow key={product.id}>
        <TableCell>{ product.name }</TableCell>
        { productRow }
      </TableRow>;
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
