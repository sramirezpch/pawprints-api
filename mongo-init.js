use pawprints

db.createUser({
    user: "root",
    pwd: "example",
    roles: [
        {
            role: "readWrite",
            db: "pawprints"
        }
    ]
});