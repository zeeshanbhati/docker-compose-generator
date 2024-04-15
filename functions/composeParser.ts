import { IDockerForm, IServiceValue } from "@/types";

export const convertToDestObject = (sourceObj: IDockerForm) => {
  const destObj: any = {
    version: sourceObj.version,
    services: {},
  };

  sourceObj.services.forEach((service) => {
    const parsedService: any = {};
    const serviceKey = service.key;
    const serviceValue = service.value;
    // const serviceValueWithoutBuildImage: Omit<
    //   IServiceValue,
    //   "image" | "build"
    // > = service.value;
    const buildRequired = service.buildRequired;

    // const buildObject =
    //   buildRequired && serviceValue.build
    //     ? {
    //         build: {
    //           ...serviceValue.build,
    //           args: serviceValue.build.args.reduce((acc, arg) => {
    //             acc[arg.key] = arg.value;
    //             return acc;
    //           }, {} as any),
    //         },
    //       }
    //     : {};

    // const imageObject = !buildRequired ? { image: serviceValue.image } : {};

    console.log(buildRequired);
    console.log(serviceValue.build);
    console.log(serviceValue.image);

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
      parsedService["healthcheck"] = serviceValue.healthcheck;
    }

    if (serviceValue.container_name) {
      parsedService["container_name"] = serviceValue.container_name;
    }

    if (serviceValue.volumes) {
      parsedService["volumes"] = serviceValue?.volumes.map(
        (volume) => `${volume.container_path}:${volume.host_path}`
      );
    }

    if (serviceValue.environment) {
      parsedService["environment"] = serviceValue?.environment.reduce(
        (acc, env) => {
          acc[env.key] = env.value;
          return acc;
        },
        {} as any
      );
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

    // destObj.services[serviceKey] = {
    //   ...serviceValueWithoutBuildImage,
    //   ...buildObject,
    //   ...imageObject,
    //   environment: serviceValue?.environment.reduce((acc, env) => {
    //     acc[env.key] = env.value;
    //     return acc;
    //   }, {} as any),
    //   ports: serviceValue?.ports.map(
    //     (port) => `${port.container_port}:${port.host_port}`
    //   ),
    //   depends_on: serviceValue?.depends_on.map((dependency) => dependency.key),
    //   volumes: serviceValue?.volumes.map(
    //     (volume) => `${volume.container_path}:${volume.host_path}`
    //   ),
    // };
    destObj.services[serviceKey] = parsedService;
  });

  return destObj;
};
