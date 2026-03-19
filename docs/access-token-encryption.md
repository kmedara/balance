AES-256-GCM (authenticated encryption)

Per-token random IV

Auth tag validation

Envelope-style key management (env-provided master key)

Base64 storage safe for MongoDB

//generate master-key
//store in env
//encrypt
//store in mongo
//decrypt during transaction sync
