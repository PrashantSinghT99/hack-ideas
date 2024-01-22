import React from "react";
import "./IdeaCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import noteImage from "../../assets/note.png";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {updateNote} from '../../helper/apis'
import {ChatContextState} from '../../context/Context'
const NoteCard = ({ note,setRefetch,refetch }) => {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);
  const [show, setShow] = useState(false);
  const {token}= ChatContextState();
const updateApi=async()=>
{
  try {
    await updateNote(note._id,token,editedTitle,editedDescription);
    setRefetch(!refetch);
  } catch (error) {
    console.log(error);
  }
 
}

  const handleClose = () => {
    setShow(false);
    setEditedTitle(note.title);
    setEditedDescription(note.description);

 
    updateApi()
  };
  const handleShow = () => setShow(true);

  return (
    <div className="card mx-2 my-2">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {note.title} - Note Number: {note.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" autoFocus   value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}/>
            </Form.Group>
             <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={noteImage}
          style={{ width: "50px", height: "50px" }}
        />
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
          <Button variant="primary" className="mx-4" onClick={handleShow}>
            Update
          </Button>
          <Button variant="primary" className="mx-4">
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteCard;
