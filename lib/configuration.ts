const config = {
  redis: {
    host: process.env.BUILD_MODE === 'build' ? process.env.BUILD_REDIS_HOST : process.env.RUNTIME_REDIS_HOST,
    port: process.env.BUILD_MODE === 'build' ? process.env.BUILD_REDIS_PORT : process.env.RUNTIME_REDIS_PORT,
  },
};

export default config;
