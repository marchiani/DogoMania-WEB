import { API_URL } from './index';

import toast from '../components/Toast/toast.jsx';

export default { // @TODO: refactor to axios
	_urlRoot: API_URL,
	_options: {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	},
	_middleware(response) { // @TODO: if response not json if response empty
		if (response.status === 400 && response.headers.get('X-Get-Registration-Details')) {
			window.location.href = response.headers.get('X-Get-Registration-Details');
		}
		if (!response.headers.get('Content-Type')) {
			return null;
		}
		if (~response.headers.get('Content-Type').indexOf('application/json')) {
			return response.json();
		}
		if (~response.headers.get('Content-Type').indexOf('application/vnd')) {
			return response.blob();
		}
		return response.json();
	},
	async _fetch(url, options) {
		try {
			const response = await fetch(url, options);
			const result = await this._middleware(response);
			if (!response.ok) {
				return Promise.reject(result);
			}
			return result;
		} catch (err) {
			console.log('REQUEST ERROR', err);
		}
	},
	async request(endpoint, query = {}, options = {}) {
		this.onRequest();

		const url = new URL(this._urlRoot + endpoint);

		Object.keys(query).forEach((key) => {
			this.isArray(query[key])
				? (
					query[key].forEach((item) => url.searchParams.append(key, item))
				) : (
					url.searchParams.append(key, query[key])
				);
		});

		options.headers = {
			...this._options.headers,
			...options.headers,
		};

		if (options.headers['Content-Type'] === 'multipart/form-data') { // @TODO: hack
			delete options.headers['Content-Type'];
		}

		return this._fetch(url, options)
			.then(this.onResolve, this.onReject);
	},
	get(endpoint, query = {}, options = {}) {
		return this.request(endpoint, query, options);
	},
	post(endpoint, data, query, options = {}) {
		options.method = 'POST';
		options.body = JSON.stringify(data);
		return this.request(endpoint, query, options);
	},
	put(endpoint, data, query = {}, options = {}) {
		options.method = 'PUT';
		options.body = JSON.stringify(data);
		return this.request(endpoint, query, options);
	},
	patch(endpoint, data, query = {}, options = {}) {
		options.method = 'PATCH';
		options.body = JSON.stringify(data);
		return this.request(endpoint, query, options);
	},
	delete(endpoint, query = {}, options = {}) {
		options.method = 'DELETE';
		return this.request(endpoint, query, options);
	},
	upload(endpoint, data, options = {}) {
		const formData = new FormData();
		Object.keys(data).map((key) => {
			formData.append(key, data[key]);
		});
		options.method = 'PUT';
		options.body = formData;
		options.headers = options.headers || {}; // @TODO: Bad code
		options.headers.Accept = '';
		options.headers['Content-Type'] = 'multipart/form-data';
		return this.request(endpoint, {}, options);
	},
	async download(endpoint, filename, query = {}, options = {}) {
		const result = await this.request(endpoint, query, options);
		const link = document.createElement('a');
		link.href = URL.createObjectURL(result);
		link.setAttribute('download', filename);
		link.style.display = 'none';
		document.body.appendChild(link);
		link.click();
		link.remove();
	},
	onRequest() {},
	onResolve(result) {
		console.warn('response resolve', result); //    @TODO: Remove after debug
		return result;
	},
	onReject(result) {
		console.warn('response reject', result); // @TODO: Remove after debug
		toast({
			title: 'Error',
			message: Object.values(result).join('\n'),
			_type: 'danger',
		});
		return Promise.reject(result);
	},
	isArray(value) {
		return value && typeof value === 'object' && value.constructor === Array;
	},
};
