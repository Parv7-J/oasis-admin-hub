import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Error", error);

  return data;
  //returns {user,session}
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("Error", error);

  return data.user;

  //returns {user}
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Error", error);
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error("Error", error);
  console.log(data);
  return data;
}

export async function updateUser({ fullName, password, avatar }) {
  let updateQuery = supabase.auth;

  if (fullName) updateQuery = updateQuery.updateUser({ data: { fullName } });
  if (password) updateQuery = updateQuery.updateUser({ password });

  const { data, error } = await updateQuery;
  if (error) throw new Error("Error", error);

  if (!avatar || !avatar.length) return data;

  const avatarName = `${Math.random()}-${avatar[0].name}`;
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar[0]);
  if (avatarError) throw new Error("Error", error);

  const { data: updateAvatar, error: updateAvatarError } =
    await supabase.auth.updateUser({ data: { avatar: avatarPath } });
  if (updateAvatarError) throw new Error("Error", error);

  return updateAvatar;
}
