import { set, connect } from "mongoose";

set("strictQuery", true);

async function connectToMongoDB(url) {
  return connect(url);
}

export default connectToMongoDB;
