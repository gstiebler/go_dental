import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store, initStore } from './model/Store';
import { Provider } from 'mobx-react';
import { RouterStore } from 'mobx-router';
import { MobxRouter, startRouter } from 'mobx-router';
import views from './model/Views';
import Navbar from './components/Navbar';
import Button from 'material-ui/Button';
import { MuiThemeProvider } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';
import { red } from 'material-ui/colors';
import DevTools from 'mobx-react-devtools';

export const theme = createMuiTheme({
  palette: {
    error: red,
  },
});

initStore(RouterStore);
startRouter(views, store);

ReactDOM.render(
  <div>
    <Navbar />
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <MobxRouter/>
          <Button raised color="primary">
            Hello World
          </Button>
        </MuiThemeProvider>
      </Provider>
      <DevTools />
    </div>
  </div>,
  document.getElementById('root')
);
