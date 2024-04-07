"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceForm } from "@/components/DockerFormComponents/ServiceForm";
import { FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const methods = useForm();

  const onSubmit = (data: unknown) => {
    console.log(JSON.stringify(data));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h1 className=" text-3xl"> Docker-Compose.yml</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} />
          <div className="mt-10 space-y-4">
            <div className="space-y-2">
              <Label className="">Version</Label>
              <Input id="version" placeholder="version" />
            </div>

            <h1 className=""> Service Form </h1>

            <ServiceForm />
          </div>
          <form />
        </FormProvider>
      </div>
    </main>
  );
}
