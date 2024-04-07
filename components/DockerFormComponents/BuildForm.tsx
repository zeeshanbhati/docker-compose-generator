import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";

export const BuildForm = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register } = methods;

  return (
    <div>
      <Label> Context</Label>
      <Input
        placeholder="Context"
        {...register(`services[${serviceIndex}].build.context`)}
      />

      <Label>DockerFile path</Label>
      <Input
        placeholder="Dockerfile Path"
        {...register(`services[${serviceIndex}].build.dockerfilePath`)}
      />
      <Label>Arguments</Label>
    </div>
  );
};

const BuildArguments = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register, control } = methods;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `services[${serviceIndex}].build.args`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2">
          <Input
            placeholder="key"
            {...register(`services[${serviceIndex}].build.args[${index}].key`)}
          />
          <Input
            placeholder="value"
            {...register(
              `services[${serviceIndex}].build.args[${index}].value`
            )}
          />
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}

      <Button onClick={append}>Add</Button>
    </>
  );
};
