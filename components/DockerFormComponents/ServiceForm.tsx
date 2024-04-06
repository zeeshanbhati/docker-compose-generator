import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BuildForm } from "./BuildForm";
import { HealthCheckForm } from "./HealthCheck";
import { useForm } from "react-hook-form";


export const ServiceForm = () => {
    const  form  = useForm();
    return (
      <>
        <Label className="">Service Name</Label>
        <Input id="service-name" placeholder="Service Name" />
  
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Add Build Steps
          </label>
        </div>
  
        <BuildForm />
  
  
        <Label>Container Name</Label>
              <Input></Input>
  
              <Label>Image Name</Label>
              <Input></Input>
  
              <Label>Port Mapping</Label>
              <div className="flex space-x-2">
                <Input placeholder="hostport"></Input>
                <Input placeholder="containerport"></Input>
              </div>
  
              <Label>Volumes</Label>
              <div className="flex space-x-2">
                <Input placeholder="host mount path"></Input>
                <Input placeholder="docker file path"></Input>
              </div>
  
              <Label>Depends On</Label>
              <Input placeholder="containerName"></Input>
  
              <HealthCheckForm />
  
      </>
    );
  };
  