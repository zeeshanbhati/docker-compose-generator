"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BuildForm } from "./BuildForm";
import { HealthCheckForm } from "./HealthCheck";
import {
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { PortMapping } from "./PortMapping";
import { VolumeMapping } from "./VolumeMapping";
import { Button } from "@/components/ui/button";

export const ServiceForm = ({ index }: { index: number }) => {
  const methods = useFormContext();
  const { register, getValues, setValue, control, watch } = methods;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `services[${index}]`,
  });
  const at = useWatch({ name: `services[${index}]` });

  //console.log(watch("services"));

  console.log(getValues(`services[0].value.buildRequired`));

  return (
    <div className="space-y-4">
      <div>
        <Label className="">Service Name</Label>
        <Input
          id="service-name"
          placeholder="Service Name"
          {...register(`services[${index}].key`)}
        />
      </div>

      <div>
        <Label>Container Name</Label>
        <Input
          placeholder="node-app-container"
          {...register(`services[${index}].value.container_name`)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register(`services[${index}].value.buildRequired`)}
        />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Add Build Steps
        </label>
      </div>

      {getValues(`services[${index}].value.buildRequired`) && (
        <BuildForm serviceIndex={index} />
      )}

      {!getValues(`services[${index}].value.buildRequired`) && (
        <div>
          <Label>Image Name</Label>
          <Input
            placeholder="mysql:latest"
            {...register(`services[${index}].value.image`)}
          />
        </div>
      )}
      <PortMapping serviceIndex={index} />

      <VolumeMapping serviceIndex={index} />

      <EnvironmentVariables serviceIndex={index} />

      <BuildDependencies serviceIndex={index} />

      <div>
        <Label>Command</Label>
        <Input
          placeholder="npm start"
          {...register(`services[${index}].value.command`)}
        />
      </div>

      <HealthCheckForm serviceIndex={index} />
    </div>
  );
};

export const BackupServiceForm = () => {
  const methods = useFormContext();
  const { register, getValues, setValue, control, watch } = methods;
  const { fields, remove, append } = useFieldArray({
    control,
    name: "services",
  });
  const at = useWatch({ name: "services" });

  //console.log(watch("services"));

  console.log(getValues(`services[0].value.buildRequired`));

  const appendService = () => {
    append({
      key: "",
      value: {
        container_name: "",
        buildRequired: false,
        build: {
          context: "",
          dockerfile: "",
          args: [],
          depends_on: [],
        },
        image: "",
        ports: [],
        environment: [],
        volumes: [],
        command: "",
        healthcheck: {
          test: "",
          interval: "",
          timeout: "",
          retries: "",
        },
      },
    });
  };

  const removeService = (index: number) => {
    remove(index);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4">
          <div>
            <Label className="">Service Name</Label>
            <Input
              id="service-name"
              placeholder="Service Name"
              {...register(`services[${index}].key`)}
            />
          </div>

          <div>
            <Label>Container Name</Label>
            <Input
              placeholder="node-app-container"
              {...register(`services[${index}].value.container_name`)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register(`services[${index}].value.buildRequired`)}
            />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add Build Steps
            </label>
          </div>

          {getValues(`services[${index}].value.buildRequired`) && (
            <BuildForm serviceIndex={index} />
          )}

          {!getValues(`services[${index}].value.buildRequired`) && (
            <div>
              <Label>Image Name</Label>
              <Input
                placeholder="mysql:latest"
                {...register(`services[${index}].value.image`)}
              />
            </div>
          )}
          <PortMapping serviceIndex={index} />

          <VolumeMapping serviceIndex={index} />

          <EnvironmentVariables serviceIndex={index} />

          <BuildDependencies serviceIndex={index} />

          <div>
            <Label>Command</Label>
            <Input
              placeholder="npm start"
              {...register(`services[${index}].value.command`)}
            />
          </div>

          <HealthCheckForm serviceIndex={index} />

          <Button onClick={() => removeService(index)} />
        </div>
      ))}
      <Button type="button" onClick={appendService}>
        {" "}
        Add
      </Button>
    </div>
  );
};

const BuildDependencies = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register } = methods;
  const { fields, append, remove } = useFieldArray({
    name: `services[${serviceIndex}].depends_on`,
  });
  return (
    <div className="space-y-2">
      <Label className="block">Depends On</Label>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="space-y-2">
            <Input
              placeholder="Build Dependencies"
              key={field.id}
              {...register(
                `services[${serviceIndex}].value.build.depends_on[${index}].key`
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
  const { register } = methods;
  const { fields, append, remove } = useFieldArray({
    name: `services[${serviceIndex}].value.environment`,
  });
  return (
    <div className="space-y-2">
      <Label className="block">Environment Variables</Label>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <Input
              placeholder="Key"
              {...register(
                `services[${serviceIndex}].value.environment[${index}].key`
              )}
            />
            <Input
              placeholder="value"
              {...register(
                `services[${serviceIndex}].value.environment[${index}].value`
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
