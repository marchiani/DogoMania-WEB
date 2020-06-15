import React from 'react';
import { findDOMNode } from 'react-dom';

export default class OutsideClick extends React.Component {
	componentDidMount() {
		this.node = findDOMNode(this);
		document.addEventListener('click', this.handleClickOutside);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside);
	}
	handleClickOutside = (e) => {
		if (this.node.contains(e.target)) {
			return false;
		}
		this.props.onClickOutside && this.props.onClickOutside(e);
	};
	render() {
		return this.props.children;
	}
}
