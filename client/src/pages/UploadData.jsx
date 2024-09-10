import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/uploadData.css";
import { FaCloudArrowUp } from "react-icons/fa6"; 

const UploadData = () => {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/flow`)
      .then((res) => setWorkflows(res.data));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("workflowId", selectedWorkflow);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/flow/run`,
        formData
      );
      alert("Workflow executed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main_container">
      <div className="upload_section">
        <div className="upload_container">
          <h1>Drag and Drop file here to upload</h1>
          <FaCloudArrowUp size={80} color="blue" />
          <div className="file_section">
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <span>Please select .csv format files</span>
          </div>
        </div>
        <div className="workflow_id">
          <span>Select workflow Id : </span>
          <select onChange={(e) => setSelectedWorkflow(e.target.value)}>
            <option value="">Select Workflow</option>
            {workflows?.map((workflow) => (
              <option key={workflow._id} value={workflow._id}>
                {workflow._id}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit}>Execute Workflow</button>
      </div>
    </div>
  );
};

export default UploadData;
