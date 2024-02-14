import { useState } from "react";
import Link from "next/link";
import { useProject } from "hooks/useProject";

import CliCommandSelector from "components/contracts/command-selector";
import CommandStatusConfig from "components/contracts/command-status-config";
import { Button } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { Avatar, AvatarImage } from "components/ui/avatar";

export default function ContractDetail({
  projectPath,
}: {
  projectPath: string;
}) {
  const [commandOutput, setCommandOutput] = useState();
  const [commandError, setCommandError] = useState();

  const project = useProject(projectPath);

  if (project) {
    return (
      <>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between space-y-2 mb-4">
            <div className="flex items-center">
              <Avatar className="mr-4 h-10 w-10">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${project.name}.png`}
                  alt={project.name}
                />
              </Avatar>
              <h2 className="font-bold">{project.name}</h2>
            </div>
            <div className="space-x-2">
              <Link href={`/contracts`}>
                <Button>View All Contracts</Button>
              </Link>
            </div>
          </div>
          <Separator className="w-full mb-4 -mx-4" />
          <div className="flex flex-row w-full">
            <div className="w-3/5 pr-4">
              <CliCommandSelector
                path={projectPath}
                setCommandError={setCommandError}
                setCommandOutput={setCommandOutput}
              />
            </div>
            <div className="w-2/5 pr-4">
              <CommandStatusConfig
                canister={project}
                projectPath={projectPath}
                commandOutput={commandOutput}
                commandError={commandError}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Contract not found or name is undefined.</div>;
  }
}
