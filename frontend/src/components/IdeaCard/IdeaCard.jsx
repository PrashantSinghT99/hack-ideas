import React from "react";
import "./IdeaCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import noteImage from "../../assets/note.png";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { updateNote } from "../../helper/apis";
import { ChatContextState } from "../../context/Context";
import { Badge } from "react-bootstrap";
const NoteCard = ({ note, setRefetch, refetch }) => {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);
  //console.log(note.tags);
  const [show, setShow] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const { token } = ChatContextState();
  const removeSelectedTags = (u) => {
    setSelectedTags(selectedTags.filter((sel) => sel._id !== u._id));
  };
  const handleEnterPress = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      setSelectedTags((prevTags) => [...prevTags, currentTag.trim()]);
      setCurrentTag("");
    }
  };
  const updateApi = async () => {
    try {
      await updateNote(
        note._id,
        token,
        editedTitle,
        editedDescription,
        selectedTags ? selectedTags : note.tags
      );
      setRefetch(!refetch);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    setShow(false);
    
    updateApi();
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setEditedTitle(note.title);
    setEditedDescription(note.description);
    setSelectedTags(note.tags);
  };

  return (
    <>
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
              <Form.Control
                type="text"
                autoFocus
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="modalAddTags">
              <Form.Label>Add tags</Form.Label>
              <Form.Control
                value={currentTag}
                type="text"
                placeholder="Enter user name"
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleEnterPress}
                autoFocus
              />
            </Form.Group>
          </Form>

          {selectedTags.map((u) => (
            <Badge
          
              key={u}
              bg="success"
              style={{ marginLeft: "5px" }}
              onClick={() => removeSelectedTags(u)}
            >
              {u}❌
            </Badge>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className="Card" style={{ width: "18rem" }}>
        {/**<Card.Img
          variant="top"
          src={noteImage}
          style={{ width: "50px", height: "50px" }}
        /> */}

        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
          <div className="cardtags">
            {note.tags.map((tag) => (
              <Badge className="badge">{tag}</Badge>
            ))}
          </div>
          <div className="button">
            <Button variant="primary" className="mx-4" onClick={handleShow}>
              Update
            </Button>
            <Button variant="primary" className="mx-4">
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default NoteCard;
