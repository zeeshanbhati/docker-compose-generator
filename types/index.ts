export interface IDockerForm {
  version: string;
  services: IService[];
}

interface IService {
  key: string;
  buildRequired: boolean;
  value: IServiceValue;
}

export interface IServiceValue {
  container_name?: string;
  image?: string;
  command?: string;
  build?: IBuild | null;
  ports?: IPort[];
  volumes?: IVolume[];
  depends_on?: IDependsOn[];
  environment?: IKeyValue[];
  healthcheck?: IHealthCheck | null;
}

interface IBuild {
  context: string;
  dockerfile: string;
  args: IKeyValue[];
}

export interface IKeyValue {
  key: string;
  value: string;
}

interface IPort {
  container_port: string;
  host_port: string;
}

interface IVolume {
  host_path: string;
  container_path: string;
}

interface IDependsOn {
  key: string;
}

interface IHealthCheck {
  test: string;
  interval: string;
  retries: string;
  timeout: string;
}
