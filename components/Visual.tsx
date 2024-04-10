import React from "react";

const MyComponent = ({ yamlData }: { yamlData: any }) => {
  return <pre>{JSON.stringify(yamlData, null, 2)}</pre>;
};

export default MyComponent;
