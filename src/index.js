import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App.js';

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;

        render(
            <AppContainer>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
