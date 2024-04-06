import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BuildForm } from "./BuildForm";
import { HealthCheckForm } from "./HealthCheck";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";

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
          <Label className="">Service Name</Label>
          <Input
            id="service-name"
            placeholder="Service Name"
            {...register(`service[${index}].key`, { required: true })}
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add Build Steps
            </label>
          </div>
          <BuildForm />
          <Label>Container Name</Label>
          <Input
            placeholder="node-app-container"
            {...(register(`service[${index}].container_name`),
            { required: true })}
          />
          <Label>Image Name</Label>
          <Input
            placeholder="mysql:latest"
            {...(register(`service[${index}].image`), { required: true })}
          />
          <Label>Port Mapping</Label>
          <div className="flex space-x-2">
            <Input placeholder="hostport"></Input>
            <Input placeholder="containerport"></Input>
          </div>
          <Label>Volumes</Label>
          <div className="flex space-x-2">
            <Input placeholder="host mount path"></Input>
            <Input placeholder="docker file path"></Input>
          </div>
          <Label>Depends On</Label>
          <Input placeholder="containerName"></Input>
          <HealthCheckForm />
        </div>
      ))}
    </>
  );
};
