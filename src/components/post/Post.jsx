import "./Post.css";
import { useState, useEffect } from "react";
// import personImg from "../../assets/images/person.png";
import likeImages from "../../assets/images/like.jpeg";
import heard from "../../assets/images/heard.png";
import { MoreVert } from "@mui/icons-material";

const Post = () => {
  const [post, setPosts] = useState([]);
  const [user, setUsers] = useState([]);

  let tokenes = localStorage.getItem("token");

  if (!tokenes) {
    alert("Token mavjud emas?");
    window.location = "/login";
  }
  useEffect(() => {
    fetch("http://localhost:5000/user/posts", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

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

  const laykClick = async (post) => {
    await fetch("http://localhost:5000/user/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokenes,
        post,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  };

  return (
    <div className="post">
      {post &&
        post.map((pos, idx) => (
          <div className="post_card" key={idx}>
            <div key={idx} className="post_header">
              {user &&
                user.map((u, idx) =>
                  u.id === pos.user_id ? (
                    <div key={idx} className="post_header_left">
                      <img
                        key={idx}
                        className="post_header_user_images"
                        src={u.img_url}
                        alt="user_images"
                      />
                      <p className="post_card_username">{u.username}</p>
                      <p>{pos.create_post}</p>
                    </div>
                  ) : null
                )}
              <div className="post_header_right">
                <MoreVert className="post_header_icons" />
                <p className="post_name">{pos.title}</p>
              </div>
            </div>
            <img className="post_img_url" src={pos.img_url} alt="img_url" />
            <di className="post_footer">
              <div className="post_footer_left">
                <img
                  onClick={() => laykClick(pos.id)}
                  className="like_images_post_card"
                  src={likeImages}
                  alt="like_images_post_card"
                />
                <img
                  className="post_footer_left_heard"
                  src={heard}
                  alt="heard_images"
                />
              </div>
              <p className="post_header_right">9 comments</p>
            </di>
          </div>
        ))}
    </div>
  );
};

export default Post;
