import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddNote from "./AddNote";
import Note from "./Note";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { NotesService } from "../../utils/notesService";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const notesService = new NotesService();

  const getNotes = useCallback(async () => {
    try {
      setLoading(true);
      setNotes(await notesService.getNotes());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addNote = async (data) => {
    try {
      setLoading(true);
      const { title, body } = data;
      notesService.addNote(title, body).then((_) => {
        getNotes();
      })
      toast(<NotificationSuccess text="A note added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a note." />);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      notesService.deleteNote(id).then((_) => {
        getNotes();
        toast(<NotificationSuccess text="Delete the note successfully" />);
      }).catch(err => {
        toast(<NotificationError text="Failed to delete the note." />);
      })
    } catch (error) {
      toast(<NotificationError text="Failed to delete the note." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Street Food</h1>
            <AddNote save={addNote} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {notes.map((_note) => (
              <Note
                note={{
                  ..._note,
                }}
                deleteNote={deleteNote}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Notes;
