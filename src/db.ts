import mongoose from "mongoose";

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL!);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error :"));

export { db, mongoose };
