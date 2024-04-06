import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const BuildForm = () => {
    return (
      <div>
        <Label> Context</Label>
        <Input></Input>
  
        <Label>DockerFile path</Label>
        <Input></Input>
  
        <Label>Arguments</Label>
  
        <div className="flex space-x-2">
          <Input placeholder="key"></Input>
          <Input placeholder="value"></Input>
        </div>
      </div>
    );
  };