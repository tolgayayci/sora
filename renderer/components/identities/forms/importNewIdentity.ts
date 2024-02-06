import * as z from "zod";

export const importIdentityFormSchema = z.object({
  identity_name: z
    .string()
    .min(3, "Identity name must be at least 3 characters long.")
    .max(255, "Identity name must be at most 255 characters long.")
    .regex(
      /^[A-Za-z0-9.\-_@]+$/,
      "Only the characters ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-_@0123456789 are valid in identity names."
    ),
  pem_identity: z
    .string()
    .min(3, {
      message: "Identity name must be at least 3 characters long",
    })
    .max(255),
  storage_mode: z
    .string()
    .min(3, "Storage mode must be at least 3 characters long.")
    .max(255, "Storage mode must be at most 255 characters long.")
    .optional(),
  force: z.boolean().optional(),
});

export async function onimportIdentityFormSubmit(
  data: z.infer<typeof importIdentityFormSchema>
) {
  try {
    const command = "identity";
    const subcommand = "import";
    const args = [data.identity_name];
    const flags = [
      data.pem_identity ? `pem-identity=${data.pem_identity}` : null,
      data.storage_mode ? `storage-mode=${data.storage_mode}` : null,
      data.force === true ? "force" : null,
    ].filter(Boolean);

    await window.sorobanApi.runSorobanCommand(command, subcommand, args, flags);

    await window.sorobanApi.reloadApplication();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
