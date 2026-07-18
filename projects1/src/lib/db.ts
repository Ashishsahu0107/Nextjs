import { connect } from "mongoose";

const mongodbUrl = process.env.MONGODB_URI;

if (!mongodbUrl) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = connect(mongodbUrl).then((c) => c.connection)
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        throw error;
    }

    return cached.conn;
}

export default connectDB;