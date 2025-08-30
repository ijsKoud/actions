import { setFailed, setOutput, getInput } from '@actions/core';
import { readFile } from 'node:fs/promises';
import { DEFAULT_CONFIG_LOCATION } from "./constants";
import { validateConfig } from "./config-validator";
import { parse } from 'yaml';

async function getConfig(path: string) {
  const file = await readFile(path, 'utf8');
  const unsafeConfig = parse(file);

  return validateConfig(unsafeConfig);
}

async function run() {
  try {
    const configPath = getInput('config-path') || DEFAULT_CONFIG_LOCATION;
    const config = await getConfig(configPath);

    console.info(`Loaded config: ${JSON.stringify(config, null, 2)}`);
    setOutput('tests', config.tests);
  } catch (error) {
    setFailed(`Action failed: ${error}`);
  }
}

run();
