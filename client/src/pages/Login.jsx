import UserForm from "../components/UserForm";

const Login = () => {
  // Function to sign in
  async function signin(formData) {
    try {
      const response = await fetch(`/api/user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("Error logging user:", error);
    }
  }
  return (
    <UserForm
      title={"Login to your account"}
      onSubmit={signin}
      submitLabel={"Login"}
      isSignup={false}
    />
  );
};

export default Login;
