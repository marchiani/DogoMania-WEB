import React from 'react';
import { observer } from 'mobx-react';

import { FaPencilAlt, FaMapMarkerAlt } from 'react-icons/fa';

import UserProfileModel from 'models/User';

import Group from 'components/Group';
import Grid from 'components/Grid';
import Button from 'components/Button';

import UserProfileHeader from './components/UserProfileHeader';

import store from 'store';

import logo from 'assets/Avatar.jpg';

export default
@observer
class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.user = UserProfileModel.create({
			id: this.props.match.params.userProfileId,
		});
	}
	componentDidMount() {
		store.auth.user.id === this.props.match.params.userProfileId
			? this.user = store.auth.user
			: this.user.fetch();
	}
	render() {
		return (
			<div className="UserProfile">
				<div className="UserProfile__Modal">
					<section className="UserProfile__Modal__Header">
						<UserProfileHeader />
					</section>
				</div>
			</div>
		);
	}
}

import './index.sass';
