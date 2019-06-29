import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import route from './router';
import store from './store';

ReactDom.render(
    <Provider store= {store}>
        {route}
    </Provider>,
    document.getElementById('root')
)