import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BuildForm } from "./BuildForm";
import { useFieldArray, useFormContext } from "react-hook-form";

export const HealthCheckForm = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register } = methods;
  return (
    <div>
      <div>
        <Label>Test Command</Label>
        <Input
          placeholder="curl ...."
          {...register(`services[${serviceIndex}].value.healthcheck.test`)}
        />
      </div>

      <div>
        <Label>Interval</Label>
        <Input
          placeholder="30s"
          {...register(`services[${serviceIndex}].value.healthcheck.interval`)}
        />
      </div>

      <div>
        <Label>Timeout</Label>
        <Input
          placeholder="10s"
          {...register(`services[${serviceIndex}].value.healthcheck.timeout`)}
        />
      </div>

      <div>
        <Label>Retires</Label>
        <Input
          placeholder="5"
          {...register(`services[${serviceIndex}].value.healthcheck.retires`)}
        />
      </div>
    </div>
  );
};
