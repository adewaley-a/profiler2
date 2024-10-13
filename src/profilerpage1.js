import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';


const Profilerpage1 = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Fetch notes from Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollection = collection(db, 'notes');
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesList);
    };

    fetchNotes();
  }, []);

  const [show, setShow] = useState(true)
  // Add a new note to Firestore
  const handleAddNote = async () => {
    if (newNote.trim()) {
      await addDoc(collection(db, 'notes'), { text: newNote });
      setNewNote('');
      // Refresh notes
      const notesSnapshot = await getDocs(collection(db, 'notes'));
      const notesList = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesList);

      setShow(false)
    }
  };

  // Delete a note from Firestore
  const handleDeleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
    setNotes(notes.filter(note => note.id !== id));
    
    setShow(true)
    
  };

 
  

  return (
    <div>
      <h1>About</h1>
      <div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your about"
        />
       {show? <button onClick={handleAddNote}>Add</button> :null}
      </div>
      <div>
        {notes.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profilerpage1;
