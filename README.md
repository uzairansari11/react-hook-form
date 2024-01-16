# React + TypeScript + Vite

#### Loading state using api

### Async function to load initial value using api

```
const form = useForm<FormValue>({
    defaultValues: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
     const data = await res.json();
     return {
      username: data.username,
     email: data.email,
       channel: data.username,
     };
  },
   });

```

### Use default value

````const form = useForm<FormValue>({
defaultValues: {
username: "",
email: "",
channel: "",
},
});```



````
