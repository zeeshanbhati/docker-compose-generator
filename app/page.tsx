"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceForm } from "@/components/DockerFormComponents/ServiceForm";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { IDockerForm } from "@/types";
import { Button } from "@/components/ui/button";
import { convertToDestObject } from "@/functions/composeParser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleX } from "lucide-react";
import yaml from "yaml";
import jsyaml from "js-yaml";
import MyComponent from "@/components/Visual";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-dracula";

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
  const [yamlData, setYamlData] = useState<string>();

  const stringifyToYaml = (obj: any) => {
    try {
      const yamlString = jsyaml.dump(obj);
      setYamlData(yamlString);
    } catch (error) {
      console.error("Error stringifying to YAML:", error);
    }
  };

  const onSubmit = (data: IDockerForm) => {
    //console.log(data);
    //console.log("=========================");
    const res = convertToDestObject(data);
    stringifyToYaml(res);
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
    <main className="flex h-screen flex-row items-start justify-around">
      <div className="grid w-1/4 min-w-sm items-start gap-1.5">
        <ScrollArea className="h-screen pt-12 px-12 relative">
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

                <h1 className="py-2"> Service Form </h1>

                {fields.map((service: any, index: number) => (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    key={service.id}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="w-full px-2 flex items-center justify-between">
                          <Label className="text-lg">Service</Label>
                          <Button
                            size="icon"
                            variant={"ghost"}
                            onClick={() => removeService(index)}
                          >
                            <CircleX color={"#2580F7"} />
                          </Button>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div key={service.id} className="space-y-2 px-2">
                          <ServiceForm index={index} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}

                <Button type="button" onClick={appendService}>
                  Add
                </Button>
              </div>
              <Button type="submit" className="my-4">
                Submit
              </Button>
            </form>
          </FormProvider>
        </ScrollArea>
      </div>
      <div className="mt-20 pt-12 px-12 bg-grey-900 text-lg font-semibold w-1/2">
        <AceEditor
          mode="yaml"
          theme="dracula" // Choose your preferred theme
          value={yamlData}
          readOnly={true} // Make the editor read-only if needed
          style={{ width: "100%", height: "600px" }} // Adjust the size as needed
        />
      </div>
    </main>
  );
}
