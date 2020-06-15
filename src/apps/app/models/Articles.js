import { flow, types, applySnapshot } from 'mobx-state-tree';

import Article from './Article';

import { getArticles } from 'api/Article';

export default types.model('ArticlesModel', {
	articles: types.array(Article),
})
	.volatile(() => ({
		pending: false,
	}))
	.actions((self) => ({
		fetch: flow(function* () {
			self.pending = true;
			const result = yield getArticles();
			applySnapshot(self.articles, result);
			self.pending = false;
		}),
	}));
