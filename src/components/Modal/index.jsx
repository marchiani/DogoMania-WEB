import React from 'react';
import classNames from 'classnames';

import { portal } from '../../hoc/portal';
import OutsideClick from '../../hoc/OutsideClick';

import { CloseIcon } from '../../assets/icons';

export default
@portal({ className: '_Modal__Overlay' })
class Modal extends React.Component {
	static defaultProps = {
		onClose: () => {},
	};
	triggerClose = () => {
		this.props.onClose();
	};
	handleClickOutside = () => {
		!!this.props.closeOnClickOutside && this.triggerClose();
	};
	render() {
		return (
			<OutsideClick onClickOutside={this.handleClickOutside}>
				<div className={classNames('_Modal', this.props.className)}>
					{this.props.header
					&& (
						<div className="_Modal__Header">
							{this.props.header}
						</div>
					)}
					<div className="_Modal__Body">
						{this.props.children}
					</div>
					{this.props.footer
					&& (
						<div className="_Modal__Footer">
							{this.props.footer}
						</div>
					)}
					{this.props.closeButton && <CloseIcon className="_Modal__Close" onClick={this.triggerClose} />}
				</div>
			</OutsideClick>
		);
	}
}

import './index.sass';
