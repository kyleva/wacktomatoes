const LOCAL_URL = 'http://localhost:3030';
const STAGING_URL = 'https://wacktomatoes-backend-staging.herokuapp.com';
const PRODUCTION_URL = 'http://production.url.com';

const ENVIRONMENT_CONFIGS = new Map();
const ENVIRONMENTS = {
  LOCAL: 'local',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

const LOCAL_CONFIG = {
  endpoints: {
    POMODORO_CREATE: `${LOCAL_URL}/pomodoro/create`,
    POMODORO_GET_ALL_BY_USER: `${LOCAL_URL}/pomodoro/getAllForUser`,
    USER_CREATE: `${LOCAL_URL}/user/create`,
    USER_LOGIN: `${LOCAL_URL}/user/login`,
    USER_RESET_PASSWORD: `${LOCAL_URL}/user/reset-password`,
    USER_VERIFY: `${LOCAL_URL}/user/verify`,
  },
  env: 'local',
};

const STAGING_CONFIG = {
  endpoints: {
    POMODORO_CREATE: `${STAGING_URL}/pomodoro/create`,
    POMODORO_GET_ALL_BY_USER: `${STAGING_URL}/pomodoro/getAllForUser`,
    USER_CREATE: `${STAGING_URL}/user/create`,
    USER_LOGIN: `${STAGING_URL}/user/login`,
    USER_RESET_PASSWORD: `${STAGING_URL}/user/reset-password`,
    USER_VERIFY: `${STAGING_URL}/user/verify`,
  },
  env: 'staging',
};

const PRODUCTION_CONFIG = {
  endpoints: {
    POMODORO_CREATE: `${PRODUCTION_URL}/pomodoro/create`,
    POMODORO_GET_ALL_BY_USER: `${PRODUCTION_URL}/pomodoro/getAllForUser`,
    USER_CREATE: `${PRODUCTION_URL}/user/create`,
    USER_LOGIN: `${PRODUCTION_URL}/user/login`,
    USER_RESET_PASSWORD: `${PRODUCTION_URL}/user/reset-password`,
    USER_VERIFY: `${PRODUCTION_URL}/user/verify`,
  },
  env: 'production',
};

ENVIRONMENT_CONFIGS.set(ENVIRONMENTS.LOCAL, LOCAL_CONFIG);
ENVIRONMENT_CONFIGS.set(ENVIRONMENTS.STAGING, STAGING_CONFIG);
ENVIRONMENT_CONFIGS.set(ENVIRONMENTS.PRODUCTION, PRODUCTION_CONFIG);

module.exports = {
  ENVIRONMENT_CONFIGS,
  ENVIRONMENTS,
};
