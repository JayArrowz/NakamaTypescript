import resolve, { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';
import multiInput from 'rollup-plugin-multi-input';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const extensions = ['.mjs', '.js', '.ts', '.json'];

export default {
    input: "./src/index.ts",
    external: ['nakama-runtime'],
    plugins: [
        // Allows node_modules resolution
        
        nodeResolve({ extensions, browser: true }),
        nodePolyfills(),
        resolve({ extensions }),
        // Compile TypeScript
        typescript({
            noImplicitReturns: true,
            moduleResolution: "node",
            experimentalDecorators: true,
            esModuleInterop: true,
            noUnusedLocals: false,
            noUnusedParameters: false,
            removeComments: true,
            target: "es5",
            module: "ESNext",
            strict: false,
            downlevelIteration: true
        }),

        json(),

        // Resolve CommonJS modules
        commonJS({ extensions }),
        
    ],
    output: {
        dir: 'build',
    },
};
