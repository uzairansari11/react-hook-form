import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValue = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    instagram: string;
  };
  phoneNumber: string[];
  phNumber: {
    number: string;
  }[];
  age: number;
};
const YouTubeForm = () => {
  /* Async function to load initial value using api */
  // const form = useForm<FormValue>({
  //   defaultValues: async () => {
  //     const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  //     const data = await res.json();
  //     return {
  //       username: data.username,
  //       email: data.email,
  //       channel: data.username,
  //     };
  //   },
  // });

  /* Use default value */
  const form = useForm<FormValue>({
    defaultValues: {
      username: "Uzair",
      email: "",
      channel: "",
      social: {
        facebook: "",
        instagram: "",
      },
      phoneNumber: ["", ""],
      phNumber: [
        {
          number: "",
        },
      ],
      age: 0,
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    watch,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "phNumber",
    control,
  });
  const onSubmit = (data: FormValue) => {
    console.log(data);
  };
  const handleGetValues = () => {
    // const x = getValues("age");  // single value
    // const x = getValues(["age", "username"]); // multiple values
    const x = getValues(); // entire form values
    console.log(x);
  };
  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onError = (error: FieldErrors<FormValue>) => {
    console.log(error);
  };
  console.log(formState.isDirty, "ks");
  return (
    <div>
      <h1>Form field</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Username must not be alphanumeric",
              },
              validate: {
                maxLength: (data) => {
                  return !data.includes("s") || "invalid";
                },
              },
            })}
          />
          <p className="error">{formState?.errors?.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          <p className="error">{formState?.errors?.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{formState?.errors?.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              disabled: watch("channel") === "",
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="instagram">Instagram</label>
          <input type="text" id="instagram" {...register("social.instagram")} />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumber.0", {
              required: {
                value: true,
                message: "Primary Number is required",
              },
            })}
          />
          <p className="error">
            {" "}
            {formState?.errors?.phoneNumber?.[1]?.message}
          </p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumber.1", {
              required: {
                value: true,
                message: "Secondary Number is required",
              },
            })}
          />
          <p className="error">
            {formState?.errors?.phoneNumber?.[1]?.message}
          </p>
        </div>

        <div>
          <label htmlFor="phone-list">Phone List</label>
          {fields.map((field, index) => {
            return (
              <div className="form-control" key={field.id}>
                <input
                  type="text"
                  {...register(`phNumber.${index}.number` as const)}
                />
                {index > 0 && (
                  <button onClick={() => remove(index)}>Remove</button>
                )}
              </div>
            );
          })}

          <button
            onClick={() =>
              append({
                number: "",
              })
            }
          >
            ADD
          </button>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
        </div>

        <button disabled={!formState?.isDirty || !formState.isValid}>
          Submit
        </button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set UserValue
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
