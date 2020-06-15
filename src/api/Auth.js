import backend from 'common/backend';

const BASE = '/Auth';

export const signIn = async (data) => await backend.post(`${BASE}/signin`, {...data});

export const signUp = async (data) => await backend.post(`${BASE}/signup`, {...data});