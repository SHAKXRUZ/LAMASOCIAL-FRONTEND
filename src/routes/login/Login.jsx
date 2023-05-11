import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const login = async (e) => {
    e.preventDefault();

    let { email, password } = e.target;
    let new_user = {
      email: email.value,
      password: password.value,
    };
    await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_user),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);

        if (data.msg === "Success!") {
          email.value = "";
          password.value = "";
          if (data.token) {
            if (
              localStorage.getItem("token")
              // localStorage.getItem("profel")
            ) {
              localStorage.clear();
              localStorage.setItem("token", data.token);
              // localStorage.setItem("profel", data.userImg_url);
              window.location = "/home";
            } else {
              localStorage.setItem("token", data.token);
              // localStorage.setItem("profel", data.userImg_url);
              window.location = "/home";
            }
          }
        }

        if (data.msg === "Email not found!") {
          email.value = "";
          password.value = "";
          window.location = "/";
        }
      });
  };

  return (
    <div className="login">
      <div className="login_form_content">
        <form onSubmit={(e) => login(e)} id="loginForm" className="form">
          <input
            name="email"
            id="email"
            className="input_style"
            type="email"
            placeholder="Email..."
            required
          />
          <input
            name="password"
            id="password"
            className="input_style"
            type="password"
            placeholder="Password..."
            required
          />
          <button className="submit_btn_style" type="submit">
            Login
          </button>
        </form>
        <Link to="/">
          <button className="registr_pages_btn_style">
            Create a new account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
