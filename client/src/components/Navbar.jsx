import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";

const Navbar = () => {
  const user = localStorage.getItem("flowUser");
  console.log(user);
  

  return (
    <div className="nav_container">
      <Link to={"/"}>
        <MdOutlineMenu size={40} />
      </Link>
      <h2>Workflow Builder</h2>
      <Link className="run_workflow_link" >
        Run Workflow
      </Link>
      {user == null ? (
        <button className="nav_button" style={{backgroundColor:"red",color:"white"}}>Login</button>
      ) : (
        <button className="nav_button" style={{backgroundColor:"green", color:'white'}}>Login</button>
      )}
    </div>
  );
};

export default Navbar;
