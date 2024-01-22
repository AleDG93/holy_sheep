"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_vue_1 = __importDefault(require("@vitejs/plugin-vue"));
const vite_2 = __importDefault(require("unplugin-auto-import/vite"));
const vite_3 = __importDefault(require("unplugin-vue-components/vite"));
const path_1 = __importDefault(require("path"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    root: `${path_1.default.resolve(__dirname, 'client')}`,
    plugins: [
        (0, plugin_vue_1.default)(),
        (0, vite_3.default)({
            dirs: ['src/components'],
            dts: true,
        }),
        (0, vite_2.default)({
            imports: ['vue', 'vue-router'],
            vueTemplate: true,
        }),
    ],
    // Additional Vite-specific configurations
    optimizeDeps: {
        include: ['vue', 'vue-router'],
    },
    build: {
        chunkSizeWarningLimit: 5000,
        commonjsOptions: {
            esmExternals: true,
        },
        sourcemap: process.env.SOURCE_MAP === 'true',
        outDir: './dist',
    },
    resolve: {
        preserveSymlinks: true,
        alias: [
            {
                find: '@',
                replacement: `${path_1.default.resolve(__dirname, 'client', 'src')}/`,
            }
        ]
    }
});
//# sourceMappingURL=vite.config.js.map