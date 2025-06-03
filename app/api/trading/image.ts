import { useMutation } from "@tanstack/react-query";
import supabase from "../client";

const BUCKET_NAME = "trade-images";

export const useUploadTradeImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      if (!file || !(file instanceof File)) {
        throw new Error("Invalid file");
      }

      const filePath = `trades/${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false, // true will overwrite if file exists
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

      return {
        publicUrl,
        filePath,
      };
    },
  });
};

export const useDeleteTradeImage = () => {
  return useMutation({
    mutationFn: async (filePath: string) => {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);
      if (error) throw error;
      return true;
    },
  });
};
