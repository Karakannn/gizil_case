import { useState } from "react";
import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, TextField } from "@mui/material";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Shape, useShapeManager } from "@/hooks/use-shape-manager";
import { useRenderModeContext } from "@/context/render-mode-context";
import CreateModal from "@/components/create-modal";
import DeleteModal from "@/components/delete-modal";

export default function ThreeFiberContainer() {
  const { shapes, selectedShape, handleShapeSelect, handleScaleChange, handlePositionChange } = useShapeManager();

  const { renderMode, setRenderMode, singleRender, setSingleRender } = useRenderModeContext();

  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shapeToDelete, setShapeToDelete] = useState<Shape | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteModalOpen = (shape: Shape) => {
    setShapeToDelete(shape);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setShapeToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleRender = () => {
    setRenderMode(true);
    setSingleRender(false);
    handleShapeSelect(null);
  };

  const handleCloseCanvas = () => {
    setRenderMode(false);
    setSingleRender(false);
    handleShapeSelect(null);
  };

  return (
    <div>
      {!renderMode && (
        <>
          <div className="table-actions" style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Create
            </Button>
            <Button variant="contained" color="secondary" onClick={handleRender}>
              Render All
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Shape Type</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shapes.map((shape) => (
                  <TableRow key={shape.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>{shape.id}</TableCell>
                    <TableCell>{shape.name}</TableCell>
                    <TableCell>{shape.shapeType}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => handleDeleteModalOpen(shape)} style={{ marginRight: "10px" }}>
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                          setSingleRender(true);
                          handleShapeSelect(shape);
                          setRenderMode(true);
                        }}
                      >
                        Render
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {renderMode && (
        <div className="canvas-container" style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#282c34" }}>
          <Button variant="contained" onClick={handleCloseCanvas} style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
            Close
          </Button>
          <Canvas style={{ width: "100%", height: "100%" }}>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {singleRender && selectedShape ? (
              <mesh
                key={selectedShape.id}
                position={selectedShape.position}
                scale={selectedShape.scale}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShapeSelect(selectedShape);
                }}
              >
                {selectedShape.shapeType === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
                {selectedShape.shapeType === "cube" && <boxGeometry args={[1, 1, 1]} />}
                {selectedShape.shapeType === "cylinder" && <cylinderGeometry args={[1, 1, 2, 32]} />}
                {selectedShape.shapeType === "cone" && <coneGeometry args={[1, 2, 32]} />}
                <meshStandardMaterial color={"orange"} />
              </mesh>
            ) : (
              shapes.map((shape) => (
                <mesh
                  key={shape.id}
                  position={shape.position}
                  scale={shape.scale}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShapeSelect(shape);
                  }}
                >
                  {shape.shapeType === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
                  {shape.shapeType === "cube" && <boxGeometry args={[1, 1, 1]} />}
                  {shape.shapeType === "cylinder" && <cylinderGeometry args={[1, 1, 2, 32]} />}
                  {shape.shapeType === "cone" && <coneGeometry args={[1, 2, 32]} />}
                  <meshStandardMaterial color={"orange"} />
                </mesh>
              ))
            )}
          </Canvas>
          {selectedShape && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">{selectedShape.name}</Typography>
              <Typography variant="body1">Type: {selectedShape.shapeType}</Typography>
              <div>
                <Typography variant="body2">Scale X:</Typography>
                <TextField
                  type="number"
                  value={selectedShape.scale[0]}
                  onChange={(e) => handleScaleChange("x", parseFloat(e.target.value))}
                  inputProps={{ min: "0.1", step: "0.1" }}
                />
              </div>
              <div>
                <Typography variant="body2">Scale Y:</Typography>
                <TextField
                  type="number"
                  value={selectedShape.scale[1]}
                  onChange={(e) => handleScaleChange("y", parseFloat(e.target.value))}
                  inputProps={{ min: "0.1", step: "0.1" }}
                />
              </div>
              <div>
                <Typography variant="body2">Scale Z:</Typography>
                <TextField
                  type="number"
                  value={selectedShape.scale[2]}
                  onChange={(e) => handleScaleChange("z", parseFloat(e.target.value))}
                  inputProps={{ min: "0.1", step: "0.1" }}
                />
              </div>
              <div>
                <Typography variant="body2">Position X:</Typography>
                <TextField
                  type="number"
                  value={selectedShape.position[0]}
                  onChange={(e) => handlePositionChange("x", parseFloat(e.target.value))}
                  inputProps={{ step: "0.1" }}
                />
              </div>
              <div>
                <Typography variant="body2">Position Y:</Typography>
                <TextField
                  type="number"
                  value={selectedShape.position[1]}
                  onChange={(e) => handlePositionChange("y", parseFloat(e.target.value))}
                  inputProps={{ step: "0.1" }}
                />
              </div>
              <div>
                <Typography variant="body2">Position Z:</Typography>
                <TextField
                  type="number"
                  value={selectedShape.position[2]}
                  onChange={(e) => handlePositionChange("z", parseFloat(e.target.value))}
                  inputProps={{ step: "0.1" }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <CreateModal open={open} onClose={handleClose} />
      <DeleteModal open={deleteModalOpen} onClose={handleDeleteModalClose} shapeToDelete={shapeToDelete} />
    </div>
  );
}
