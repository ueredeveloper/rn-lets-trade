import { NativeModules } from 'react-native';
import { Constants } from 'expo';

const { manifest } = Constants;

const env = {};

// Add all variables from .env file to the env object
if (manifest) {
  const { env: envFromManifest } = manifest;
  Object.keys(envFromManifest).forEach(key => {
    env[key] = envFromManifest[key];
  });
}