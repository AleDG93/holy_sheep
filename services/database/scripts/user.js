// 01-create-user.js
db.createUser({
    user: "gameuser",
    pwd: "gamepassword",
    roles: [
        {
            role: "readWrite",
            db: "gamedb"
        }
    ]
});
