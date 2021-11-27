import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import postcssPresetEnv from "postcss-preset-env";
import postcssCustomMedia from "postcss-custom-media";
import cssnano from "cssnano";
import postcssImport from "postcss-import";
import postcssSortMedia from "postcss-sort-media-queries";
import postcssReporter from "postcss-reporter";
import autoprefixer from "autoprefixer";

const publicDirectory = path.resolve("public");
const buildDirectory = path.resolve("build");
const srcDirectory = path.resolve("src");
const stylesAssetsDirectory = path.resolve("src/assets/css");

const mode = process.env.NODE_ENV || "development";
const isProd = mode === "production";
const devtool = isProd ? false : "source-map";

export default {
    mode,
    devtool,
    target: "web",
    entry: path.join(srcDirectory, "index.tsx"),
    output: {
        filename: "bundle.[chunkhash].js",
        path: buildDirectory,
    },
    resolve: {
        alias: {
            react: "preact/compat",
            "react-dom": "preact/compat",
            "~": srcDirectory,
        },
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        new HtmlWebpackPlugin({
            template: path.join(publicDirectory, "index.html"),
        }),
        ...(() => {
            if (isProd) {
                return [
                    new CleanWebpackPlugin({}),
                    new MiniCssExtractPlugin({
                        filename: "[name].[contenthash].css",
                    }),
                ];
            }

            return [];
        })(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.css$/i,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : "style-loader",
                    {
                        loader: "css-loader",
                        /* options: {
                            modules: {
                                localIdentName: "[name]__[hash:base64:5]",
                            },
                        }, */
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [
                                    postcssPresetEnv({ stage: 0 }),
                                    postcssImport,
                                    postcssReporter,
                                    autoprefixer,
                                    postcssCustomMedia({
                                        importFrom: [
                                            path.join(
                                                stylesAssetsDirectory,
                                                "variables",
                                                "media.css"
                                            ),
                                        ],
                                    }),
                                    postcssSortMedia,
                                    isProd ? cssnano : "",
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                exclude: /node_modules/,
                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                issuer: [/\.tsx$/],
                use: ["@svgr/webpack"],
            },
        ],
    },
    devServer: {
        contentBase: publicDirectory,
    },
};
