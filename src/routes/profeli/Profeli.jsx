import React from "./Profeli.css";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";

import profelCoverImages from "../../assets/images/1.jpeg";
import { useState, useEffect } from "react";
const Profeli = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }

  const token = localStorage.getItem("token");

  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [img_url, setImg_url] = useState("");
  const [coverImages, setCoverImages] = useState("");
  const [coverImageses, setCoverImageses] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/user/user", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.userImagesUrl);
        setCoverImageses(data.userCoverImagesUrl);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/user/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

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

  if (img_url) {
    fetch("http://localhost:5000/user/profel_images_update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        img_url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Profel images update!") {
          window.location.reload();
        }
      });
  }

  const coverImagesInput = async (e) => {
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
    setCoverImages(data2.secure_url);
  };

  if (coverImages) {
    fetch("http://localhost:5000/user/cover_images_update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        coverImages,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Cover images update!") {
          window.location.reload();
        }
        if (data.msg === "Error" || data.msg === "Token mavjud emas!") {
          window.location = "/login";
        }
      });
  }

  console.log(user);

  return (
    <>
      <TopBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRighTop">
            <div className="profileCover">
              <label form="file">
                <input
                  className="profel_images_input"
                  onChange={(e) => coverImagesInput(e)}
                  name="file"
                  id="file"
                  type="file"
                  required
                />
                {coverImageses ? (
                  <img
                    className="profileCoverImg"
                    src={coverImageses}
                    alt="profeli_background_images"
                  />
                ) : (
                  <img
                    className="profileCoverImg"
                    src={profelCoverImages}
                    alt="profeli_background_images"
                  />
                )}
              </label>
              <label form="file">
                <input
                  className="profel_images_input"
                  onChange={(e) => uploadFile(e)}
                  name="file"
                  id="file"
                  type="file"
                  required
                />
                <img className="profileUserImg" src={user} alt="user_images" />
              </label>
            </div>
            <div className="profileInfo">
              {users &&
                users.map((u, idx) =>
                  u.img_url === user ? (
                    <h4 key={idx} className="profileInfoName">
                      {u.username}
                    </h4>
                  ) : null
                )}

              <span className="profileInfoDesc"> Hello my friend!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <RightBar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profeli;
