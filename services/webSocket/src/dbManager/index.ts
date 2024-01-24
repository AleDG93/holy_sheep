import Connector from "./Connector";


export async function run() {
    const connector = new Connector('mongodb://localhost:27017', 'gamedb');

    // try {
    await connector.connect();

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
}
