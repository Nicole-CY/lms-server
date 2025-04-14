const { createClient } = require('redis');

const { redisConfig } = require('../../appConfig');
let client;
const redisClient = async () => {
    if (client) return;

    client = await createClient({
        url: `redis://${redisConfig.host}:${redisConfig.port}`,
    })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
};

/**
 * Add cache
 * @param {*} key
 * @param {*} value
 * @param {*} ttl  second
 */
const setKey = async (key, value, ttl = null) => {
    if (!client) await redisClient();

    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    await client.set(key, value);
    //
    if (ttl != null) {
        await client.expire(key, ttl);
    }
};

/**
 * Retrieve cache based on key
 * @param {*} key
 * @returns
 */
const getKey = async key => {
    if (!client) await redisClient();

    const value = await client.get(key);
    return value;
};

/**
 * Delete cache based on key
 * @param {*} key
 */
const delKey = async key => {
    if (!client) await redisClient();

    await client.del(key);
};

//
module.exports = {
    setKey,
    getKey,
    delKey,
};
