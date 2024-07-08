import React from "react";
import { Modal, Backdrop, Box, Fade, Typography, Button } from "@mui/material";
import { useShapeContext } from "@/context/shape-context";
import { Shape } from "@/hooks/use-shape-manager";

const DeleteModal: React.FC<{ open: boolean; onClose: () => void; shapeToDelete: Shape | null }> = ({ open, onClose, shapeToDelete }) => {
  const { deleteShape } = useShapeContext();

  const handleDelete = () => {
    if (shapeToDelete) {
      deleteShape(shapeToDelete);
      onClose();
    }
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
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
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
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="delete-modal-description" variant="body1" component="p">
            Are you sure you want to delete {shapeToDelete?.name}?
          </Typography>
          <Button variant="contained" color="error" onClick={handleDelete} style={{ marginRight: "10px" }}>
            Delete
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
