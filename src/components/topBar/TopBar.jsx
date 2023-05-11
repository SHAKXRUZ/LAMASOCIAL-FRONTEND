import "./TopBar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TopBar = () => {
  const [user, setUser] = useState("");

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

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/home" className="logo">
          Lamasocial
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className={"searchIcon"} />
          <input
            placeholder="Search for friend, post a video"
            className="serachInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to="/profeli">
          <img
            src={user.userImagesUrl}
            alt="person_images"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
