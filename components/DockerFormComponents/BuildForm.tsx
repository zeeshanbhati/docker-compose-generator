import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

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
  const { register } = methods;
  return (
    <div className="flex space-x-2">
      <Input placeholder="key"></Input>
      <Input placeholder="value"></Input>
    </div>
  );
};
