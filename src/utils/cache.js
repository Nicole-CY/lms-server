const redis = require('./redis');

const PREFIX = 'mooc:';

async function cache(key, ttlSeconds, fetchFn) {
    const fullKey = PREFIX + key;
    const cached = await redis.get(fullKey);
    if (cached) {
        return JSON.parse(cached);
    }

    const data = await fetchFn();
    if (data) {
        await redis.set(fullKey, JSON.stringify(data), 'EX', ttlSeconds);
    }

    return data;
}

async function delCache(pattern, isPattern = false) {
    if (isPattern) {
        return redis.delPattern(PREFIX + pattern);
    } else {
        return redis.del(PREFIX + pattern);
    }
}

module.exports = {
    cache,
    delCache,
};
