import flow from "../models/flowModel.js";
import csvtojson from 'csvtojson'

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
    const { workflowId } = req.body;
    const workflow = await flow.findById(workflowId);
    const csvFilePath = req.file.path;
    const jsonArray = await csvtojson().fromFile(csvFilePath);
    console.log(jsonArray);
    
    for (const node of workflow.nodes) {
      switch (node.type) {
        case 'Filter Data':
          jsonArray.forEach(row => {
            row[node.data.column] = row[node.data.column].toLowerCase();
          });
          break;
        case 'Wait':
          await new Promise(resolve => setTimeout(resolve, 60000)); 
          break;
        case 'Convert Format':
          // CSV to JSON is already done
          break;
        case 'Send POST Request':
          await axios.post('https://requestcatcher.com/test', jsonArray);
          break;
        default:
          break;
      }
    }
    res.send({ message: 'Workflow executed', data: jsonArray });
    
};
