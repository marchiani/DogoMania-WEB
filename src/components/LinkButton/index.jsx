import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../Button';

function LinkButton({ to, staticContext, ...props }) {
	return (
		<Button
			{...props}
			onClick={() => {
				props.history.push(to);
			}}
		/>
	);
}

export default withRouter(LinkButton);
