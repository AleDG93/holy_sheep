export interface MongoConfig {

    username: string;
    password: string;
    dbName: string;
    addresses: Array<{ port: string, address: string }>;
}