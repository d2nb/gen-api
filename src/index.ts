import path from 'path';
import { fileURLToPath } from 'url';
import rimraf from 'rimraf';
import { generateApi } from 'swagger-typescript-api';
import type { GenerateApiParams, GenerateApiParamsFromUrl } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd();

const defaultParams = {
  input: path.resolve(cwd, './openapi.json'),
  output: path.resolve(cwd, './src/api'),
  templates: path.resolve(__dirname, '../template'),
  extractRequestParams: true,
  extractRequestBody: true,
  extractResponseBody: true,
  modular: true,
};

export async function genApi(params?: GenerateApiParams) {
  const finalParams = {
    ...defaultParams,
    ...params,
  };

  if (finalParams.input.startsWith('http')) {
    (finalParams as GenerateApiParamsFromUrl).url = finalParams.input;
    finalParams.input = undefined;
  }

  await rimraf(finalParams.output as string);
  generateApi(finalParams);
}
