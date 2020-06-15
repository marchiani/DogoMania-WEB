import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import DogAnimation from './DogAnimation';

import Button from '../Button';

import store from 'store';

import logo from 'assets/Dogomania.Logo.png';

import Form from '../Form';

export default
@observer
class Login extends React.Component {
	formRef = React.createRef();
	state = {
		timeByStart: 0,
	}
	componentDidMount() {
		this.timer = setInterval(() => this.setState({ timeByStart: (this.state.timeByStart + 1) }), 10000);
	}
	handleSubmit = async (values) => {
		await store.auth.login(values);
	}
	render() {
		this.state.timeByStart > 4 && this.setState({ timeByStart: 0 });
		return (
			<div className="Login--container">
				<DogAnimation />
				<div className={classNames('Login')}>
					<div className={classNames('Login__Modal', { 'Login__Modal--isMobile': isMobile })}>
						<div className="Login__Modal--Header">
							<img src={logo} alt="Dogo.Mania" onDoubleClick={() => alert(__BUILD_TIME__)} />
						</div>
						<div className="Login__Modal--Body">
							<Form
								ref={this.formRef}
								initialValues={{
									username: '',
									password: '',
								}}
								validate={(values) => {
									const errors = {};
									if (!(values.username.length > 0)) errors.username = 'is required';
									if (!(values.password.length > 0)) errors.password = 'is required';
									return errors;
								}}
								onSubmit={this.handleSubmit}
							>
								<Form.Field label="Login or Email" name="username" />
								<Form.Field label="Password" name="password" type="password" />
							</Form>
							<Button onClick={() => this.formRef.current.handleSubmit()}>SIGN IN</Button>
						</div>
						<div className="Login__Modal--Footer">
							<h4>Don't have an account?</h4>
							<Button onClick={() => window.open('/registration', '_self')}>SIGN UP</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

import './index.sass';
