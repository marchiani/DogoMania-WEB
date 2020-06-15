import React from 'react';

import withClassName from '../hoc/withClassName';

export default withClassName('_Toast')(
	({ className, title, message }) => (
		<div className={className}>
			{!!title && (
				<div className="_Toast__Title">
					{title}
				</div>
			)}
			{!!message && (
				<div className="_Toast__Message">
					{message}
				</div>
			)}
		</div>
	),
);

import './index.sass';
