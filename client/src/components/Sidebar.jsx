import { useDnD } from '../context/DnDContex';

const Sidebar = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">Workflow Nodes</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Start')} draggable>
        Start
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Filter Data')} draggable>
        Filter Data
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "wait")} draggable>
        Wait
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Convert Format')} draggable>
        Convert Format
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Sent POST Request')} draggable>
        Sent POST Request
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'End')} draggable>
        End
      </div>
    </aside>
  );
};


export default Sidebar