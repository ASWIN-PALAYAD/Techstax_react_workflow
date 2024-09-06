import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser,updateUser } = useContext(AuthContext);
  
  const handleLogout = () => {
    localStorage.removeItem("work_flow_token")
    updateUser('')
    navigate('/login');
  }

  return (
    <div className="nav_container">
      <Link to={"/"}>
        <MdOutlineMenu size={40} />
      </Link>
      <h2>Workflow Builder</h2>
      {currentUser && (

      <Link className="run_workflow_link" >
        Run Workflow
      </Link>
      )}
      {currentUser == null ? (
        <button className="nav_button" style={{backgroundColor:"red",color:"white"}}>Login</button>
      ) : (
        <button className="nav_button" style={{backgroundColor:"green", color:'white'}} onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
