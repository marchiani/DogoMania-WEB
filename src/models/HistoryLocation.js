import { types } from 'mobx-state-tree';
import { parse, stringify } from 'query-string';

import history from 'common/history';

export default types.model('LocationModel', {
	search: types.string,
})
	.views((self) => ({
		get query() {
			return parse(self.search);
		},
		set query(value) {
			history.push({
				search: stringify(value),
			});
		},
		stringify(value) {
			return stringify(value);
		},
	}))
	.actions((self) => ({
		updateSearch(search) {
			self.search = search;
		},
		applyQuery(query = null) {
			self.query = query;
		},
		patchQuery(query) {
			self.query = { ...self.query, ...query };
		},
		removeQuery(prop) {
			const query = { ...self.query };
			delete query[prop];
			self.query = query;
		},
	}));
