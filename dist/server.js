"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const useInit_1 = require("./composables/useInit");
const cache_1 = require("./cache");
const api_1 = require("./routers/api");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 3000;
exports.app.use((0, cors_1.default)()); // TODO: remove this in production
exports.app.use(express_1.default.json());
exports.app.use("/api", api_1.router);
exports.app.get("/", (req, res) => {
    res.send("Shadowverse API");
});
exports.app.listen(port, () => {
    console.log(`[server]: Initializing...`);
    (0, useInit_1.useInit)()
        .then(() => {
        console.log(`[server]: Initialization complete`);
        console.log(`[server]: Cache stats: ${JSON.stringify(cache_1.myCache.getStats())}`);
    })
        .catch((error) => {
        console.log(error);
    });
});
