import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddNote = ({ save }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const isFormFilled = () => title && body;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputTitle"
              label="Title"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Title"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputBody"
              label="Body"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="body"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                title,
                body,
              });
              handleClose();
            }}
          >
            Save note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddNote.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddNote;
