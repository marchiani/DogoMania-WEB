import { createBrowserHistory } from 'history';

const history = createBrowserHistory({});
export default history;
/*
history.listen((location) => {
	appStore.location.updateSearch(location.search);
});*/
