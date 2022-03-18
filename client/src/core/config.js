const env = {
  apiUrl: process.env.REACT_APP_API_URL,
  apiTimeout: Number(process.env.REACT_APP_API_TIMEOUT),
  maxImageSizeMb: Number(process.env.REACT_APP_MAX_IMAGE_SIZE_MB)
};

export default env;
