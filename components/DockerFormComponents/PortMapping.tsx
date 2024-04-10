import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
export const PortMapping = ({ serviceIndex }: { serviceIndex: number }) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services[${serviceIndex}].port`,
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
          <Input
            placeholder="containerport"
            {...register(
              `services[${serviceIndex}].value.ports[${index}].container_port`
            )}
          />
          <Input
            placeholder="hostPort"
            {...register(
              `services[${serviceIndex}].value.ports[${index}].host_port`
            )}
          />
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
