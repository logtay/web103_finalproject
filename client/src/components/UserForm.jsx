import "../css/UserForm.css";
import { useState } from "react";
import { Filter } from "bad-words";

const UserForm = ({ title, onSubmit, submitLabel, isSignup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Function to ensure password is strong enough
  function validatePassword() {
    if (!/[a-z]/.test(formData.password)) {
      alert("Password must contain at least one lowercase character!");
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      alert("Password must contain at least one uppercase character!");
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      alert("Password must contain at least one digit!");
      return false;
    }
    if (!/[$@#&!%^*()\-_+=]/.test(formData.password)) {
      alert("Password must contain at least one special character!");
      return false;
    }
    return true;
  }

  // Function to ensure username doesn't contain bad language
  function validateUsername() {
    const filter = new Filter();
    if (filter.isProfane(formData.username)) {
      alert("Username cannot contain bad language!");
      return false;
    }
    return true;
  }

  // Function to valid the form details
  function validateForm() {
    return validatePassword() && validateUsername();
  }

  // Function to submit user form
  async function submitForm(event) {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  }

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={submitForm}>
        <h2 id="user-form-title">{title}</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, username: e.target.value }));
          }}
          value={formData.username}
          minLength="3"
          maxLength="100"
          autoComplete="username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, password: e.target.value }));
          }}
          value={formData.password}
          minLength="6"
          maxLength="128"
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
        />
        <button type="submit" id="user-button">
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
