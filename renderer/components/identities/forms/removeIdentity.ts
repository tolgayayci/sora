import * as z from "zod";

export const removeIdentityFormSchema = z.object({
  identity_name: z
    .string()
    .min(3, "Identity name must be at least 3 characters long.")
    .max(255, "Identity name must be at most 255 characters long.")
    .regex(
      /^[A-Za-z0-9.\-_@]+$/,
      "Only the characters ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-_@0123456789 are valid in identity names."
    ),
  drop_wallets: z.boolean().default(false),
});

export async function onRemoveIdentityFormSubmit(
  data: z.infer<typeof removeIdentityFormSchema>
) {
  try {
    const command = "config";
    const subcommand = "identity";
    const args = ["rm", data.identity_name];

    await window.sorobanApi.runSorobanCommand(command, subcommand, args);

    await window.sorobanApi.manageIdentities("delete", {
      name: data.identity_name,
    });

    await window.sorobanApi.reloadApplication();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
