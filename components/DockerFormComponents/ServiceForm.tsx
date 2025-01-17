"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BuildForm } from "./BuildForm";
import { HealthCheckForm } from "./HealthCheck";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PortMapping } from "./PortMapping";
import { VolumeMapping } from "./VolumeMapping";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CircleX } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";

export const ServiceForm = ({ index }: { index: number }) => {
  const methods = useFormContext();
  const {
    register,
    setValue,
    formState: { errors },
  } = methods;
  const [buildRequired, setBuildRequired] = useState(false);

  const handleCheckChange = (e: any) => {
    setValue(`services[${index}].buildRequired`, e);
    setBuildRequired(e);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="">Service Name</Label>
        <Input
          id="service-name"
          placeholder="Service Name"
          {...register(`services[${index}].key`, { required: "Required" })}
        />
        <ErrorMessage
          errors={errors}
          name={`services[${index}].key`}
          render={({ message }) => <p className="text-red-500">{message}</p>}
        />
      </div>

      <div className="space-y-2">
        <Label>Container Name</Label>
        <Input
          placeholder="node-app-container"
          {...register(`services[${index}].value.container_name`, {
            required: "Required",
          })}
        />
        <ErrorMessage
          errors={errors}
          name={`services[${index}].value.container_name`}
          render={({ message }) => <p className="text-red-500">{message}</p>}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox onCheckedChange={handleCheckChange} />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Add Build Steps
        </label>
      </div>

      {buildRequired && <BuildForm serviceIndex={index} />}

      {!buildRequired && (
        <div>
          <Label>Image Name</Label>
          <Input
            placeholder="mysql:latest"
            {...register(`services[${index}].value.image`, {
              required: !buildRequired ? "Required" : false,
            })}
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

const BuildDependencies = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    name: `services[${serviceIndex}].value.depends_on`,
  });

  const addDependsOn = () => {
    append({ key: "" });
  };

  const removeDependsOn = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-2">
      <Label className="block">Depends On</Label>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex space-x-2">
            <div className="space-y-2">
              <Input
                placeholder="Build Dependencies"
                key={field.id}
                {...register(
                  `services[${serviceIndex}].value.depends_on[${index}].key`,
                  { required: "Required" }
                )}
              />

              <ErrorMessage
                errors={errors}
                name={`services[${serviceIndex}].value.depends_on[${index}].key`}
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>
            <Button
              size={"icon"}
              variant={"ghost"}
              type="button"
              onClick={() => removeDependsOn(index)}
            >
              <CircleX color={"#2580F7"} />
            </Button>
          </div>
        );
      })}
      <Button type="button" onClick={addDependsOn}>
        Add
      </Button>
    </div>
  );
};

const EnvironmentVariables = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const {
    register,
    control,
    formState: { errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services[${serviceIndex}].value.environment`,
  });

  const addEnv = () => {
    append({ key: "", value: "" });
  };

  const removeEnv = (index: number) => {
    remove(index);
  };
  return (
    <div className="space-y-2">
      <Label className="block">Environment Variables</Label>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex space-x-2">
            <div className="space-y-2">
              <Input
                placeholder="Key"
                {...register(
                  `services[${serviceIndex}].value.environment[${index}].key`,
                  { required: "Required" }
                )}
              />

              <ErrorMessage
                errors={errors}
                name={`services[${serviceIndex}].value.environment[${index}].key`}
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>

            <div className="space-y-2">
              <Input
                placeholder="value"
                {...register(
                  `services[${serviceIndex}].value.environment[${index}].value`,
                  { required: "Required" }
                )}
              />

              <ErrorMessage
                errors={errors}
                name={`services[${serviceIndex}].value.environment[${index}].value`}
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>

            <Button
              size={"icon"}
              variant={"ghost"}
              type="button"
              onClick={() => removeEnv(index)}
            >
              <CircleX color={"#2580F7"} />
            </Button>
          </div>
        );
      })}
      <Button type="button" onClick={addEnv}>
        Add Env
      </Button>
    </div>
  );
};
