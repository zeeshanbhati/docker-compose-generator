import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BuildForm } from "./BuildForm";


export const HealthCheckForm = () => {
    return (
      <>
        <Label>Test Command</Label>
        <Input></Input>
  
        <Label>Interval</Label>
        <Input placeholder="30s"></Input>
  
        <Label>Timeout</Label>
        <Input placeholder="10s"></Input>
  
        <Label>Timeout</Label>
        <Input placeholder="10s"></Input>
  
        <Label>Retires</Label>
        <Input placeholder="5"></Input>
      </>
    );
  };