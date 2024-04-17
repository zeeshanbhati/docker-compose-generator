import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";

export const VolumeMapping = ({ serviceIndex }: { serviceIndex: number }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `services[${serviceIndex}].value.volumes`,
  });
  return (
    <div className="space-y-2">
      <Label className="block">Volumes</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2">
          <div>
            <Input
              placeholder="host mount path"
              {...register(
                `services[${serviceIndex}].value.volumes[${index}].host_path`,
                { required: "Required" }
              )}
            />
            <ErrorMessage
              errors={errors}
              name={`services[${serviceIndex}].value.volumes[${index}].host_path`}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder="ContainerPath"
              {...register(
                `services[${serviceIndex}].value.volumes[${index}].container_path`,
                { required: "Required" }
              )}
            />

            <ErrorMessage
              errors={errors}
              name={`services[${serviceIndex}].value.volumes[${index}].host_path`}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>

          <Button
            size={"icon"}
            variant={"ghost"}
            type="button"
            onClick={() => remove(index)}
          >
            <CircleX color={"#2580F7"} />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={append}>
        Add Volume
      </Button>
    </div>
  );
};
