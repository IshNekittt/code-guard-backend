import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SORT_VALUES = [];

export const SORT_ORDER = {
  ASC: 'asc',
  DECS: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const ONE_DAY = 24 * 60 * 60 * 1000;

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'docs',
  'swagger.json',
);
