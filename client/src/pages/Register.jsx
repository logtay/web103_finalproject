import UserForm from "../components/UserForm.jsx";
import UserAPI from "../services/UserAPI.js";

const Register = () => {
  // Function to create a user
  const Signup = async (formData) => {
    await UserAPI.createUser(formData.username, formData.password);
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
