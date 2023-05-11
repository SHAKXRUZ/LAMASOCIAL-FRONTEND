import "./Home.css";
import SideBar from "./sidebar/SideBar";
import TopBar from "./topBar/TopBar";
import Feed from "./feed/Feed";
import RightBar from "./rightbar/RightBar";
const Home = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
};
export default Home;
