import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {

  static async connect(options: ConnectionOptions) {
    await mongoose.connect(options.mongoUrl, {
      dbName: options.dbName
    }).then(() => console.log(`Connected to ${options.dbName}`));
  }

}