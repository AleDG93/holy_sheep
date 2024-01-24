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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const Connector_1 = __importDefault(require("./Connector"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const connector = new Connector_1.default('mongodb://localhost:27017', 'gamedb');
        // try {
        yield connector.connect();
        // Example: Insert a document
        //     const insertResult = await connector.insertDocument('yourCollectionName', { title: "value" });
        //     console.log('Inserted document:', insertResult.insertedId);
        //     // Example: Find documents
        //     const documents = await connector.findDocuments('yourCollectionName');
        //     console.log('Found documents:', documents);
        //     // Example: Update a document
        //     await connector.updateDocument('yourCollectionName', { key: 'value' }, { updatedKey: 'updatedValue' });
        //     // Example: Find one document after update
        //     const updatedDocument = await connector.findOneDocument('yourCollectionName', { updatedKey: 'updatedValue' });
        //     console.log('Updated document:', updatedDocument);
        //     // Example: Delete a document
        //     await connector.deleteDocument('yourCollectionName', { updatedKey: 'updatedValue' });
        //     // Example: Find documents after deletion
        //     const remainingDocuments = await connector.findDocuments('yourCollectionName');
        //     console.log('Remaining documents:', remainingDocuments);
        // } finally {
        //     await connector.disconnect();
        // }
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map