import React from 'react';
import { observer } from 'mobx-react';

import UserProfileModel from 'models/User';

import Group from 'components/Group';
import Button from 'components/Button';

import store from 'store';

import logo from 'assets/DOGO.MANIA.png';

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
				<section className="UserProfile__Header">
					<div className="UserProfile__Header__Header">
						<Group>
							<Button>Do order</Button>
						</Group>
						<img src={logo} alt="UserPhoto" />
					</div>
				</section>
			</div>
		);
	}
}

import './index.sass';
