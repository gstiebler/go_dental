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

@observer
class SearchProducts extends React.Component<IProps> {
  render() {
    const { store, classes } = this.props;
    return (
      <div>
        <TextField
            id='search'
            label='Busca'
            className={classes.textField}
            onChange={store.onSearchValueChange.bind(store)}
            margin='normal'
          />
        { store.productsFromSearch.map(p => <div><br /><span> { p.name } - { p.description } </span></div> ) }
      </div>
    );
  }
}

const temp = (props: IProps) => <SearchProducts {...props} />;

export default withStyles(styles)(temp);
