import "./RightBar.css";
import { useState, useEffect } from "react";
import img from "../../assets/images/1.jpeg";
import gift from "../../assets/images/gift.jpeg";
function RightBar({ profile }) {
  const HomeRightbar = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/user/users", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }, []);
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={gift} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends </b> have a birthday today
          </span>
        </div>

        <img className="rightBarAd" src={img} alt="images" />
        <h4 className="rightBarTitle"> Online friends </h4>
        <ul className="rightBarFriendList">
          {users &&
            users.map((u, idx) =>
              u.online === "true" ? (
                <div key={idx} className="userses">
                  <div className="online_images">
                    <img
                      className="online_images"
                      src={u.img_url}
                      alt="person"
                    />
                    <p className="online_img"></p>
                  </div>
                  <p className="username">{u.username}</p>
                </div>
              ) : null
            )}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    if (!localStorage.getItem("token")) {
      window.location = "/login";
    }
    // const tokenes = localStorage.getItem("token");

    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/user/users", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }, []);

    const signOut = async (e) => {
      e.preventDefault();

      fetch("http://localhost:5000/user/sign_out", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);

          if (data.msg === "User sign out!") {
            localStorage.clear();
            window.location = "/";
          }
          if (data.msg === "Token mavjud emas!") {
            window.location = "/login";
          }
        });
    };

    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">Single</span>
          </div>
          <button onClick={(e) => signOut(e)} className="exit_btn">
            Sign out
          </button>
        </div>

        <h4 className="rightbarTitle">User friends</h4>

        <div className="rightbarFollowings">
          {users &&
            users.map((u, idx) => (
              <div key={idx} className="rightbarFollowing">
                <img
                  src={u.img_url}
                  className="rightbarFollowingImg"
                  alt="images"
                />
                <span className="rightbarFollowingName">{u.username}</span>
              </div>
            ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default RightBar;
