import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValue = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    instagram: string;
  };
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
      username: "",
      email: "",
      channel: "",
      social: {
        facebook: "",
        instagram: "",
      },
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const onSubmit = (data: FormValue) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Form field</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>
        <div className="form-control">
          <label htmlFor="instagram">Instagram</label>
          <input type="text" id="instagram" {...register("social.instagram")} />
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
