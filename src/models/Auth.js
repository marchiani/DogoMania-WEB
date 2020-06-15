import {
	types, flow, applySnapshot, onSnapshot, addDisposer,
} from 'mobx-state-tree';
import Cookies from 'js-cookie';

import history from 'common/history';

import backend from 'common/backend';

import { signIn, signUp } from 'api/Auth';

import UserModel from './User';

export function getAuthFromCookies() {
	return JSON.parse(Cookies.get('auth') || '{}');
}

export default types
	.model('AuthModel', {
		accessToken: types.maybe(types.string),
		systemRole: types.maybe(types.integer),
		user: types.maybe(UserModel),
	})
	.volatile(() => ({
		pending: false,
		alreadyIdentified: false,
	}))
	.views((self) => ({
		get isAuthorized() {
			return !!self.accessToken;
		},
	}))
	.actions((self) => ({
		_setBackendHeaders() {
			backend._options.headers.Authorization = self.accessToken;
			backend._options.headers['X-Referer'] = self.domainName;
		},
		login: flow(function* (data) {
			self.pending = true;
			try {
				const result = yield signIn(data);
				applySnapshot(self, result);
			} finally {
				self.pending = false;
			}
		}),
		logout() {
			self.accessToken = '';
			history.push('/');
		},
		signUp: flow(function* (data) {
			self.pending = true;
			try {
				console.log(data);
				const result = yield signUp(data);
				applySnapshot(self, result);
			} finally {
				self.pending = false;
			}
		}),
		afterCreate() {
			self._setBackendHeaders();
			addDisposer(self, onSnapshot(self, (snapshot) => {
				Cookies.set('auth', snapshot);
				self._setBackendHeaders();
			}));
		},
	}));
