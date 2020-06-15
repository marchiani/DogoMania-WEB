import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import Button from '../Button';

import store from 'store';

import logo from 'assets/Dogomania.Logo.png';

import Form from '../Form';

export default
@observer
class Registration extends React.Component {
	formRef = React.createRef();
	state = {
		timeByStart: 0,
	}
	componentDidMount() {
		this.timer = setInterval(() => this.setState({ timeByStart: (this.state.timeByStart + 1) }), 10000);
	}
	handleSubmit = async (values) => {
		await store.auth.signUp(values).then(() => window.open('/', '_self'));
	}
	render() {
		this.state.timeByStart > 4 && this.setState({ timeByStart: 0 });
		return (
			<div className={classNames('Registration', !isMobile && `Registration--backgroundImage${(this.state.timeByStart)}`)}>
				<div className={classNames('Registration__Modal', { 'Registration__Modal--isMobile': isMobile })}>
					<div className="Registration__Modal--Header">
						<img src={logo} alt="Dogo.Mania" onDoubleClick={() => alert(__BUILD_TIME__)} />
					</div>
					<div className="Registration__Modal--Body">
						<Form
							ref={this.formRef}
							initialValues={{
								username: '',
								password: '',
								email: '',
								firstName: '',
								lastName: '',
								phone: '',
							}}
							validate={(values) => {
								const errors = {};
								if (!(values.username.length > 0)) errors.username = 'is required';
								if (!(values.password.length > 0)) errors.password = 'is required';
								return errors;
							}}
							onSubmit={this.handleSubmit}
						>
							<Form.Field label="Username" name="username" />
							<Form.Field label="Password" name="password" type="password" />
							<Form.Field label="Email" name="email" />
							<Form.Field label="FirstName" name="firstName" />
							<Form.Field label="LastName" name="lastName" />
						</Form>
						<Button onClick={() => this.formRef.current.handleSubmit()}>SIGN UP</Button>
					</div>
					<div className="Registration__Modal--Footer">
						<h4>Have an account?</h4>
						<Button onClick={() => window.open('/', '_self')}>SIGN IN</Button>
					</div>
				</div>
			</div>
		);
	}
}

import '../Login/index.sass';
