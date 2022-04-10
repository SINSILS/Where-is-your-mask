import api from 'core/api';

export const getCollections = () => api.get('collections/').then((x) => x.data.collections);

export const getCollection = (id) => api.get(`collections/${id}`).then((x) => x.data);

export const createCollection = (collection) => api.post('collections/', collection).then((x) => x.data);

export const createMask = (collectionId, mask) =>
  api.post(`collections/${collectionId}/masks`, mask).then((x) => x.data);
