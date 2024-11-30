import mermaid from "mermaid";
import BJJTechniqueFlowchart from "../../components/BJJTechniqueFlowchart";
import VideoEmbed from "../../components/VideoEmbed";
const Diagram = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mx-2">
      <div className="w-full md:w-1/2">
        <BJJTechniqueFlowchart />
      </div>
      <div className="w-full md:w-2/3">
        <VideoEmbed />
      </div>
    </div>
  );
};

export default Diagram;
