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
          allowlist: ["OPENWEATHER_API_KEY", "CLERK_FRONTEND_API"],
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
  };
};
