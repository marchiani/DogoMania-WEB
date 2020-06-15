import { flow, types } from 'mobx-state-tree';

import history from 'common/history';

import LocationModel from 'models/HistoryLocation';
import AuthModel, { getAuthFromCookies } from 'models/Auth';

import moment from 'moment';

export default types
	.model('Store', {
		auth: types.optional(AuthModel, getAuthFromCookies()),
		location: types.optional(LocationModel, history.location),
	})
	.volatile(() => ({
		pending: false,
		userDataPending: false,
		buffer: null,
	}))
	.views((self) => ({
		get moment() {
			return self.location.query.date
				? moment
					.utc(self.location.query.date)
					.startOf('day')
				: moment
					.utc()
					.startOf('week');
		},
	}))
	.actions((self) => ({
		fetch: flow(function* (withRole = true) {
			try {
				self.pending = true;
				if (withRole) {
					yield self.refreshUserData();
					yield Promise.all([
						//fetch beg data
					]);
				}
			} finally {
				self.pending = false;
			}
		}),
		toBuffer(data) {
			self.buffer = data;
		},
	}))
	.create();
