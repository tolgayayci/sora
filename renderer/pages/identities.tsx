"use client";

import { useState, useEffect } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";

import { Avatar, AvatarImage } from "components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  onRemoveIdentityFormSubmit,
  removeIdentityFormSchema,
} from "components/identities/forms/removeIdentity";

import {
  onRenameIdentityFormSubmit,
  renameIdentityFormSchema,
} from "components/identities/forms/renameIdentity";

import { useToast } from "components/ui/use-toast";
import { protectedIdentityRemoveError } from "lib/notifications";

import { LucidePersonStanding } from "lucide-react";
import IdentityModal from "components/identities/identity-modal";
import { ScrollArea, ScrollBar } from "components/ui/scroll-area";
import NoIdentities from "components/identities/no-identities";

const IdentityCard = ({
  identity,
  activeIdentityName,
}: {
  identity: {
    name: string;
    isInternetIdentity: boolean;
    internetIdentityPrincipal: string;
  };
  activeIdentityName: string;
}) => {
  const [showRenameIdentityDialog, setShowRenameIdentityDialog] =
    useState(false);
  const [showRemoveIdentityDialog, setShowRemoveIdentityDialog] =
    useState(false);
  const [isSubmittingRenameProject, setIsSubmittingRenameProject] =
    useState(false);
  const [isSubmittingRemoveProject, setIsSubmittingRemoveProject] =
    useState(false);

  const { toast } = useToast();

  const isProtectedIdentity = ["anonymous", "default"].includes(identity.name);
  const isActiveIdentity = identity.name === activeIdentityName;

  const removeIdentityForm = useForm<z.infer<typeof removeIdentityFormSchema>>({
    resolver: zodResolver(removeIdentityFormSchema),
    defaultValues: {
      identity_name: identity.name,
    },
  });

  const renameIdentityForm = useForm<z.infer<typeof renameIdentityFormSchema>>({
    resolver: zodResolver(renameIdentityFormSchema),
    defaultValues: {
      from_identity_name: identity.name,
    },
  });

  const handleRemoveClick = () => {
    if (isProtectedIdentity || isActiveIdentity) {
      toast(protectedIdentityRemoveError(identity.name));
      return;
    }
    setShowRemoveIdentityDialog(true);
  };

  // If the identity name is '*', do not render the card
  if (identity.name === "*") {
    return null;
  }

  return (
    <Card className="col-span-1" key={identity.name}>
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="mr-4 h-10 w-10">
            <AvatarImage
              src={`https://avatar.vercel.sh/${identity.name}.png`}
              alt={identity.name}
            />
          </Avatar>
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-medium">{identity.name}</CardTitle>
            <CardDescription>
              {identity.isInternetIdentity
                ? "Internet Identity"
                : "Local Identity"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowRenameIdentityDialog(true)}
            disabled={isProtectedIdentity}
          >
            Fund
          </Button>
          <Dialog
            open={showRenameIdentityDialog}
            onOpenChange={() => setShowRenameIdentityDialog(false)}
          >
            <DialogContent>
              <Form {...renameIdentityForm}>
                <form
                  onSubmit={renameIdentityForm.handleSubmit(
                    onRenameIdentityFormSubmit
                  )}
                >
                  <DialogHeader className="space-y-3">
                    <DialogTitle>Rename "{identity.name}"</DialogTitle>
                    <DialogDescription>
                      Identities are global. They are not confined to a specific
                      project context.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <div className="py-4 pb-6">
                      <div className="space-y-3">
                        <FormField
                          control={renameIdentityForm.control}
                          name="from_identity_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-small">
                                Current Identity Name
                              </FormLabel>
                              {identity ? (
                                <FormControl>
                                  <Input
                                    {...field}
                                    id="from_identity_name"
                                    defaultValue={identity.name}
                                    disabled
                                  />
                                </FormControl>
                              ) : null}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-3">
                        <FormField
                          control={renameIdentityForm.control}
                          name="to_identity_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-small">
                                New Identity Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="to_identity_name"
                                  placeholder="alice"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setShowRenameIdentityDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Rename</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Button
            className="w-full"
            onClick={handleRemoveClick}
            disabled={isActiveIdentity || isProtectedIdentity}
          >
            Remove
          </Button>
          <Dialog
            open={showRemoveIdentityDialog}
            onOpenChange={() => setShowRemoveIdentityDialog(false)}
          >
            <DialogContent>
              <Form {...removeIdentityForm}>
                <form
                  onSubmit={removeIdentityForm.handleSubmit(
                    onRemoveIdentityFormSubmit
                  )}
                >
                  <DialogHeader className="space-y-3">
                    <DialogTitle>Remove "{identity.name}"</DialogTitle>
                    <DialogDescription>
                      Identities are global. If you remove an identity, it will
                      be removed from soroban also!
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <div className="py-4 pb-6">
                      <div className="space-y-3">
                        <FormField
                          control={removeIdentityForm.control}
                          name="identity_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-small">
                                Identity Name
                              </FormLabel>
                              {identity ? (
                                <FormControl>
                                  <Input
                                    {...field}
                                    id="identity_name"
                                    defaultValue={identity.name}
                                    disabled
                                  />
                                </FormControl>
                              ) : null}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setShowRemoveIdentityDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="destructive">
                      Remove
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default function IdentitiesComponent() {
  const [showCreateIdentityDialog, setShowCreateIdentityDialog] =
    useState(false);
  const [identities, setIdentities] = useState<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIdentityName, setActiveIdentityName] = useState("");

  async function checkIdentities() {
    try {
      const identities = await window.sorobanApi.manageIdentities("list", "");

      setIdentities(identities);
    } catch (error) {
      console.log("Error invoking remote method:", error);
    }
  }

  async function checkCurrentIdentity() {
    try {
      const result = await window.sorobanApi.runSorobanCommand(
        "config",
        "identity",
        ["show"]
      );
      return result;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  // Call checkIdentities when the component mounts
  useEffect(() => {
    const fetchActiveIdentity = async () => {
      const activeIdentity = await checkCurrentIdentity();
      if (activeIdentity) {
        setActiveIdentityName(activeIdentity);
      }
    };

    fetchActiveIdentity();
    checkIdentities();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-106px)]">
      <div className="flex items-center justify-between">
        <Alert className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <LucidePersonStanding className="h-5 w-5 mr-4" />
            <div>
              <AlertTitle>
                You have {identities?.length ? identities?.length : "0"}{" "}
                identities
              </AlertTitle>
              <AlertDescription>
                You can add, remove, or edit your identities on this page.
              </AlertDescription>
            </div>
          </div>
          <Button onClick={() => setShowCreateIdentityDialog(true)}>
            Create New Identity
          </Button>
        </Alert>
        <IdentityModal
          showCreateIdentityDialog={showCreateIdentityDialog}
          setShowCreateIdentityDialog={setShowCreateIdentityDialog}
        />
      </div>

      {identities ? (
        <div className="flex-grow">
          <div className="my-6">
            <Input
              type="search"
              placeholder={`Search for an identity between ${identities.length} identities`}
              onChange={handleSearchChange}
              value={searchQuery}
            />
          </div>
          <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
            <div className="grid grid-cols-3 gap-8">
              {identities
                .filter((identity) =>
                  identity.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((identity) => (
                  <IdentityCard
                    key={
                      identity.name
                        ? identity.name
                        : identity.internetIdentityPrincipal
                    }
                    identity={identity}
                    activeIdentityName={activeIdentityName}
                  />
                ))}
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>
      ) : (
        <NoIdentities />
      )}
    </div>
  );
}
