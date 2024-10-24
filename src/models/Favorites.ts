import { Schema, model, models } from "mongoose";

import { FavoritesDocument } from "@/types/types.old";

const FavoritesSchema = new Schema<FavoritesDocument>({
  userId: {
    type: String,
    required: true,
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

export const Favorites =
  models.Favorites || model("Favorites", FavoritesSchema);
