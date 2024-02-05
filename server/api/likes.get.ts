import mongoose from "mongoose";
import { LikesModel } from "~/utils/LikeSchema";

export default defineEventHandler(async (event) => {
  try {
    const { dbConnUri } = useRuntimeConfig(event);
    const query = getQuery(event);

    const conn = await mongoose.connect(dbConnUri);
    const existingEntry = await LikesModel.findOne({ work: query.work }).exec();
    await conn.disconnect();
    return new Response(
      JSON.stringify({
        code: "SUCCESS",
        likes: existingEntry ? existingEntry.likes : 0,
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        code: "ERROR",
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
});
