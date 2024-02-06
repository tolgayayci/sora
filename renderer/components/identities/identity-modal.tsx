"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Checkbox } from "components/ui/checkbox";
import { ScrollArea, ScrollBar } from "components/ui/scroll-area";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Loader2 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  onNewIdentityFormSubmit,
  newIdentityFormSchema,
} from "components/identities/forms/createNewIdentity";

import {
  importIdentityFormSchema,
  onimportIdentityFormSubmit,
} from "components/identities/forms/importNewIdentity";

import { useToast } from "components/ui/use-toast";
import {
  identityCreateSuccess,
  identityCreateError,
  identityImportSuccess,
  identityImportError,
  identityInternetIdentityLoginSuccess,
  identityInternetIdentityLoginError,
} from "lib/notifications";

export default function IdentityModal({
  showCreateIdentityDialog,
  setShowCreateIdentityDialog,
}) {
  const [isSubmittingCreateIdentity, setIsSubmittingCreateIdentity] =
    useState(false);
  const [isSubmittingImportIdentity, setIsSubmittingImportIdentity] =
    useState(false);
  const [isSubmittingLoginWithII, setIsSubmittingLoginWithII] = useState(false);

  const { toast } = useToast();

  const handleCreateNewIdentity = async (data) => {
    try {
      await onNewIdentityFormSubmit(data).then((res) => {
        //@ts-ignore
        if (res) {
          toast(identityCreateSuccess(res));
          setShowCreateIdentityDialog(false);
        }
      });
    } catch (error) {
      // toast(identityCreateError(error));
      console.log(error);
    } finally {
      setShowCreateIdentityDialog(false);
    }
  };

  const handleImportIdentity = async (data) => {
    try {
      await onimportIdentityFormSubmit(data).then((res) => {
        //@ts-ignore
        if (res) {
          toast(identityImportSuccess(res));
          setShowCreateIdentityDialog(false);
        }
      });
    } catch (error) {
      // toast(identityImportError(error));
      console.log(error);
    } finally {
      setShowCreateIdentityDialog(false);
    }
  };

  const newIdentityForm = useForm<z.infer<typeof newIdentityFormSchema>>({
    resolver: zodResolver(newIdentityFormSchema),
  });

  const importIdentityForm = useForm<z.infer<typeof importIdentityFormSchema>>({
    resolver: zodResolver(importIdentityFormSchema),
  });

  async function getDirectoryPath() {
    try {
      const result = await window.sorobanApi.openDirectory();
      return result;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  return (
    <Dialog
      open={showCreateIdentityDialog}
      onOpenChange={() => setShowCreateIdentityDialog(false)}
    >
      <DialogContent>
        <Tabs defaultValue="generate">
          <TabsList className="mb-4">
            <TabsTrigger value="generate">New Identity</TabsTrigger>
            <TabsTrigger value="add">Import Existing</TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <Form {...newIdentityForm}>
              <form
                onSubmit={newIdentityForm.handleSubmit(handleCreateNewIdentity)}
              >
                <DialogHeader className="space-y-3">
                  <DialogTitle>Create New Identity</DialogTitle>
                  <DialogDescription>
                    Identities you will add are global. They are not confined to
                    a specific project context.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[540px] overflow-y-auto pr-1">
                  <div>
                    <div className="py-4 pb-6">
                      <div className="space-y-3">
                        <FormField
                          control={newIdentityForm.control}
                          name="identity_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-small">
                                Identity Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="identity_name"
                                  placeholder="alice"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="options">
                          <AccordionTrigger>Options</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="seed"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-small">
                                        Seed
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          id="seed"
                                          placeholder="0000000000000000"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="hd_path"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-small">
                                        Hd Path
                                      </FormLabel>
                                      <FormControl>
                                        <div className="flex w-full items-center space-x-2">
                                          <Input
                                            type="text"
                                            readOnly
                                            value={field.value}
                                          />
                                          <Button
                                            type="button"
                                            onClick={() => {
                                              getDirectoryPath().then(
                                                (path) => {
                                                  if (path) {
                                                    field.onChange(path);
                                                  }
                                                }
                                              );
                                            }}
                                          >
                                            Select
                                          </Button>
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="as_secret"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>As Secret</FormLabel>
                                        <FormDescription>
                                          Output the generated identity as a
                                          secret key
                                        </FormDescription>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="global"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>Global</FormLabel>
                                        <FormDescription>
                                          Use global config
                                        </FormDescription>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="default_seed"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>Default Seed</FormLabel>
                                        <FormDescription>
                                          Generate the default seed phrase.
                                          Useful for testing. Equivalent to
                                          --seed 0000000000000000
                                        </FormDescription>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="testing-options">
                          <AccordionTrigger>Testing Options</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="config_dir"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-small">
                                        Config Directory
                                      </FormLabel>
                                      <FormControl>
                                        <div className="flex w-full items-center space-x-2">
                                          <Input
                                            type="text"
                                            readOnly
                                            value={field.value}
                                          />
                                          <Button
                                            type="button"
                                            onClick={() => {
                                              getDirectoryPath().then(
                                                (path) => {
                                                  if (path) {
                                                    field.onChange(path);
                                                  }
                                                }
                                              );
                                            }}
                                          >
                                            Select
                                          </Button>
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="rpc-options">
                          <AccordionTrigger>Options (RPC)</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="rpc_url"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-small">
                                        RPC URL
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          id="rpc_url"
                                          placeholder="http://localhost:1234"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="rpc_url"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-small">
                                        Network Passphrase
                                      </FormLabel>
                                      <FormControl>
                                        <Input {...field} id="rpc_url" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="space-y-3">
                                <FormField
                                  control={newIdentityForm.control}
                                  name="rpc_url"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-small">
                                        Network
                                      </FormLabel>
                                      <FormControl>
                                        <Input {...field} id="rpc_url" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                  <ScrollBar />
                </ScrollArea>
                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setShowCreateIdentityDialog(false)}
                  >
                    Cancel
                  </Button>
                  {isSubmittingCreateIdentity ? (
                    <Button disabled>
                      {" "}
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </Button>
                  ) : (
                    <Button type="submit">Create</Button>
                  )}
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="add">
            <Form {...importIdentityForm}>
              <form
                onSubmit={importIdentityForm.handleSubmit(handleImportIdentity)}
              >
                <DialogHeader className="space-y-3">
                  <DialogTitle>Import Identity</DialogTitle>
                  <DialogDescription>
                    Create a user identity by importing the user’s key
                    information or security certificate from a PEM file.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[335px] overflow-y-auto">
                  <div>
                    <div className="space-y-4 py-4 pb-6">
                      <div className="space-y-3">
                        <FormField
                          control={newIdentityForm.control}
                          name="identity_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-small">
                                Identity Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="identity_name"
                                  placeholder="alice"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-3">
                        <FormField
                          control={importIdentityForm.control}
                          name="pem_identity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-small">
                                Pem File
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="pem_identity"
                                  type="file"
                                  placeholder="alice"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Options</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <FormField
                                  control={importIdentityForm.control}
                                  name="storage_mode"
                                  render={({ field }) => (
                                    <FormItem className="space-y-3">
                                      <FormLabel>
                                        Storage Mode (Optional)
                                      </FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select a storage mode" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="password-protected">
                                            Password Protected
                                          </SelectItem>
                                          <SelectItem value="plain-text">
                                            Plain Text
                                          </SelectItem>
                                          <SelectItem value="null">
                                            No Storage Mode
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormDescription>
                                        Plaintext PEM files are still available
                                        (e.g. for use in non-interactive
                                        situations like CI), but not recommended
                                        for use since they put the keys at risk.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="space-y-3">
                                <FormField
                                  control={importIdentityForm.control}
                                  name="force"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>Force</FormLabel>
                                        <FormDescription>
                                          If the identity already exists, remove
                                          and re-import it.
                                        </FormDescription>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setShowCreateIdentityDialog(false)}
                  >
                    Cancel
                  </Button>
                  {isSubmittingImportIdentity ? (
                    <Button disabled>
                      {" "}
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </Button>
                  ) : (
                    <Button type="submit">Import</Button>
                  )}
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
