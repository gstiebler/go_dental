import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import views from '../model/Views';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { Link } from 'mobx-router';


const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navbar(props) {
  const { store, classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit">
            GoDental
          </Typography>
          <Button onClick={ () => { store.router.goTo(views.home, {}, store); } }>Home</Button>
          <Button>
            <Link view={views.search} store={store}>Search</Link>
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default observer(withStyles(styles)(Navbar));
