import * as z from "zod";

export const renameIdentityFormSchema = z.object({
  from_identity_name: z
    .string()
    .min(3, "Identity name must be at least 3 characters long.")
    .max(255, "Identity name must be at most 255 characters long."),
  to_identity_name: z
    .string()
    .min(3, "Identity name must be at least 3 characters long.")
    .max(255, "Identity name must be at most 255 characters long.")
    .regex(
      /^[A-Za-z0-9.\-_@]+$/,
      "Only the characters ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-_@0123456789 are valid in identity names."
    ),
});

export async function onRenameIdentityFormSubmit(
  data: z.infer<typeof renameIdentityFormSchema>
) {
  try {
    const command = "identity";
    const subcommand = "rename";
    const args = [data.from_identity_name, data.to_identity_name];

    await window.sorobanApi.runSorobanCommand(command, subcommand, args);

    await window.sorobanApi.manageIdentities(
      "rename",
      { name: data.from_identity_name },
      data.to_identity_name
    );

    await window.sorobanApi.reloadApplication();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
