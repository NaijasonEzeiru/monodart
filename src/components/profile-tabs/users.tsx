import { Button } from "../ui/button";

export default function Users() {
  return (
    <div className="border border-border mt-10">
      <Button className="bg-[#03672D] rounded-full absolute right-0 -top-1 px-5">
        Add User
      </Button>
      <div className="py-8 px-16 flex justify-between items-center">
        <p>vowsnig***.com</p>
        <p>admin</p>
      </div>
    </div>
  );
}
