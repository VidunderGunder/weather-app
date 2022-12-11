module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: "../../.env",
          allowlist: ["OPEN_WEATHER_MAP_API_KEY", "CLERK_FRONTEND_API"],
          safe: false,
          allowUndefined: true,
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
    presets: ["babel-preset-expo"],
  };
};
