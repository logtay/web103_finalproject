import UserForm from "../components/UserForm";

const Register = () => {
  // Function to create a user
  const Signup = async (formData) => {
    try {
      await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  return (
    <UserForm
      title={"Create an account"}
      onSubmit={Signup}
      submitLabel={"Sign Up"}
      isSignup={true}
    />
  );
};

export default Register;
