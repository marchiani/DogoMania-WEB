import backend from 'common/backend';

const BASE = '/UserProfile';

export const getUser = (userId) => backend.get(`${BASE}/${userId}`);
