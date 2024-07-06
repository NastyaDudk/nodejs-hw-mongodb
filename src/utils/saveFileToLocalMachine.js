import path from 'node:path';
import fs from 'node:fs/promises';
import { ENV_VARS, UPLOAD_DIR } from '../constants/constans.js';
import { env } from './env.js';

export const saveFileToLocalMachine = async (file) => {
  await fs.rename(path.join(UPLOAD_DIR, file.filename));

  return env(ENV_VARS.BACKEND_HOST) + `/uploads/${file.filename}`;
};
