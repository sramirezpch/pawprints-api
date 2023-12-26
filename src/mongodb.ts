import mongoose from "mongoose";

const mongoUri = `mongodb://root:example@localhost:27017/pawprints?authSource=admin`
mongoose.connect(mongoUri).catch((err) => console.error(err))