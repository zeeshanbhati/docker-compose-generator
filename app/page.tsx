"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceForm } from "@/components/DockerFormComponents/ServiceForm";


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
          <div className="space-y-2">
            <ServiceForm/>
          </div>
        </div>
      </div>
    </main>
  );
}

