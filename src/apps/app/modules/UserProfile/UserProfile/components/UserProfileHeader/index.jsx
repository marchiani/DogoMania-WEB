import React from 'react';
import { observer } from 'mobx-react';
import { Tooltip } from 'react-tippy';

import { FaPencilAlt, FaRegCheckCircle } from 'react-icons/fa';

import Group from 'components/Group';
import Grid from 'components/Grid';
import Button from 'components/Button';

import store from 'store';

import logo from 'assets/Avatar.jpg';

const SING_BEYONG = {
	1: 'Всего Прогулок',
	2: 'Средняя оценка',
	3: 'Месяцев на сайте',
	4: 'Лет опыта водом',
};

export default
@observer
class UserProfileHeader extends React.Component {
	render() {
		return (
			<div className="UserHeader">
				<Grid>
					<Grid.Row>
						<Grid.Col col={3}>
							<div className="UserHeader__UserPhoto">
								<img src={logo} alt="UserPhoto" />
								<Group>
									{/* DOTO: if user is dog walker */}
									<Button>Order walk</Button>
									<Button className="UserHeader__UserPhoto--FaPencilAlt"> <FaPencilAlt /></Button>
								</Group>
							</div>
						</Grid.Col>
						<Grid.Col col={9}>
							<Grid.Row>
								<div className="UserHeader__Info">
									<div className="UserHeader__Info--UserInfo">
										<div className="UserHeader__Info--UserInfo--UserName">Short N.</div>
										<div className="UserHeader__Info--UserInfo--Location">Location: ул. Исаакяна, 2, Киев, 02000</div>
										<div className="UserHeader__Info--UserInfo--Age">Age: 23</div>
									</div>
									<div className="UserHeader__Info--Confirmation">
										<Tooltip
											html={(
												<div className="UserHeader__Info--Confirmation--Tooltip">
													User confim his passport
												</div>
											)}
										>
											<FaRegCheckCircle />
										</Tooltip>
									</div>
								</div>
							</Grid.Row>
							<div className="UserHeader__Rate">
								<hr />
								<Grid.Row>
									{Object.keys(SING_BEYONG).map((key, index) => (
										<Grid.Col key={key} col={3}>
											{SING_BEYONG[key]}
											<div>
												32
											</div>

										</Grid.Col>
									))}
								</Grid.Row>
							</div>
						</Grid.Col>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

import './index.sass';
