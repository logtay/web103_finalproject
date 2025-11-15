import "../css/Login.css";

const Login = () => {
  const AUTH_URL = `/api/auth/github`;

  return (
    <div className="login">
      <center>
        <h1>Login and start saving Memories!</h1>
        <a href={AUTH_URL}>
          <button id="login-button">Login via Github</button>
        </a>
      </center>
    </div>
  );
};

export default Login;
