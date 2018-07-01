// react
import React from 'react';
import ReactDOM, { render } from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

// app
import App from './components/App';
import 'normalize.css';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);