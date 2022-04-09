import config from 'core/config';

export const localImageSrc = (imageId) => `${config.apiUrl}/images/${imageId}`;
