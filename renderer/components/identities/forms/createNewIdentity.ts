import * as z from "zod";

export const newIdentityFormSchema = z.object({
  identity_name: z
    .string()
    .min(3, "Identity name must be at least 3 characters long.")
    .max(255, "Identity name must be at most 255 characters long.")
    .regex(
      /^[A-Za-z0-9.\-_@]+$/,
      "Only the characters ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-_@0123456789 are valid in identity names."
    ),
  seed: z.string().optional(),
  as_secret: z.boolean().optional(),
  global: z.boolean().optional(),
  hd_path: z.string().optional(),
  default_seed: z.boolean().optional(),
  // RPC Options
  config_dir: z.string().optional(),
  rpc_url: z.string().optional(),
  network_passphrase: z.string().optional(),
  network: z.string().optional(),
});

export async function onNewIdentityFormSubmit(
  data: z.infer<typeof newIdentityFormSchema>
) {
  try {
    const command = "keys";
    const subcommand = "generate";
    const args = [data.identity_name];
    const flags = [
      data.seed ? `--seed=${data.seed}` : "",
      data.as_secret ? "--as-secret" : "",
      data.global ? "--global" : "",
      data.hd_path ? `--hd-path=${data.hd_path}` : "",
      data.default_seed ? "--default-seed" : "",
      // Add RPC options if needed
      data.rpc_url ? `--rpc-url=${data.rpc_url}` : "",
      data.network_passphrase
        ? `--network-passphrase=${data.network_passphrase}`
        : "",
      data.network ? `--network=${data.network}` : "",
    ].filter(Boolean);

    await window.sorobanApi.runSorobanCommand(command, subcommand, args, flags);

    await window.sorobanApi.manageIdentities("add", {
      name: data.identity_name,
    });

    await window.sorobanApi.reloadApplication();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
