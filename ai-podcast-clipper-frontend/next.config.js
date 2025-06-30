/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import path from "path";
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    webpack: (config) => {
        config.resolve.alias['~'] = path.resolve(__dirname, 'src');
        return config;
    },
};


export default config;
