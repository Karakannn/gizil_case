import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomeContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate("/with-threejs");
        }}
        variant="contained"
        color="primary"
      >
        With ThreeJS
      </Button>
      <Button
        onClick={() => {
          navigate("/with-react-three-fiber");
        }}
        variant="contained"
        color="primary"
      >
        With react-three-fiber
      </Button>
    </div>
  );
}
