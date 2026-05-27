const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolvedModuleName = moduleName.startsWith('@/') ?
    path.join(__dirname, 'src', moduleName.slice(2)) :
    moduleName;

  return context.resolveRequest(context, resolvedModuleName, platform);
};

module.exports = config;
