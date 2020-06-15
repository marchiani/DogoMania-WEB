import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserProfile from './UserProfile';

export default function () {
	return (
		<Switch>
			<Route path="/profile/:userProfileId" component={UserProfile} />
		</Switch>
	);
}
