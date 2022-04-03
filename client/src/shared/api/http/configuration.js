import api from 'core/api';

export const getConfiguration = () => api.get('configuration/').then((x) => x.data);

export const addColorToConfiguration = (color) => api.post('configuration/colors', { color }).then((x) => x.data);

export const removeColorFromConfiguration = (color) =>
  api.delete('configuration/colors', { data: { color } }).then((x) => x.data);

export const addStickerToConfiguration = (imageId) =>
  api.post('configuration/stickers', { imageId }).then((x) => x.data);

export const removeStickerFromConfiguration = (imageId) =>
  api.delete('configuration/stickers', { data: { imageId } }).then((x) => x.data);
