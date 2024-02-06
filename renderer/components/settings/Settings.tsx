import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Separator } from "components/ui/separator";

export default function SettingsComponent() {
  return (
    <Tabs defaultValue="env" className="w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        {/* <TabsList>
          <TabsTrigger value="env">Environment Variables</TabsTrigger>
          <TabsTrigger value="adapters" disabled>
            Adapters
          </TabsTrigger>
        </TabsList> */}
      </div>
      <Separator className="mt-4" />
      <TabsContent value="env">
        <h2>asdasdasd</h2>
      </TabsContent>
      {/* <TabsContent value="adapters">
        <Adapters />
      </TabsContent> */}
    </Tabs>
  );
}
