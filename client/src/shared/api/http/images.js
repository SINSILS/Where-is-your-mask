import api from 'core/api';

export const uploadImage = (file) => {
  const form = new FormData();

  form.append('file', file);

  return api.post('images/', form).then((x) => x.data);
};
