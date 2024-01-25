"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
const mongodb_1 = require("mongodb");
class Connector {
    constructor(url, dbName) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dbName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.url = url;
        this.dbName = dbName;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = new mongodb_1.MongoClient(this.url);
            yield this.client.connect();
            this.db = this.client.db(this.dbName);
            console.log("connected to mongo db");
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield this.client.close();
            }
        });
    }
    getCollection(collectionName) {
        return this.db.collection(collectionName);
    }
    insertDocument(collectionName, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(collectionName);
            return collection.insertOne(document);
        });
    }
    findDocuments(collectionName, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(collectionName);
            return collection.find(query).toArray();
        });
    }
    findOneDocument(collectionName, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(collectionName);
            return collection.findOne(query);
        });
    }
    updateDocument(collectionName, query, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(collectionName);
            yield collection.updateOne(query, { $set: update });
        });
    }
    deleteDocument(collectionName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(collectionName);
            yield collection.deleteOne(query);
        });
    }
}
exports.Connector = Connector;
exports.default = Connector;
//# sourceMappingURL=Connector.js.map