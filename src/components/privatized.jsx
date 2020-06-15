import React from 'react';
import { observer } from 'mobx-react';
import { isMobile } from 'react-device-detect';

import Login from './Login';
import Registration from './Registration';

import store from 'store';
import history from 'common/history';

export default function privatized(Component) {
	isMobile && document.body.classList.add('--isMobile');
	console.log(store);
	return observer((props) => (!store.auth.isAuthorized
		&& <> {history.location.pathname === '/registration' ? <Registration /> : <Login />} </>
		|| <Component {...props} />));
}
