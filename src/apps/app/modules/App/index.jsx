
import React from 'react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import { observer } from 'mobx-react';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import privatized from 'components/privatized';

import Preloader from 'components/Preloader';
import Header from 'components/Header';
import LinkButton from 'components/LinkButton';

import UserProfile from '../UserProfile';

import store from 'store';

export default
@privatized
@observer
class App extends React.Component {
	redirectFromMainRoute = () => '/';
	render() {
		return (
			store.pending && <Preloader />
			|| (
				<div className={classNames('App', { 'App--isMobile': isMobile })}>
					<Header
						store={store}
					>
						<LinkButton className="-withRightMargin" to={`/profile/${store.auth.user.id}`}>Profile</LinkButton>
					</Header>
					<div className="App__Body">
						<Switch>
							<Route exact path="/">
								<Redirect to={this.redirectFromMainRoute()} />
							</Route>
							<Route path="/profile" component={UserProfile} />
						</Switch>
					</div>
				</div>
			)
		);
	}
}

import './index.sass';
