"use client";
import React from "react";

function MyForm() {
  // const methods = useForm();

  // const onSubmit = (data: any) => {
  //   console.log(data); // Data will contain the nested key-value pairs
  // };

  return (
    <div>Thanks for checking out the test page</div>
    // <FormProvider {...methods}>
    //   <form onSubmit={methods.handleSubmit(onSubmit)}>
    //     <Services />
    //     <button type="submit">Submit</button>
    //   </form>
    // </FormProvider>
  );
}

// function Services() {
//   const { register, control } = useFormContext();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "services",
//   });

//   const appendService = () => {
//     append({ key: "", values: [] });
//   };

//   const removeService = (index: number) => {
//     remove(index);
//   };

//   return (
//     <div>
//       {fields.map((service, index) => (
//         <div key={service.id}>
//           <input
//             {...register(`services[${index}].key`)}
//             type="text"
//             placeholder="Service Key"
//           />
//           <InnerComponent serviceIndex={index} />
//           <button type="button" onClick={() => removeService(index)}>
//             Remove Service
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={appendService}>
//         Add Service
//       </button>
//     </div>
//   );
// }

// function InnerComponent({ serviceIndex }: { serviceIndex: number }) {
//   const { control, register } = useFormContext();
//   const {
//     fields: values,
//     append,
//     remove,
//   } = useFieldArray({
//     control,
//     name: `services[${serviceIndex}].values`,
//   });

//   const appendValue = () => {
//     append({ key: "", value: "" });
//   };

//   const removeValue = (index: number) => {
//     remove(index);
//   };

//   return (
//     <div>
//       {values.map((value, index) => (
//         <div key={value.id}>
//           <input
//             {...register(`services[${serviceIndex}].values[${index}].key`)}
//             type="text"
//             placeholder="Value Key"
//           />
//           <input
//             {...register(`services[${serviceIndex}].values[${index}].value`)}
//             type="text"
//             placeholder="Value"
//           />
//           <button type="button" onClick={() => removeValue(index)}>
//             Remove Value
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={appendValue}>
//         Add Value
//       </button>
//     </div>
//   );
// }

export default MyForm;
