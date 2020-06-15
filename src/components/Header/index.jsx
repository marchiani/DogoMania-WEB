import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import { FaSignOutAlt, FaBars } from 'react-icons/fa';

import logo from 'assets/DOGO.MANIA.png';

import store from 'store';

import Button from '../Button';
import Link from '../Link';

export default
@observer
class Header extends React.Component {
	state = {
		dropped: false,
	};
	componentDidMount() {
		this.disposeReaction = this.props.history?.listen(() => this.state.dropped && this.toggleMenu());
	}
	componentWillUnmount() {
		this.disposeReaction && this.disposeReaction();
	}
	toggleMenu = () => {
		this.setState({
			dropped: !this.state.dropped,
		});
	};
	render() {
		return (
			<>
				<div className={classNames('Header', { 'Header-Open': this.state.dropped })}>
					<div className={classNames('Header__Logo', { 'Header__Logo--isMobile': isMobile })}>
						<Link to="/">
							<img src={logo} alt="Dogo.Mania" onDoubleClick={() => alert(__BUILD_TIME__)} />
						</Link>
					</div>
					<div className="Header__Flex">
						{this.props.children}
						<div className="Header__User">
							{store.auth.user.fullName}
						</div>
						<Button onClick={() => this.props.store.auth.logout()}><FaSignOutAlt /></Button>
					</div>
				</div>
			</>
		);
	}
}

import './index.sass';
