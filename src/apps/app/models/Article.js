import {
	types,
	flow,
	applySnapshot,
	getSnapshot,
} from 'mobx-state-tree';

import { getArticles, postArticle } from 'api/Article';

export default types
	.model('ArticleModel', {
		id: types.maybeNull(types.string, ''),
		title: types.maybeNull(types.string, ''),
		articleText: types.maybeNull(types.string),
		shortDescription: types.maybeNull(types.string),
		description: types.maybeNull(types.string),
		categoryId: types.maybeNull(types.string, ''),
		tagId: types.maybeNull(types.string),
	})
	.volatile(() => ({
		pending: false,
	}))
	.actions((self) => ({
		patch(data) {
			Object.keys(data).forEach((key) => { self[key] = data[key]; });
		},
	}))
	.actions((self) => ({
		fetch: flow(function* () {
			self.pending = true;
			try {
				const result = yield getArticles();
				applySnapshot(self, result);
			} finally {
				self.pending = false;
			}
		}),
		save: flow(function* () {
			self.pending = true;
			try {
				const getSnapshots = getSnapshot(self);
				const result = yield postArticle(getSnapshots);
				applySnapshot(self, result);
			} finally {
				self.pending = false;
			}
		}),
	}));
