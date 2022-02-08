import { Outlet, useParams } from "react-router-dom";

const DirMysa = () => {
  const { id } = useParams();

  return id ? <Outlet /> : <h1>Directory - Mysa</h1>;
};

export default DirMysa;
