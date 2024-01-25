import { Game } from '@adalgobbo/commons/lib';
import { MongoClient, Db, Collection, InsertOneResult, WithId, Document } from 'mongodb';
import { Streamer } from './Streamer';
import { MongoConfig } from '../interfaces';
import _ from 'lodash';

export class Connector {

    private client!: MongoClient;
    private db!: Db;
    private url: string;
    private dbName: string;

    constructor(config: MongoConfig) {
        console.log(config.addresses)
        let a = _.map(config.addresses, (a) => `${a.address}:${a.port}`);
        console.log(a);
        let b = a.join(",")
        console.log(b)
        this.url = `mongodb://${config.username}:${config.password}@${b}/admin?replicaSet=rs0`;
        console.log(this.url)
        this.dbName = config.dbName;
    }

    async connect(): Promise<void> {
        this.client = new MongoClient(this.url);
        await this.client.connect();
        this.db = this.client.db(this.dbName);
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
        }
    }

    getStreamer(collectionName: string): Streamer {
        if (!this.client) {
            throw Error("MongoDB instance not found")
        }
        const collection = this.getCollection<Game>(collectionName);
        return new Streamer(collection);
        //        streamer.setupStreamActions(gameLogic);
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
