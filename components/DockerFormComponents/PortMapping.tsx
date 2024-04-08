import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
export const PortMapping = ({ serviceIndex }: { serviceIndex: number }) => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `services[${serviceIndex}].port`,
  });
  return (
    <div className="space-y-2">
      <Label className="block">Port Mapping</Label>
      {fields.map((field, index) => (
        <div className="flex space-x-2" key={field.id}>
          <Input
            placeholder="containerport"
            {...register(
              `services[${serviceIndex}].value.ports[${index}].container_path`
            )}
          />
          <Input
            placeholder="hostPort"
            {...register(
              `services[${serviceIndex}].value.ports[${index}].host_port`
            )}
          />
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={append}>Add</Button>
    </div>
  );
};
