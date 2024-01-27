import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import IdeaCard from "../IdeaCard/IdeaCard";
import { Badge } from "react-bootstrap";
import "./Ideas.css";
import UnauthorizedFallback from "../Fallback/UnauthorizedFallback";
import { ChatContextState } from "../../context/Context";
import { getAllIdeas, addNote } from "../../helper/apis";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Ideas = () => {
  const { token } = ChatContextState();
  const [ideaData, setIdeaData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  //console.log(ideaData);
  const removeSelectedTags = (u) => {
    setSelectedTags(selectedTags.filter((sel) => sel._id !== u._id));
  };
  const handleEnterPress = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      setSelectedTags((prevTags) => [...prevTags, currentTag.trim()]);
      setCurrentTag("");
    }
  };
  const fetchIdeasData = async () => {
    let data = await getAllIdeas(token);
    setIdeaData(data.data);
  };
  useEffect(() => {
    fetchIdeasData();
  }, [refetch]);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [show, setShow] = useState(false);

  const handleUpdate = () => {
    setShow(false);

    try {
      handleAddNote();
    } catch (error) {
      console.log(error);
    } finally {
      fetchIdeasData();
      setEditedTitle("");
      setEditedDescription("");
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleAddNote = async () => {
    await addNote(token, editedTitle, editedDescription, selectedTags);
  };

  if (token) {
    return (
      <div className="notes-container">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please Add Idea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
                onChange={(e)=>setCurrentTag(e.target.value)}
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
              Post Idea
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          <Button variant="primary" onClick={handleShow}>
            Add Idea
          </Button>
        </div>

        <div className="cards">
          {ideaData.map((note) => (
            <IdeaCard
              note={note}
              key={note._id}
              setRefetch={setRefetch}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    );
  } else return <UnauthorizedFallback />;
};

export default Ideas;
