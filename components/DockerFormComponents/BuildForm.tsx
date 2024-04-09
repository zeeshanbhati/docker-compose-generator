import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";

export const BuildForm = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register } = methods;

  return (
    <div className="space-y-4">
      <div>
        <Label> Context</Label>
        <Input
          placeholder="Context"
          {...register(`services[${serviceIndex}].value.build.context`)}
        />
      </div>

      <div>
        <Label>DockerFile path</Label>
        <Input
          placeholder="Dockerfile Path"
          {...register(`services[${serviceIndex}].value.build.dockerfile`)}
        />
      </div>

      <div className="space-y-2">
        <Label className="block">Arguments</Label>
        <BuildArguments serviceIndex={serviceIndex} />
      </div>
    </div>
  );
};

const BuildArguments = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register } = methods;
  const { fields, remove, append } = useFieldArray({
    name: `services[${serviceIndex}].value.build.args`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2">
          <Input
            placeholder="key"
            {...register(
              `services[${serviceIndex}].value.build.args[${index}].key`
            )}
          />
          <Input
            placeholder="value"
            {...register(
              `services[${serviceIndex}].value.build.args[${index}].value`
            )}
          />
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}

      <Button type="button" onClick={append}>
        Add
      </Button>
    </>
  );
};
