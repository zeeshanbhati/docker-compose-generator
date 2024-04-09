import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

export const VolumeMapping = ({ serviceIndex }: { serviceIndex: number }) => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `services[${serviceIndex}].volume`,
  });
  return (
    <div className="space-y-2">
      <Label className="block">Volumes</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2">
          <Input
            placeholder="host mount path"
            {...register(
              `services[${serviceIndex}].value.volumes[${index}].host_path`
            )}
          />
          <Input
            placeholder="ContainerPath"
            {...register(
              `services[${serviceIndex}].value.volumes[${index}].container_path`
            )}
          />
          <Button type="button" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={append}>
        Add Volumes
      </Button>
    </div>
  );
};
