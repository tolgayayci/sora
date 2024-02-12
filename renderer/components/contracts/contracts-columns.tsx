"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "components/ui/button";
import Link from "next/link";

export type Network = {
  [key: string]: any;
};

export const createColumns = (): ColumnDef<Network>[] => {
  return [
    {
      accessorKey: "name",
      header: "Network Name",
    },
    {
      accessorKey: "details",
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <Link
            href={`/canisters/${encodeURIComponent(
              row.original.projectPath
            )}/${encodeURIComponent(row.original.name)}`}
          >
            <Button>Canister Actions</Button>
          </Link>
        </div>
      ),
    },
  ];
};
