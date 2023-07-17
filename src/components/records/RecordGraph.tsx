interface Props {
  clientId: string;
}

const RecordGraph = ({ clientId }: Props) => {
  return (
    <div className="w-[67.9rem] h-[28.5rem] bg-white">{clientId} 그래프</div>
  );
};

export default RecordGraph;
