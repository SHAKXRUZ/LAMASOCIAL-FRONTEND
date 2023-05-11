import "./Share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { useState, useEffect } from "react";

const Share = () => {
  const [user, setUser] = useState("");

  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }

  useEffect(() => {
    fetch("http://localhost:5000/user/user", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const token = localStorage.getItem("token");

  const [img_url, setImg_urles] = useState("");

  const uploadFile = async (e) => {
    const files = e.target.files;
    console.log(files);
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
    setImg_urles(data2.secure_url);
  };

  const posts = async (e) => {
    e.preventDefault();
    let { title, file } = e.target;
    if (!title) {
      alert("Title is requarit?");
    }
    await fetch("http://localhost:5000/user/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        token,
        img_url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Create post!") {
          title.value = "";
          file.value = "";
          window.location.reload();
        }
        if (data.msg === "Token mavjud emas!") {
          window.location = "/login";
        }
      });
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <form onSubmit={(e) => posts(e)}>
          <div className="shareTop">
            <img className="shareProfileImg" src={user.userImagesUrl} alt="" />
            <input
              name="title"
              id="title"
              placeholder="What is in your mind"
              className="shareInput"
              
            />
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <label className="post_file_input" form="file">
                  <PermMedia htmlColor="tomato" className="shareIcon" />
                  <span className="shareOptionText">Photo or Videos</span>
                  <input
                    onChange={(e) => uploadFile(e)}
                    className="input_styles"
                    type="file"
                    name="file"
                  />
                </label>
              </div>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button type="submit" className="shareButton">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
