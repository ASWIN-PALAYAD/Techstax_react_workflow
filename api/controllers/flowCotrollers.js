import flow from "../models/flowModel.js";
import csvtojson from "csvtojson";
import axios from 'axios'

export const getAllFlows = async (req, res) => {
  try {
    const workFlows = await flow.find();
    res.status(200).json(workFlows);
  } catch (error) {
    console.log(error);
  }
};

export const saveFlows = async (req, res) => {
  console.log(req.body.nodes[0].position);
  try {
    const workFlow = await flow.create(req.body);
    res.status(200).json({ workFlow, message: "workflow saved" });
  } catch (error) {
    console.log(error);
  }
};



export const runFlow = async (req, res) => {
  try {
    const { workflowId } = req.body;
    const workflow = await flow.findById(workflowId);
    const csvFilePath = req.file.path;

    // Convert CSV to JSON
    let jsonArray = await csvtojson().fromFile(csvFilePath);
    console.log("Initial Data:", jsonArray);

    // Execute each node in the workflow
    for (const node of workflow.nodes) {
      console.log(node);

      const nodeType = node.type.toLowerCase();

      switch (nodeType) {
        case "filter data":
          jsonArray = jsonArray.map(row => {
            const newRow = {};
            Object.keys(row).forEach(key => {
              if (typeof row[key] === 'string') {
                newRow[key] = row[key].toLowerCase();
              } else {
                newRow[key] = row[key]; 
              }
            });
            return newRow;
          });
          console.log("After Filter Data:", jsonArray);
          break;

        case "wait":
          console.log(`Waiting for ${node.data.time || 30000} ms...`);
          await new Promise(resolve => setTimeout(resolve, node.data.time || 3000)); 
          break;

        case "convert format":
          // Data is already in JSON format
          console.log("Data is already in JSON format"); 
          break;

        case "sent post request":
          try {
            const response = await axios.post(
              "https://requestcatcher.com/test",
              jsonArray
            );
            console.log("POST Request sent successfully:", response.data);
          } catch (error) {
            console.error("Error in sending POST Request:", error.message);
          }
          break;

        default:
          console.log("Unknown node type");
          break;
      }
    }

    res.status(200).send({ message: "Workflow executed successfully", data: jsonArray });
  } catch (error) {
    console.error("Error executing workflow:", error);
    res.status(500).send({ message: "Error executing workflow", error: error.message });
  }
};
