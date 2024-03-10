module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ["@react-native-google-signin/google-signin"],
      "react-native-reanimated/plugin",
    ],
    // android: {
    //   googleServicesFile: "./google-services.json",
    // },
  };
};
