"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BuildForm } from "./BuildForm";
import { HealthCheckForm } from "./HealthCheck";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { PortMapping } from "./PortMapping";
import { VolumeMapping } from "./VolumeMapping";
import { Button } from "@/components/ui/button";

export const ServiceForm = () => {
  const methods = useFormContext();
  const { register, control } = methods;
  const { fields, remove, append } = useFieldArray({
    control,
    name: "services",
  });
  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div>
            <Label className="">Service Name</Label>
            <Input
              id="service-name"
              placeholder="Service Name"
              {...register(`service[${index}].key`, { required: true })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add Build Steps
            </label>
          </div>

          <div>
            <Label>Container Name</Label>
            <Input
              placeholder="node-app-container"
              {...(register(`service[${index}].container_name`),
              { required: true })}
            />
          </div>

          <div>
            <Label>Image Name</Label>
            <Input
              placeholder="mysql:latest"
              {...(register(`service[${index}].image`), { required: true })}
            />
          </div>

          <BuildForm serviceIndex={index} />

          <PortMapping serviceIndex={index} />

          <VolumeMapping serviceIndex={index} />

          <div>
            <Label>Depends On</Label>
            <Input
              placeholder="containerName"
              {...register(`service[${index}]`)}
            ></Input>
          </div>

          <HealthCheckForm />
        </div>
      ))}
      <button onClick={append}>Add</button>
    </>
  );
};

const BuildDependencies = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services[${serviceIndex}].depends_on`,
  });
  return (
    <div>
      <Label>Build Dependencies</Label>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <Input
              placeholder="Build Dependencies"
              key={field.id}
              {...register(
                `services[${serviceIndex}].build.depends_on[${index}].key`,
                { required: true }
              )}
            />
            <Button onClick={() => remove(index)} />
          </div>
        );
      })}
      <Button onClick={append}>Add</Button>
    </div>
  );
};

const EnvironmentVariables = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services[${serviceIndex}].environment`,
  });
  return (
    <div>
      <Label>Environment Variables</Label>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <Input
              placeholder="Key"
              key={field.id}
              {...register(
                `services[${serviceIndex}].build.depends_on[${index}].environment[${index}].key`,
                { required: true }
              )}
            />
            <Input
              placeholder="value"
              key={field.id}
              {...register(
                `services[${serviceIndex}].build.depends_on[${index}].environment[${index}].value`,
                { required: true }
              )}
            />
            <Button onClick={() => remove(index)} />
          </div>
        );
      })}
      <Button onClick={append}>Add</Button>
    </div>
  );
};
