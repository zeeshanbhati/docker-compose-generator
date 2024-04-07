import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldArray, useFormContext } from "react-hook-form";

export const VolumeMapping = ({ serviceIndex }: { serviceIndex: number }) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services[${serviceIndex}].volume`,
  });
  return (
    <>
      <Label>Volumes</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2">
          <Input
            placeholder="host mount path"
            {...register(
              `services[${serviceIndex}].volumes[${index}].hostPath`
            )}
          />
          <Input
            placeholder="ContainerPath"
            {...register(
              `services[${serviceIndex}].volumes[${index}].containerPath`
            )}
          />
        </div>
      ))}
      <button onClick={append}>Add Volumes</button>
    </>
  );
};
