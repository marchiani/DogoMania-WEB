import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends React.Component {
	constructor(props) {
		super(props);
		this.node = document.createElement('div');
		this.node.className = props.className;
		document.body.appendChild(this.node);
	}
	componentWillUnmount() {
		document.body.removeChild(this.node);
	}
	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this.node,
		);
	}
}

export function portal(options = {}) {
	return (Component) => forwardRef((props, ref) => {
		return (
			<Portal {...options}>
				<Component {...props} ref={ref} />
			</Portal>
		);
	});
}
