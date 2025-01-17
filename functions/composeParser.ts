import { IDockerForm, IServiceValue } from "@/types";

export const convertToDestObject = (sourceObj: IDockerForm) => {
  const destObj: any = {
    version: sourceObj.version,
    services: {},
  };

  console.log(sourceObj);

  sourceObj.services.forEach((service) => {
    const parsedService: any = {};
    const serviceKey = service.key;
    const serviceValue = service.value;

    const buildRequired = service.buildRequired;

    if (buildRequired && serviceValue.build) {
      parsedService["build"] = {
        ...serviceValue.build,
        args: serviceValue.build.args.reduce((acc, arg) => {
          acc[arg.key] = arg.value;
          return acc;
        }, {} as any),
      };
    } else {
      parsedService["image"] = serviceValue.image;
    }

    if (serviceValue.command) {
      parsedService["command"] = serviceValue.command;
    }

    if (serviceValue.healthcheck) {
      const doesValueExist = Object.entries(serviceValue.healthcheck).filter(
        ([key, value]) => value.length > 0
      );

      if (doesValueExist.length > 0)
        parsedService["healthcheck"] = serviceValue.healthcheck;
    }

    if (serviceValue.container_name) {
      parsedService["container_name"] = serviceValue.container_name;
    }

    if (serviceValue.volumes) {
      parsedService["volumes"] = serviceValue?.volumes.map(
        (volume) => `${volume.host_path}:${volume.container_path}`
      );
    }

    if (serviceValue.environment) {
      if (Object.keys(serviceValue.environment).length > 0) {
        parsedService["environment"] = serviceValue?.environment.reduce(
          (acc, env) => {
            acc[env.key] = env.value;
            return acc;
          },
          {} as any
        );
      }
    }

    if (serviceValue.ports) {
      parsedService["ports"] = serviceValue?.ports.map(
        (port) => `${port.container_port}:${port.host_port}`
      );
    }

    if (serviceValue.depends_on) {
      parsedService["depends_on"] = serviceValue?.depends_on.map(
        (dependency) => dependency.key
      );
    }

    destObj.services[serviceKey] = parsedService;
  });

  const res = removeEmptyValues(destObj);

  return res;
};

function removeEmptyValues(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.filter((value) => value !== "" && value !== null);
  }

  if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        const cleanedValue = removeEmptyValues(value);
        if (Object.keys(cleanedValue).length > 0) {
          newObj[key] = cleanedValue;
        }
      } else if (value !== "" && value !== null) {
        newObj[key] = value;
      }
    }
    return newObj;
  }

  return obj;
}
