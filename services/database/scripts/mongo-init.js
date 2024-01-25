// Initialize the replica set
rs.initiate({
    _id: 'rs0',
    members: [
        { _id: 0, host: 'mongo-db-1:27017' }
        // Add more members here if you want to set up additional nodes
    ]
});

// Use admin then create user root
var adminDB = db.getSiblingDB('holy_sheep_db');
adminDB.createUser({
    user: 'admin',
    pwd: 'adminpassword',
    roles: [{ role: 'root', db: 'holy_sheep_db' }]
});

// Authenticate as the root user
adminDB.auth('admin', 'adminpassword');

var dbName = 'sample';
// Create a new user in the target database
adminDB.createUser({
    user: 'sample',
    pwd: 'sample',
    roles: [{ role: 'readWrite', db: dbName }]
});