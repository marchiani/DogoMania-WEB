import {
	flow,
	types,
	applySnapshot,
	resolveIdentifier,
	getSnapshot,
} from 'mobx-state-tree';

import { getUser } from 'api/UserProfile';

export default types
	.model('UserModel', {
		id: types.maybe(types.string),
		createdAt: types.optional(types.string, ''),
		deletedAt: types.maybeNull(types.optional(types.string, '')),
		username: types.optional(types.string, ''),
		email: types.optional(types.string, ''),
		phone: types.maybeNull(types.optional(types.string, '')),
		firstName: types.optional(types.string, ''),
		lastName: types.optional(types.string, ''),
		isConfirmed: types.optional(types.boolean, false),
	})
	.views((self) => ({
		get fullName() {
			return self.firstName && `${self.firstName} ${self.lastName}`;
		},
	}))
	.actions((self) => ({
		fetch: flow(function* () {
			try {
				self.pending = true;
				const result = yield getUser(self.id);
				applySnapshot(self, result);
			} finally {
				self.pending = false;
			}
		}),
	}));
