import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(cabinId) {
  // const { data: imageData } = await supabase
  //   .from("cabins")
  //   .select("image")
  //   .eq("id", cabinId);

  // let imageName;

  // if (imageData[0] !== "") {
  //   imageName = imageData[0].image.split("/").pop();
  // }

  // console.log(imageData);
  // path.substring(path.lastIndexOf("/") + 1);
  // const { error: imageDeleteError } = await supabase.storage
  //   .from("cabin-images")
  //   .remove([imageName]);

  // if (imageDeleteError) {
  //   console.error(imageDeleteError);
  //   throw new Error("Image could not be deleted");
  // }

  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, cabinId = undefined) {
  console.log(newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? ""
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!cabinId) {
    query = query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();
  } else {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", cabinId)
      .select();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (imageName === "") return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data.cabinId);
    throw new Error("Image could not be uploaded and the cabin is deleted");
  }

  return data;
}
