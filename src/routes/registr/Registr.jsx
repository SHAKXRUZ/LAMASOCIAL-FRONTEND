import "./Registr.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Registr = () => {
  const [img_url, setImg_url] = useState("");

  const uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "images");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtiuszgwz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const data2 = await res.json();
    setImg_url(data2.secure_url);
  };

  const registr = async (e) => {
    e.preventDefault();

    let { username, email, password, password_again, file } = e.target;
    await fetch("http://localhost:5000/user/registr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        password_again: password_again.value,
        img_url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);

        if (data.msg === "Created users!") {
          username.value = "";
          email.value = "";
          password.value = "";
          password_again.value = "";
          file.value = "";
          window.location = "/login";
        }

        if (data.msg === "This user is registered!") {
          username.value = "";
          email.value = "";
          password.value = "";
          password_again.value = "";
          file.value = "";
          window.location = "/login";
        }
      });
  };

  return (
    <div className="registr">
      <div className="registr_form_content">
        <form onSubmit={(e) => registr(e)} id="registrForm" className="form">
          <input
            name="username"
            id="username"
            className="input_style"
            type="text"
            placeholder="Username..."
            required
          />
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
          <input
            name="password_again"
            id="password_again"
            className="input_style"
            type="password"
            placeholder="Password again..."
            required
          />
          <input
            onChange={(e) => uploadFile(e)}
            name="file"
            id="file"
            type="file"
            required
          />
          <button className="submit_btn_style" type="submit">
            Sign Up
          </button>
        </form>
        <Link to="/login">
          <button className="login_pages_btn_style">Log into Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Registr;
