import api from 'core/api';

export const getCollections = () => api.get('collections/').then((x) => x.data.collections);

export const createCollection = (collection) => api.post('collections/', collection).then((x) => x.data);
