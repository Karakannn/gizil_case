import React, { useEffect, useState } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, TextField } from "@mui/material";
import * as THREE from "three";
import { useShapeContext } from "@/context/shape-context";
import { useThreeJSContext } from "@/context/three-js-context";
import { Shape } from "@/hooks/use-shape-manager";
import { useRenderModeContext } from "@/context/render-mode-context";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CreateModal from "@/components/create-modal";
import DeleteModal from "@/components/delete-modal";

export const ThreeJSContainer: React.FC = () => {
  const { shapes, selectedShape, handleShapeSelect, handleScaleChange, handlePositionChange } = useShapeContext();
  const { renderMode, setRenderMode, singleRender, setSingleRender } = useRenderModeContext();
  const { sceneRef, cameraRef, rendererRef, containerRef, meshRefs, controlsRef, raycaster, mouse } = useThreeJSContext();

  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shapeToDelete, setShapeToDelete] = useState<Shape | null>(null);

  useEffect(() => {
    if (renderMode) {
      initThree();
    } else {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
        meshRefs.current = [];
        if (controlsRef.current) {
          controlsRef.current.dispose();
          controlsRef.current = null;
        }
      }
    }
  }, [renderMode]);

  useEffect(() => {
    if (selectedShape) {
      const mesh = meshRefs.current.find((mesh) => mesh.userData.id === selectedShape.id);
      if (mesh) {
        mesh.position.set(selectedShape.position[0], selectedShape.position[1], selectedShape.position[2]);
        mesh.scale.set(selectedShape.scale[0], selectedShape.scale[1], selectedShape.scale[2]);
      }
    }
  }, [selectedShape?.position, selectedShape?.scale]);

  const initThree = () => {
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
    } else {
      while (sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0]);
      }
    }

    if (!cameraRef.current) {
      cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      cameraRef.current.position.z = 5;
    }

    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      if (containerRef.current) {
        containerRef.current.appendChild(rendererRef.current.domElement);
      }
    }

    if (controlsRef.current) {
      controlsRef.current.dispose();
    }
    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controlsRef.current.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0x404040);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    sceneRef.current.add(ambientLight);
    sceneRef.current.add(pointLight);

    meshRefs.current.forEach((mesh) => sceneRef.current?.remove(mesh));
    meshRefs.current = [];

    const material = new THREE.MeshStandardMaterial({ color: "orange" });
    const shapesToRender = singleRender && selectedShape ? [selectedShape] : shapes;
    shapesToRender.forEach((shape) => {
      let geometry;
      switch (shape.shapeType) {
        case "sphere":
          geometry = new THREE.SphereGeometry(1, 32, 32);
          break;
        case "cube":
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case "cylinder":
          geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
          break;
        case "cone":
          geometry = new THREE.ConeGeometry(1, 2, 32);
          break;
        default:
          return;
      }
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(shape.position[0], shape.position[1], shape.position[2]);
      mesh.scale.set(shape.scale[0], shape.scale[1], shape.scale[2]);
      mesh.userData = shape;
      meshRefs.current.push(mesh);
      sceneRef.current?.add(mesh);
    });

    const animate = () => {
      if (!rendererRef.current) return;
      requestAnimationFrame(animate);
      controlsRef.current?.update();
      rendererRef.current.render(sceneRef.current!, cameraRef.current!);
    };
    animate();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteModalOpen = (shape: Shape) => {
    setShapeToDelete(shape);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleRenderAll = () => {
    setRenderMode(true);
    setSingleRender(false);
  };

  const handleRenderSingle = (shape: Shape) => {
    setSingleRender(true);
    handleShapeSelect(shape);
    setRenderMode(true);
  };

  const handleCloseCanvas = () => {
    setRenderMode(false);
    setSingleRender(false);
    handleShapeSelect(null);
  };

  const handleMeshClick = (event) => {
    const mesh = event.object as THREE.Mesh;
    const shape = mesh.userData as Shape;
    handleShapeSelect(shape);
  };

  const onCanvasClick = (event: React.MouseEvent) => {
    if (raycaster.current && mouse.current && cameraRef.current && sceneRef.current) {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      const intersects = raycaster.current.intersectObjects(meshRefs.current);
      if (intersects.length > 0) {
        handleMeshClick(intersects[0]);
      }
    }
  };

  return (
    <>
      {!renderMode && (
        <>
          <div className="table-actions" style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Create
            </Button>
            <Button variant="contained" color="secondary" onClick={handleRenderAll}>
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
                      <Button variant="contained" color="info" onClick={() => handleRenderSingle(shape)}>
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
        <div className="canvas-container" style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#282c34" }} onClick={onCanvasClick}>
          <Button variant="contained" onClick={handleCloseCanvas} style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
            Close
          </Button>
          <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
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
    </>
  );
};

export default ThreeJSContainer;
