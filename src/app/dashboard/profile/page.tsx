import Bank from "@/components/profile-tabs/bank";
import Business from "@/components/profile-tabs/business";
import Personal from "@/components/profile-tabs/personal";
import Users from "@/components/profile-tabs/users";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="relative">
      <h1 className="text-xl font-bold">Profile</h1>
      <Separator />
      <Tabs defaultValue="business" className="w-full mt-8">
        <TabsList className="flex justify-between bg-transparent">
          <TabsTrigger
            className="text-lg font-medium text-black data-[state=active]:after:content-[''] data-[state=active]:after:w-full data-[state=active]:after:h-1 data-[state=active]:after:bg-primary relative data-[state=active]:after:absolute data-[state=active]:after:bottom-1.5 data-[state=active]:after:rounded-full"
            value="business"
          >
            Business
          </TabsTrigger>
          <TabsTrigger
            className="text-lg font-medium text-black data-[state=active]:after:content-[''] data-[state=active]:after:w-full data-[state=active]:after:h-1 data-[state=active]:after:bg-primary relative data-[state=active]:after:absolute data-[state=active]:after:bottom-1.5 data-[state=active]:after:rounded-full"
            value="personal"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            className="text-lg font-medium text-black data-[state=active]:after:content-[''] data-[state=active]:after:w-full data-[state=active]:after:h-1 data-[state=active]:after:bg-primary relative data-[state=active]:after:absolute data-[state=active]:after:bottom-1.5 data-[state=active]:after:rounded-full"
            value="bank"
          >
            Bank
          </TabsTrigger>
          <TabsTrigger
            className="text-lg font-medium text-black data-[state=active]:after:content-[''] data-[state=active]:after:w-full data-[state=active]:after:h-1 data-[state=active]:after:bg-primary relative data-[state=active]:after:absolute data-[state=active]:after:bottom-1.5 data-[state=active]:after:rounded-full"
            value="users"
          >
            Users
          </TabsTrigger>
        </TabsList>
        <TabsContent value="business">
          <Business />
        </TabsContent>
        <TabsContent value="personal">
          <Personal />
        </TabsContent>
        <TabsContent value="bank">
          <Bank />
        </TabsContent>
        <TabsContent value="users">
          <Users />
        </TabsContent>
      </Tabs>
    </div>
  );
}
