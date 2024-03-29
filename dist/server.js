"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./routers/api");
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 3000;
app.use((0, cors_1.default)()); // TODO: remove this in production
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use("/api", api_1.router);
app.get("/", (req, res) => {
    res.send("Shadowverse API");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=server.js.map