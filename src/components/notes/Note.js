import React from "react";
import { Card, Button, Col } from "react-bootstrap";

const Note = ({ note, deleteNote }) => {
  const { id, title, body } = note;

  return (
    <Col key={id.id}>
      <Card className=" h-100">
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="flex-grow-1 ">{body}</Card.Text>
          <Button
            variant="outline-dark"
            onClick={() => deleteNote(id)}
            className="w-100 py-3"
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Note;
