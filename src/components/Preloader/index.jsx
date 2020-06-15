import React from 'react';
import classNames from 'classnames';

export default function (props) {
	return (
		<div className={classNames('_Preloader', props.className)}>
			<div className="_Preloader__Container">
				<div className="_Preloader__Dot _Preloader__Dot--First" />
				<div className="_Preloader__Dot _Preloader__Dot--Second" />
				<div className="_Preloader__Dot _Preloader__Dot--Third" />
			</div>

			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
					</filter>
				</defs>
			</svg>
		</div>
	);
}

import './index.sass';
