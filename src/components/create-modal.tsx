import React, { useState } from "react";
import { Modal, Backdrop, Box, Fade, Typography, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button } from "@mui/material";
import { useShapeContext } from "@/context/shape-context";

const CreateModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { createShape } = useShapeContext();
  const [name, setName] = useState("");
  const [shapeType, setShapeType] = useState<string>("");

  const handleCreate = () => {
    createShape(name, shapeType);
    onClose();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Create
          </Typography>
          <TextField fullWidth label="Name" placeholder="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel id="shape-type">Shape Type</InputLabel>
            <Select
              labelId="shape-type"
              value={shapeType}
              label="Shape Type"
              onChange={(e: SelectChangeEvent<string>) => setShapeType(e.target.value as string)}
            >
              <MenuItem value={"sphere"}>Sphere</MenuItem>
              <MenuItem value={"cylinder"}>Cylinder</MenuItem>
              <MenuItem value={"cube"}>Cube</MenuItem>
              <MenuItem value={"cone"}>Cone</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleCreate} style={{ marginRight: "10px" }}>
            Create
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateModal;
