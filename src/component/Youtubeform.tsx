import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValue = {
  username: string;
  email: string;
  channel: string;
};
const YouTubeForm = () => {
  const form = useForm<FormValue>({
    defaultValues: {
      username: "uzair ansari",
      email: "",
      channel: "",
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const onSubmit = (data: FormValue) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
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
                value: /^[a-zA-Z0-9]+$/,
                message: "Username must be alphanumeric",
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
        <div>
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
        <div>
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

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
