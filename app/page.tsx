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
import jsyaml from "js-yaml";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-github";
import Header from "@/components/DockerFormComponents/Header";

const initialData: IDockerForm = {
  version: "1",
  services: [],
};

export default function Home() {
  const { theme } = useTheme();
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
    <main className="h-screen overflow-hidden">
      <Header />
      <div className="flex flex-row">
        <div className="grid w-2/6 min-w-sm items-start gap-1.5 dark:bg-gray-900 b-stone-200 rounded-r-md">
          <ScrollArea className="h-screen pt-8 px-12 relative">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="mt-2 space-y-4">
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
                  <div className="pt-4">
                    <Button className="" type="button" onClick={appendService}>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="pb-32">
                  <Button type="submit" className="mt-8">
                    Submit
                  </Button>
                </div>
              </form>
            </FormProvider>
          </ScrollArea>
        </div>
        <div className="bg-grey-900 text-lg font-semibold flex-1">
          <AceEditor
            mode="yaml"
            theme={theme === "dark" ? "dracula" : "github"} // Choose your preferred theme
            value={yamlData}
            readOnly={true} // Make the editor read-only if needed
            style={{ width: "100%", height: "100%", fontSize: "16px" }} // Adjust the size as needed
          />
        </div>
      </div>
    </main>
  );
}
