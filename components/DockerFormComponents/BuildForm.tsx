import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CircleX } from "lucide-react";
import {ErrorMessage} from "@hookform/error-message";

export const BuildForm = ({ serviceIndex }: { serviceIndex: number }) => {
  const methods = useFormContext();
  const { register ,getValues , formState : {errors}} = methods;
  const buildRequired = getValues(`services[${serviceIndex}].buildRequired`)

  return (
    <div className="space-y-4">
      <div>
        <Label> Context</Label>
        <Input
          placeholder="Context"
          {...register(`services[${serviceIndex}].value.build.context` , {required : buildRequired ? "Required" : false})}
        />
          <ErrorMessage  
          errors={errors}
          name={`services[${serviceIndex}].value.build.context`} 
          render={({ message }) => <p className="text-red-500">{message}</p>}
         /> 
      </div>

      <div>
        <Label>DockerFile path</Label>
        <Input
          placeholder="Dockerfile Path"
          {...register(`services[${serviceIndex}].value.build.dockerfile`,{required : buildRequired ? "Required" : false})}
        />
        <ErrorMessage  
          errors={errors}
          name={`services[${serviceIndex}].value.build.dockerfile`} 
          render={({ message }) => <p className="text-red-500">{message}</p>}
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
  const { register , formState : {errors} } = methods;
  const { fields, remove, append } = useFieldArray({
    name: `services[${serviceIndex}].value.build.args`,
  });

  const appendBuildArg = ()=>{
    append({key : "", value :""})
  }

  const removeBuildArg = (index : number)=>{
    remove(index);
  }

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2">
          <div className="space-y-2">
          <Input
            placeholder="key"
            {...register(
              `services[${serviceIndex}].value.build.args[${index}].key`,{required : "Required"}
            )}
          />
          <ErrorMessage  
          errors={errors}
          name={`services[${serviceIndex}].value.build.args[${index}].key`} 
          render={({ message }) => <p className="text-red-500">{message}</p>}/>
          </div>
          
          <div>
          <Input
            placeholder="value"
            {...register(
              `services[${serviceIndex}].value.build.args[${index}].value`,{required : "Required"}
            )}
          />
          <ErrorMessage  
          errors={errors}
          name={`services[${serviceIndex}].value.build.args[${index}].value`} 
          render={({ message }) => <p className="text-red-500">{message}</p>}/>
          </div>
         
          <Button
            size={"icon"}
            variant={"ghost"}
            type="button"
            onClick={() => removeBuildArg(index)}
          >
            <CircleX color={"#2580F7"} />
          </Button>
        </div>
      ))}

      <Button type="button" onClick={appendBuildArg}>
        Add Arg
      </Button>
    </>
  );
};
