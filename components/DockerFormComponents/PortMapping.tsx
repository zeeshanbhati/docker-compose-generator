import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";

export const PortMapping = ({ serviceIndex }: { serviceIndex: number }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services[${serviceIndex}].value.ports`,
  });

  const addPortMapping = () => {
    append({ container_port: "", host_port: "" });
  };

  const removePortMapping = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-2">
      <Label className="block">Port Mapping</Label>
      {fields.map((field, index) => (
        <div className="flex space-x-2" key={field.id}>
          <div className="space-y-2">
            <Input
              placeholder="containerport"
              {...register(
                `services[${serviceIndex}].value.ports[${index}].container_port`,
                { required: "Required" }
              )}
            />

            <ErrorMessage
              errors={errors}
              name={`services[${serviceIndex}].value.ports[${index}].container_port`}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>

          <div>
            <Input
              placeholder="hostPort"
              {...register(
                `services[${serviceIndex}].value.ports[${index}].host_port`,
                { required: "Required" }
              )}
            />
            <ErrorMessage
              errors={errors}
              name={`services[${serviceIndex}].value.ports[${index}].host_port`}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>

          <Button
            size={"icon"}
            type="button"
            variant={"ghost"}
            onClick={() => removePortMapping(index)}
          >
            <CircleX color={"#2580F7"} />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addPortMapping}>
        Add Port
      </Button>
    </div>
  );
};
