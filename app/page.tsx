import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h1 className=" text-3xl"> Docker-Compose.yml</h1>

        <div className="mt-10 space-y-4">
          <div>
            <Label className="">Version</Label>
            <Input id="version" placeholder="version" />
          </div>

          <h1 className=""> Service Form </h1>

          <div>
            <Label className="">Service Name</Label>
            <Input id="service-name" placeholder="Service Name" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

          <div>
            <Label className="">Service Name</Label>
            <Input id="service-name" placeholder="Service Name" />
          </div>
        </div>
      </div>
    </main>
  );
}
