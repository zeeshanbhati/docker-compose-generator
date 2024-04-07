import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";

export const PortMapping = ({ serviceIndex }: { serviceIndex: number }) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services[${serviceIndex}].port`,
  });
  return (
    <>
      <Label>Port Mapping</Label>
      {fields.map((field, index) => (
        <div className="flex space-x-2" key={field.id}>
          <Input
            placeholder="hostport"
            {...register(`services[${serviceIndex}].ports[${index}].host_port`)}
          />
          <Input
            placeholder="containerport"
            {...register(
              `services[${serviceIndex}].ports[${index}].container_port`
            )}
          />
        </div>
      ))}
      <button onClick={append}>Add Port Mapping</button>
    </>
  );
};
