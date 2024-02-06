import * as z from "zod";

export const createNewProjectFormSchema = z.object({
  project_name: z
    .string()
    .min(3, {
      message: "Project name must be at least 3 characters long",
    })
    .max(255),
  path: z
    .string()
    .min(3, {
      message: "You must select a path",
    })
    .max(255),
  frontend_status: z.boolean().optional(),
  dry_run: z.boolean().optional(),
});

export async function onCreateNewProjectForm(
  data: z.infer<typeof createNewProjectFormSchema>
) {
  try {
    const command = "new";
    const subcommand = null;
    const args = [data.project_name];
    const flags = [
      data.dry_run ? `--dry-run` : null,
      data.frontend_status ? `--frontend` : null,
    ].filter(Boolean); // This will remove any null values from the array

    console.log(command, subcommand, args, flags);

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
    console.error(`Error: ${error}`); // log error
  }
}
