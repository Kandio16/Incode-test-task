import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();
export const SERVICE_NAME = env.get('SERVICE_NAME').default('backend').asString();
export const NODE_ENV = env.get('NODE_ENV').default('local').asString();
export const PORT = env.get('PORT').default('8080').asPortNumber();

