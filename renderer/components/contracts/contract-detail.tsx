import { useState, useEffect } from "react";
import Link from "next/link";
import useProjects from "hooks/useProjects";

import CliCommandSelector from "components/contracts/command-selector";
import { Button } from "components/ui/button";
import { Separator } from "components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";

import { ScrollArea, ScrollBar } from "components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ContractDetail({
  projectPath,
}: {
  projectPath: string;
}) {
  const [commandOutput, setCommandOutput] = useState();
  const [commandError, setCommandError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const project = useProjects(projectPath);

  if (project) {
    return (
      <>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between space-y-2 mb-4">
            <h2 className="font-bold">{projectPath}</h2>
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
          </div>
        </div>
      </>
    );
  } else {
    return <div>Contract not found or name is undefined.</div>;
  }
}
