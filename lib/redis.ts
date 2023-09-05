import Redis, { RedisOptions } from 'ioredis';
import configuration from '@/lib/configuration';
import { buildRedisKey, getRandomInt } from '@/shared/lib';

function getRedisConfiguration(): {
  port?: string;
  host?: string;
} {
  return configuration.redis;
}

export function createRedisInstance(config = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host: config.host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    if (config.port) {
      options.port = +config.port;
    }

    const redis = new Redis(options);

    redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error connecting', error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}

const redis = createRedisInstance();

async function getCachedDataFromRedisDb<T extends any>(cacheKey: string) {
  const cached = await redis.get(cacheKey);

  // if cached, we're good!
  if (cached) {
    return JSON.parse(cached) as T;
  }
  return null;
}

async function setRedisCacheByKey<T extends {}>(cacheKey: string, data: T) {
  const MAX_AGE = 1000 * getRandomInt(50, 60) * 60; // 1 hour
  const EXPIRY_MS = `PX`; // milliseconds

  // cache data
  await redis.set(cacheKey, JSON.stringify(data), EXPIRY_MS, MAX_AGE);
}

function Cacheable<T extends (...args: any[]) => any>(fn: T): T {
  return async function (...args: Parameters<T>) {
    const cacheKey = buildRedisKey(args).concat(fn.name);

    // Check Redis for cached data
    const cachedData = await getCachedDataFromRedisDb(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    // If no cached data, execute the original function
    const result = await fn(...args);

    // Cache the result in Redis
    await setRedisCacheByKey(cacheKey, result);

    return result;
  } as any as T;
}

export { getCachedDataFromRedisDb, setRedisCacheByKey, Cacheable };

export default redis;
