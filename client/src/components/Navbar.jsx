import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state)=>state.user.currentUser)
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("work_flow_token");
    dispatch(updateUser(''))
    navigate("/login");
  };

  return (
    <div className="nav_container">
      <Link to={"/"}>
        <MdOutlineMenu size={40} />
      </Link>
      <h2>Workflow Builder</h2>
      {currentUser && (
        <Link className="run_workflow_link" to={"/upload"}>
          Run Workflow
        </Link>
      )}
      {!currentUser ? (
        <button
          className="nav_button"
          style={{ backgroundColor: "green", color: "white" }}
        >
          Login
        </button>
      ) : (
        <button
          className="nav_button"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
