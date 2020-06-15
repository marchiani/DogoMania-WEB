import React from 'react';
import classNames from 'classnames';


export default function Button({ _ghost, ...props }) {
	const Component = !!props.href ? 'a' : 'button';
	if (props.disabled) {
		delete props.onClick;
	}
	return (
		<Component type="button" {...props} className={classNames('_Button', props.className, { '_Button--Ghost': _ghost }, { '_Button--Disabled': props.disabled })}>
			{props.children}
		</Component>
	);
}

import './index.sass';
