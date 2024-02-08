import * as z from "zod";

export const createNewProjectFormSchema = z.object({
  project_name: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters long" })
    .max(40, { message: "Project name must be at most 40 characters long" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Project name must only contain letters and digits",
    }),
  path: z
    .string()
    .min(3, {
      message: "You must select a path",
    })
    .max(255),
  include_examples: z.boolean(),
  with_example: z
    .enum([
      "account",
      "alloc",
      "atomic-multiswap",
      "atomic-swap",
      "auth",
      "cross-contract",
      "custom-types",
      "deep-contract-auth",
      "deployer",
      "errors",
      "events",
      "fuzzing",
      "increment",
      "liquidity-pool",
      "logging",
      "simple-account",
      "single-offer",
      "timelock",
      "token",
      "upgradeable-contract",
    ])
    .optional(),
});

export async function onCreateNewProjectForm(
  data: z.infer<typeof createNewProjectFormSchema>
) {
  try {
    const command = "contract";
    const subcommand = "init";
    const args = [data.path];
    const flags = [
      data.include_examples ? `-w ${data.with_example}` : null,
    ].filter(Boolean);

    const result = await window.sorobanApi
      .runSorobanCommand(command, subcommand, args, flags, data.path)
      .then(async () => {
        await window.sorobanApi.manageProjects("add", {
          name: data.project_name,
          path: data.path + "/" + data.project_name,
        });
      });

    return result;
  } catch (error) {
    throw error;
  }
}
