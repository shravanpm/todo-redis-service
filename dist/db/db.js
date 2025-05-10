"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } = process.env;
let mongoURI = MONGO_USERNAME && MONGO_PASSWORD
    ? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`
    : `mongodb://${MONGO_HOST}/${MONGO_DB}`;
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectMongo = connectMongo;
// mongodb+srv://myAtlasDBUser:shravan@myatlasclusteredu.tlxzq0s.mongodb.net/
// mongodb://myAtlasDBUser:shravan@myatlasclusteredu.tlxzq0s.mongodb.net/tasksDB
