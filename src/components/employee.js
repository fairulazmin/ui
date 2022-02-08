import { useParams } from "react-router-dom";

const Employee = () => {
  const { id } = useParams();

  return <h1>MYSA's staff profile - {id}</h1>;
};

export default Employee;
