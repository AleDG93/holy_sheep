import { MongoClient, Db, Collection, InsertOneResult, WithId, Document } from 'mongodb';

export class Connector {

    private client!: MongoClient;
    private db!: Db;
    private url: string;
    private dbName: string;

    constructor(url: string, dbName: string) {
        this.url = url;
        this.dbName = dbName;
    }

    async connect(): Promise<void> {
        this.client = new MongoClient(this.url);
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        console.log("connected to mongo db")
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
        }
    }

    getCollection<Game extends Document>(collectionName: string): Collection<Game> {
        return this.db.collection<Game>(collectionName);
    }

    async insertDocument<Game extends Document>(collectionName: string, document: any): Promise<InsertOneResult<any>> {
        const collection = this.getCollection<Game>(collectionName);
        return collection.insertOne(document);
    }

    async findDocuments<Game extends Document>(collectionName: string, query: any = {}): Promise<WithId<Game>[]> {
        const collection = this.getCollection<Game>(collectionName);
        return collection.find(query).toArray();
    }

    async findOneDocument<Game extends Document>(collectionName: string, query: any = {}): Promise<WithId<Game> | null> {
        const collection = this.getCollection<Game>(collectionName);
        return collection.findOne(query);
    }

    async updateDocument<Game extends Document>(collectionName: string, query: any, update: any): Promise<void> {
        const collection = this.getCollection<Game>(collectionName);
        await collection.updateOne(query, { $set: update });
    }

    async deleteDocument<Game extends Document>(collectionName: string, query: any): Promise<void> {
        const collection = this.getCollection<Game>(collectionName);
        await collection.deleteOne(query);
    }
}

export default Connector;
