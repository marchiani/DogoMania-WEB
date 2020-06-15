import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import history from 'common/history';

import App from 'modules/App';

import appStore from 'store';

history.listen((location) => {
	appStore.location.updateSearch(location.search);
});

render(
	<Router history={history}>
		<App appName="app" />
	</Router>,
	document.getElementById('app'),
);
