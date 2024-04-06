import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";

export const PortMapping = ({ serviceKey }: { serviceKey: number }) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services[${serviceKey}].port`,
  });
  return (
    <div>
      <Label>Port Mapping</Label>
      {fields.map((field, index) => (
        <div className="flex space-x-2" key={field.id}>
          <Input
            placeholder="hostport"
            {...register(`services[${serviceKey}].ports[${index}].host_port`)}
          />
          <Input
            placeholder="containerport"
            {...register(
              `services[${serviceKey}].ports[${index}].container_port`
            )}
          />
        </div>
      ))}
    </div>
  );
};
