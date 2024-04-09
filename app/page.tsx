"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceForm } from "@/components/DockerFormComponents/ServiceForm";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { IDockerForm } from "@/types";
import { Button } from "@/components/ui/button";
import { convertToDestObject } from "@/functions/composeParser";

const initialData: IDockerForm = {
  version: "1",
  services: [],
};

export default function Home() {
  const methods = useForm({ defaultValues: initialData });
  const { register, control } = methods;
  const { fields, remove, append } = useFieldArray({
    control,
    name: "services",
  });

  const onSubmit = (data: IDockerForm) => {
    //console.log(data);
    //console.log("=========================");
    const res = convertToDestObject(data);
    console.log(res);
  };

  const appendService = () => {
    append({
      key: "",
      buildRequired: false,
      value: {},
    });
  };

  const removeService = (index: number) => {
    remove(index);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h1 className=" text-3xl"> Docker-Compose.yml</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mt-10 space-y-4">
              <div className="space-y-2">
                <Label className="">Version</Label>
                <Input
                  id="version"
                  placeholder="version"
                  {...methods.register(`version`)}
                />
              </div>

              <h1 className=""> Service Form </h1>
              {fields.map((service: any, index: number) => (
                <div key={service.id} className="space-y-2">
                  <ServiceForm index={index} />
                  <Button onClick={() => removeService(index)}>
                    {" "}
                    Remove Service{" "}
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={appendService}>
                Add
              </Button>
            </div>
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
