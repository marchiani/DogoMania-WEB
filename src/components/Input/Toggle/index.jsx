import React from 'react';
import classNames from 'classnames';

import withClassName from 'components/hoc/withClassName';

import input from '../input';

export default
@withClassName('_Input')
@input ('_ToggleInput')
class ToggleInput extends React.Component {
	static defaultProps = {
		value: false,
	};
	handleChange = (e) => {
		this.props.onChange(e.target.checked);
	};
	render() {
		const value = !!+this.props.value;
		return (
			<label
				className={classNames('_ToggleInput__Input', {'_ToggleInput__Input--True' : value})}
			>
				<input
					{...this.props}
					type="checkbox"
					onChange={this.handleChange}
					checked={value}
				/>
			</label>
		);
	}
}

import './index.sass';
