import mongoose from "mongoose";
import { LikesModel } from "~/utils/LikeSchema";

export default defineEventHandler(async (event) => {
  try {
    const { dbConnUri } = useRuntimeConfig(event);
    const { work, like } = await readBody(event);

    const conn = await mongoose.connect(dbConnUri);
    const existingEntry = await LikesModel.findOne({ work }).exec();
    if (existingEntry) {
      await LikesModel.updateOne(
        { work },
        { $inc: { likes: like ? 1 : -1 } }
      ).exec();
    } else {
      await new LikesModel({ work, likes: like ? 1 : 0 }).save();
    }
    await conn.disconnect();
    return new Response(
      JSON.stringify({
        code: "SUCCESS",
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
