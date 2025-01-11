import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isPending } = useUpdateUser();

  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm();

  function onSubmit({ fullName, avatar }) {
    updateUser({ fullName, avatar }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          defaultValue={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isPending}
          id="fullName"
          {...register("fullName", { required: "Full Name is required" })}
        />
      </FormRow>
      <FormRow label="Avatar image" error={errors?.avatar?.message}>
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isPending}
          {...register("avatar")}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={reset}>
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
