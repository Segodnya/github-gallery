import { resolve as _resolve } from "path";

export const entry = "./src/index.ts";
export const output = {
  path: _resolve(__dirname, "dist"),
  filename: "bundle.js",
};
export const resolve = {
  extensions: [".ts", ".tsx"],
  alias: {
    components: _resolve(__dirname, "src/components"),
  },
};
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    },
  ],
};
