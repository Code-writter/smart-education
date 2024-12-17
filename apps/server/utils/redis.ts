import {Redis} from 'ioredis';
import {config} from 'dotenv';

config();

const redisClient = () => {
    if(process.env.REDIS_URI){
        console.log(`Redis Connected`)
        return process.env.REDIS_URI;
    }

    throw new Error('Redis URI not found');
}

export const redis = new Redis(redisClient());