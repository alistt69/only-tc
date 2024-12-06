import webpack from "webpack";
import { BuildOptions } from "./types/types";
import { buildDevServer } from "./buildDevServer";
import { buildResolvers } from "./buildResolvers";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";


export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options;
    const isDev = mode === 'development';
    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}