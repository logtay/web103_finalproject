import UserAPI from "../services/UserAPI.js";

const Login = () => {
  // Function to sign in
  async function signin(formData) {
    const result = await UserAPI.verifyUser(
      formData.username,
      formData.password
    );
    if (result) {
      alert("Signed in");
    } else {
      alert("Wrong password or username");
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
