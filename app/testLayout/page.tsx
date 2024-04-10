// import React from "react";

// const VerticalSplit = () => {
//   return (
//     <div className="flex h-screen">
//       <div className="w-1/2 overflow-y-auto p-6">
//         <h2 className="text-2xl font-bold mb-4">Scrollable Content</h2>
//         {[...Array(10)].map((x) => (
//           <p className="mb-4" key={x}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
//             magna a bibendum dictum, magna nibh tincidunt massa, non tincidunt
//             ex lacus quis magna. Sed congue, elit vel tincidunt laoreet, velit
//             ipsum dictum velit, in molestie magna risus id dolor. Nullam
//             consectetur, nisi sit amet consectetur hendrerit, mauris tellus
//             dictum arcu, non consequat nunc ex in magna. Suspendisse sed rutrum
//             augue. Sed at diam eget magna bibendum rhoncus. Curabitur consequat
//             sit amet augue vel tincidunt. Sed non diam eget erat pulvinar
//             porttitor. Nullam faucibus, nibh ut facilisis aliquet, ex ante
//             molestie nulla, ut maximus lacus augue vel dolor. Sed ut nisl et est
//             euismod hendrerit. Donec tincidunt, purus a condimentum pretium,
//             nulla nulla tempus ex, a volutpat ex velit non justo. Sed vel
//             venenatis mi.
//           </p>
//         ))}

//         {/* Add more content here */}
//       </div>
//       <div className="w-1/2 bg-gray-200">
//         {/* Content for the right section goes here */}
//       </div>
//     </div>
//   );
// };

// export default VerticalSplit;
"use client";
import React, { useState, useEffect } from "react";
import yaml from "js-yaml";

const MyComponent = () => {
  const [stringifiedYaml, setStringifiedYaml] = useState("");

  const stringifyToYaml = (obj: any) => {
    try {
      const yamlString = yaml.dump(obj);
      setStringifiedYaml(yamlString);
    } catch (error) {
      console.error("Error stringifying to YAML:", error);
    }
  };

  useEffect(() => {
    const myJsObject = {
      version: 1,
      services: {
        "my-service": {
          build: {
            context: ".",
            dockerfile: "Dockerfile",
            args: {
              NODE_ENV: "development",
            },
          },
          container_name: "OK",
          image: "YO",
          volumes: [],
          ports: ["3000:3000"],
          command: "npm run dev",
          depends_on: [""],
          environment: {
            NODE_ENV: "development",
          },
          healthcheck: {
            test: "curl --fail http://localhost:3000 || exit 1",
            interval: "30s",
            timeout: "10s",
            retries: 5,
          },
        },
      },
    };
    stringifyToYaml(myJsObject);
  }, []);

  return (
    <div>
      <pre>{stringifiedYaml}</pre>
    </div>
  );
};

export default MyComponent;
