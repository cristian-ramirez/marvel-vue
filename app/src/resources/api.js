import axios from 'axios';

class api {
	constructor() {
		this.apiCall = axios.create({
			baseURL: 'https://marvel-server-api.herokuapp.com/api',
		});
	}

	get(path = 'characters', page = 1) {
		return this.apiCall.get(`${path}`, {
				params: {
					offset: page === 1 ? 0 : (page * 20),
				},
			});
	}

	getById(path, id) {
		return this.apiCall.get(`${path}/${id}`);
	}

	getByFilter(path, id, filter) {
		return this.apiCall.get(`${path}/${id}/${filter}`);
	}
}

export default api;
