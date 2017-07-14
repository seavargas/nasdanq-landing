import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App.js';
import Main from './Main.js';

render(
    <AppContainer>
        <Main />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./Main', () => {
        const NextApp = require('./Main').default;

        render(
            <AppContainer/>,
            document.getElementById('root')
        );
    });
}
