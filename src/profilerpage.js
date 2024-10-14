
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db, auth } from './firebase';
import Profilerpage1 from './profilerpage1';
import Display from './display';
import { Route, Routes, useNavigate } from "react-router-dom"
import './profilerpage.css'
import { signOut } from 'firebase/auth';
import { useParams } from 'react-router-dom';

const Notes = () => {

  const { uid } = useParams()
  


  //page 0 start
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Fetch notes from Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      const user = auth.currentUser; // Get the currently signed-in user

      if (user) {
        const userUid = user.uid; // Get the user's unique ID

        // Fetch notes for the specific user from their own notes collection
        const notesCollection = collection(db, 'users', userUid, 'notes'); 
        const notesSnapshot = await getDocs(notesCollection);
        
        // Map the documents to an array and set the state
        const notesList = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotes(notesList); // Set notes to display them
      } else {
        console.log("No user is signed in");
      }
    };

    fetchNotes();
  }, []);

  const [show, setShow] = useState(true)
  // Add a new note to Firestore

  const handleAddNote = async () => {
    if (newNote.trim() && uid) {
      // Add the note to the specific user's notes collection
      await addDoc(collection(db, 'users', uid, 'notes'), { text: newNote, uid: uid });
      setNewNote('');

      // Refresh notes after adding the new one
      const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes'));
      const notesList = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesList); // Update the notes with the newly added note
      setShow(false);
    }
  };

  // Delete a note from Firestore

  const handleDeleteNote = async (noteId) => {
    if (uid) {
      // Delete the note from the specific user's notes collection
      await deleteDoc(doc(db, 'users', uid, 'notes', noteId));
      setNotes(notes.filter(note => note.id !== noteId)); // Update state to remove the note
    }
    setShow(true)
  };
  //page 0 end

   //page 1 start
   const [notes1, setNotes1] = useState([]);
   const [newNote1, setNewNote1] = useState('');
 
   // Fetch notes from Firestore
   useEffect(() => {
     const fetchNotes = async () => {
       const notesCollection = collection(db, 'notes1');
       const notesSnapshot = await getDocs(notesCollection);
       const notesList = notesSnapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       }));
       setNotes1(notesList);
     };
 
     fetchNotes();
   }, [uid]);
 
   const [show1, setShow1] = useState(true)
   // Add a new note to Firestore
 
   const handleAddNote1 = async () => {
     if (newNote1.trim()) {
       await addDoc(collection(db, 'notes1'), { text: newNote1,uid: uid });
       setNewNote1('');
       // Refresh notes
       const notesSnapshot = await getDocs(collection(db, 'notes1'));
       const notesList = notesSnapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       }));
       setNotes1(notesList);
 
       setShow1(false)
     }
   };
 
   // Delete a note from Firestore
   const handleDeleteNote1 = async (id) => {
     await deleteDoc(doc(db, 'notes1', id));
     setNotes1(notes1.filter(note => note.id !== id));
     
     setShow1(true)
     
   };
   //page 1 end
 
    //page 2 start
    const [notes2, setNotes2] = useState([]);
    const [newNote2, setNewNote2] = useState('');
  
    // Fetch notes from Firestore
    useEffect(() => {
      const fetchNotes = async () => {
        const notesCollection = collection(db, 'notes2');
        const notesSnapshot = await getDocs(notesCollection);
        const notesList = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotes2(notesList);
      };
  
      fetchNotes();
    }, [uid]);
  
    const [show2, setShow2] = useState(true)
    // Add a new note to Firestore
  
    const handleAddNote2 = async () => {
      if (newNote2.trim()) {
        await addDoc(collection(db, 'notes2'), { text: newNote2,uid: uid });
        setNewNote2('');
        // Refresh notes
        const notesSnapshot = await getDocs(collection(db, 'notes2'));
        const notesList = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotes2(notesList);
  
        setShow2(false)
      }
    };
  
    // Delete a note from Firestore
    const handleDeleteNote2 = async (id) => {
      await deleteDoc(doc(db, 'notes2', id));
      setNotes2(notes2.filter(note => note.id !== id));
      
      setShow2(true)
      
    };
    //page 2 end

     //page 3 start
     const [notes3, setNotes3] = useState([]);
     const [newNote3, setNewNote3] = useState('');
   
     // Fetch notes from Firestore
     useEffect(() => {
       const fetchNotes = async () => {
         const notesCollection = collection(db, 'notes3');
         const notesSnapshot = await getDocs(notesCollection);
         const notesList = notesSnapshot.docs.map(doc => ({
           id: doc.id,
           ...doc.data()
         }));
         setNotes3(notesList);
       };
   
       fetchNotes();
     }, [uid]);
   
     const [show3, setShow3] = useState(true)
     // Add a new note to Firestore
   
     const handleAddNote3 = async () => {
       if (newNote3.trim()) {
         await addDoc(collection(db, 'notes3'), { text: newNote3,uid: uid });
         setNewNote3('');
         // Refresh notes
         const notesSnapshot = await getDocs(collection(db, 'notes3'));
         const notesList = notesSnapshot.docs.map(doc => ({
           id: doc.id,
           ...doc.data()
         }));
         setNotes3(notesList);
   
         setShow3(false)
       }
     };
   
     // Delete a note from Firestore
     const handleDeleteNote3 = async (id) => {
       await deleteDoc(doc(db, 'notes3', id));
       setNotes3(notes3.filter(note => note.id !== id));
       
       setShow3(true)
       
     };
     //page 3 end

      //page 4 start
      const [notes4, setNotes4] = useState([]);
      const [newNote4, setNewNote4] = useState('');
    
      // Fetch notes from Firestore
      useEffect(() => {
        const fetchNotes = async () => {
          const notesCollection = collection(db, 'notes4');
          const notesSnapshot = await getDocs(notesCollection);
          const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setNotes4(notesList);
        };
    
        fetchNotes();
      }, [uid]);
    
      const [show4, setShow4] = useState(true)
      // Add a new note to Firestore
    
      const handleAddNote4 = async () => {
        if (newNote4.trim()) {
          await addDoc(collection(db, 'notes4'), { text: newNote4,uid: uid });
          setNewNote4('');
          // Refresh notes
          const notesSnapshot = await getDocs(collection(db, 'notes4'));
          const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setNotes4(notesList);
    
          setShow4(false)
        }
      };
    
      // Delete a note from Firestore
      const handleDeleteNote4 = async (id) => {
        await deleteDoc(doc(db, 'notes4', id));
        setNotes4(notes4.filter(note => note.id !== id));
        
        setShow4(true)
        
      };
      //page 4 end

       //page 5 start
       const [notes5, setNotes5] = useState([]);
       const [newNote5, setNewNote5] = useState('');
     
       // Fetch notes from Firestore
       useEffect(() => {
         const fetchNotes = async () => {
           const notesCollection = collection(db, 'notes5');
           const notesSnapshot = await getDocs(notesCollection);
           const notesList = notesSnapshot.docs.map(doc => ({
             id: doc.id,
             ...doc.data()
           }));
           setNotes5(notesList);
         };
     
         fetchNotes();
       }, [uid]);
     
       const [show5, setShow5] = useState(true)
       // Add a new note to Firestore
     
       const handleAddNote5 = async () => {
         if (newNote5.trim()) {
           await addDoc(collection(db, 'notes5'), { text: newNote5,uid: uid });
           setNewNote5('');
           // Refresh notes
           const notesSnapshot = await getDocs(collection(db, 'notes5'));
           const notesList = notesSnapshot.docs.map(doc => ({
             id: doc.id,
             ...doc.data()
           }));
           setNotes5(notesList);
     
           setShow5(false)
         }
       };
     
       // Delete a note from Firestore
       const handleDeleteNote5 = async (id) => {
         await deleteDoc(doc(db, 'notes5', id));
         setNotes5(notes5.filter(note => note.id !== id));
         
         setShow5(true)
         
       };
       //page 5 end


       
       //page 6 start
       const [notes6, setNotes6] = useState([]);
       const [newNote6, setNewNote6] = useState('');
     
       // Fetch notes from Firestore
       useEffect(() => {
         const fetchNotes = async () => {
           const notesCollection = collection(db, 'notes6');
           const notesSnapshot = await getDocs(notesCollection);
           const notesList = notesSnapshot.docs.map(doc => ({
             id: doc.id,
             ...doc.data()
           }));
           setNotes6(notesList);
         };
     
         fetchNotes();
       }, [uid]);
     
       const [show6, setShow6] = useState(true)
       // Add a new note to Firestore
     
       const handleAddNote6 = async () => {
         if (newNote6.trim()) {
           await addDoc(collection(db, 'notes6'), { text: newNote6,uid: uid });
           setNewNote6('');
           // Refresh notes
           const notesSnapshot = await getDocs(collection(db, 'notes6'));
           const notesList = notesSnapshot.docs.map(doc => ({
             id: doc.id,
             ...doc.data()
           }));
           setNotes6(notesList);
     
           setShow6(false)
         }
       };
     
       // Delete a note from Firestore
       const handleDeleteNote6 = async (id) => {
         await deleteDoc(doc(db, 'notes6', id));
         setNotes6(notes6.filter(note => note.id !== id));
         
         setShow6(true)
         
       };
       //page 6 end


        //page 7 start
        const [notes7, setNotes7] = useState([]);
        const [newNote7, setNewNote7] = useState('');
      
        // Fetch notes from Firestore
        useEffect(() => {
          const fetchNotes = async () => {
            const notesCollection = collection(db, 'notes7');
            const notesSnapshot = await getDocs(notesCollection);
            const notesList = notesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setNotes7(notesList);
          };
      
          fetchNotes();
        }, [uid]);
      
        const [show7, setShow7] = useState(true)
        // Add a new note to Firestore
      
        const handleAddNote7 = async () => {
          if (newNote7.trim()) {
            await addDoc(collection(db, 'notes7'), { text: newNote7,uid: uid });
            setNewNote7('');
            // Refresh notes
            const notesSnapshot = await getDocs(collection(db, 'notes7'));
            const notesList = notesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setNotes7(notesList);
      
            setShow7(false)

            
          }
        };
      
        // Delete a note from Firestore
        const handleDeleteNote7 = async (id) => {
          await deleteDoc(doc(db, 'notes7', id));
          setNotes7(notes7.filter(note => note.id !== id));
          
          setShow7(true)
          
        };
        //page 7 end

         //page 8 start
         const [notes8, setNotes8] = useState([]);
         const [newNote8, setNewNote8] = useState('');
       
         // Fetch notes from Firestore
         useEffect(() => {
           const fetchNotes = async () => {
             const notesCollection = collection(db, 'notes8');
             const notesSnapshot = await getDocs(notesCollection);
             const notesList = notesSnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data()
             }));
             setNotes8(notesList);
           };
       
           fetchNotes();
         }, [uid]);
       
         const [show8, setShow8] = useState(true)
         // Add a new note to Firestore
       
         const handleAddNote8 = async () => {
           if (newNote8.trim()) {
             await addDoc(collection(db, 'notes8'), { text: newNote8,uid: uid });
             setNewNote8('');
             // Refresh notes
             const notesSnapshot = await getDocs(collection(db, 'notes8'));
             const notesList = notesSnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data()
             }));
             setNotes8(notesList);
       
             setShow8(false)
           }
         };
       
         // Delete a note from Firestore
         const handleDeleteNote8 = async (id) => {
           await deleteDoc(doc(db, 'notes8', id));
           setNotes8(notes8.filter(note => note.id !== id));
           
           setShow8(true)
           
         };
         //page 8 end
 

         //page 9 start
         const [notes9, setNotes9] = useState([]);
         const [newNote9, setNewNote9] = useState('');
       
         // Fetch notes from Firestore
         useEffect(() => {
           const fetchNotes = async () => {
             const notesCollection = collection(db, 'notes9');
             const notesSnapshot = await getDocs(notesCollection);
             const notesList = notesSnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data()
             }));
             setNotes9(notesList);
           };
       
           fetchNotes();
         }, [uid]);
       
         const [show9, setShow9] = useState(true)
         // Add a new note to Firestore
       
         const handleAddNote9 = async () => {
           if (newNote9.trim()) {
             await addDoc(collection(db, 'notes9'), { text: newNote9,uid: uid });
             setNewNote9('');
             // Refresh notes
             const notesSnapshot = await getDocs(collection(db, 'notes9'));
             const notesList = notesSnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data()
             }));
             setNotes9(notesList);
       
             setShow9(false)
           }
         };
       
         // Delete a note from Firestore
         const handleDeleteNote9 = async (id) => {
           await deleteDoc(doc(db, 'notes9', id));
           setNotes9(notes9.filter(note => note.id !== id));
           
           setShow9(true)
           
         };
         //page 9 end
 

          //page 10 start
          const [notes10, setNotes10] = useState([]);
          const [newNote10, setNewNote10] = useState('');
        
          // Fetch notes from Firestore
          useEffect(() => {
            const fetchNotes = async () => {
              const notesCollection = collection(db, 'notes10');
              const notesSnapshot = await getDocs(notesCollection);
              const notesList = notesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setNotes10(notesList);
            };
        
            fetchNotes();
          }, [uid]);
        
          const [show10, setShow10] = useState(true)
          // Add a new note to Firestore
        
          const handleAddNote10 = async () => {
            if (newNote10.trim()) {
              await addDoc(collection(db, 'notes10'), { text: newNote10,uid: uid });
              setNewNote10('');
              // Refresh notes
              const notesSnapshot = await getDocs(collection(db, 'notes10'));
              const notesList = notesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setNotes10(notesList);
        
              setShow10(false)
            }
          };
        
          // Delete a note from Firestore
          const handleDeleteNote10 = async (id) => {
            await deleteDoc(doc(db, 'notes10', id));
            setNotes10(notes10.filter(note => note.id !== id));
            
            setShow10(true)
            
          };
          //page 10 end
  

           //page 11 start
           const [notes11, setNotes11] = useState([]);
           const [newNote11, setNewNote11] = useState('');
         
           // Fetch notes from Firestore
           useEffect(() => {
             const fetchNotes = async () => {
               const notesCollection = collection(db, 'notes11');
               const notesSnapshot = await getDocs(notesCollection);
               const notesList = notesSnapshot.docs.map(doc => ({
                 id: doc.id,
                 ...doc.data()
               }));
               setNotes11(notesList);
             };
         
             fetchNotes();
           }, [uid]);
         
           const [show11, setShow11] = useState(true)
           // Add a new note to Firestore
         
           const handleAddNote11 = async () => {
             if (newNote11.trim()) {
               await addDoc(collection(db, 'notes11'), { text: newNote11,uid: uid });
               setNewNote11('');
               // Refresh notes
               const notesSnapshot = await getDocs(collection(db, 'notes11'));
               const notesList = notesSnapshot.docs.map(doc => ({
                 id: doc.id,
                 ...doc.data()
               }));
               setNotes11(notesList);
         
               setShow11(false)
             }
           };
         
           // Delete a note from Firestore
           const handleDeleteNote11 = async (id) => {
             await deleteDoc(doc(db, 'notes11', id));
             setNotes11(notes11.filter(note => note.id !== id));
             
             setShow11(true)
             
           };
           //page 11 end

            //page 12 start
            const [notes12, setNotes12] = useState([]);
            const [newNote12, setNewNote12] = useState('');
          
            // Fetch notes from Firestore
            useEffect(() => {
              const fetchNotes = async () => {
                const notesCollection = collection(db, 'notes12');
                const notesSnapshot = await getDocs(notesCollection);
                const notesList = notesSnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                }));
                setNotes12(notesList);
              };
          
              fetchNotes();
            }, [uid]);
          
            const [show12, setShow12] = useState(true)
            // Add a new note to Firestore
          
            const handleAddNote12 = async () => {
              if (newNote12.trim()) {
                await addDoc(collection(db, 'notes12'), { text: newNote12,uid: uid });
                setNewNote12('');
                // Refresh notes
                const notesSnapshot = await getDocs(collection(db, 'notes12'));
                const notesList = notesSnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                }));
                setNotes12(notesList);
          
                setShow12(false)
              }
            };
          
            // Delete a note from Firestore
            const handleDeleteNote12 = async (id) => {
              await deleteDoc(doc(db, 'notes12', id));
              setNotes12(notes12.filter(note => note.id !== id));
              
              setShow12(true)
              
            };
            //page 12 end
 

             //page 13 start
           const [notes13, setNotes13] = useState([]);
           const [newNote13, setNewNote13] = useState('');
         
           // Fetch notes from Firestore
           useEffect(() => {
             const fetchNotes = async () => {
               const notesCollection = collection(db, 'notes13');
               const notesSnapshot = await getDocs(notesCollection);
               const notesList = notesSnapshot.docs.map(doc => ({
                 id: doc.id,
                 ...doc.data()
               }));
               setNotes13(notesList);
             };
         
             fetchNotes();
           }, [uid]);
         
           const [show13, setShow13] = useState(true)
           // Add a new note to Firestore
         
           const handleAddNote13 = async () => {
             if (newNote13.trim()) {
               await addDoc(collection(db, 'notes13'), { text: newNote13,uid: uid });
               setNewNote13('');
               // Refresh notes
               const notesSnapshot = await getDocs(collection(db, 'notes13'));
               const notesList = notesSnapshot.docs.map(doc => ({
                 id: doc.id,
                 ...doc.data()
               }));
               setNotes13(notesList);
         
               setShow13(false)
             }
           };
         
           // Delete a note from Firestore
           const handleDeleteNote13 = async (id) => {
             await deleteDoc(doc(db, 'notes13', id));
             setNotes13(notes13.filter(note => note.id !== id));
             
             setShow13(true)
             
           };
           //page 13 end


//page 14 start
const [notes14, setNotes14] = useState([]);
const [newNote14, setNewNote14] = useState('');

// Fetch notes from Firestore
useEffect(() => {
  const fetchNotes = async () => {
    const notesCollection = collection(db, 'notes14');
    const notesSnapshot = await getDocs(notesCollection);
    const notesList = notesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotes14(notesList);
  };

  fetchNotes();
}, [uid]);

const [show14, setShow14] = useState(true)
// Add a new note to Firestore

const handleAddNote14 = async () => {
  if (newNote14.trim()) {
    await addDoc(collection(db, 'notes14'), { text: newNote14,uid: uid });
    setNewNote14('');
    // Refresh notes
    const notesSnapshot = await getDocs(collection(db, 'notes14'));
    const notesList = notesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotes14(notesList);

    setShow14(false)
  }
};

// Delete a note from Firestore
const handleDeleteNote14 = async (id) => {
  await deleteDoc(doc(db, 'notes14', id));
  setNotes14(notes14.filter(note => note.id !== id));
  
  setShow14(true)
  
};
//page 14 end


//page 15 start
const [notes15, setNotes15] = useState([]);
const [newNote15, setNewNote15] = useState('');

// Fetch notes from Firestore
useEffect(() => {
  const fetchNotes = async () => {
    const notesCollection = collection(db, 'notes15');
    const notesSnapshot = await getDocs(notesCollection);
    const notesList = notesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotes15(notesList);
  };

  fetchNotes();
}, [uid]);

const [show15, setShow15] = useState(true)
// Add a new note to Firestore

const handleAddNote15 = async () => {
  if (newNote15.trim()) {
    await addDoc(collection(db, 'notes15'), { text: newNote15,uid: uid });
    setNewNote15('');
    // Refresh notes
    const notesSnapshot = await getDocs(collection(db, 'notes15'));
    const notesList = notesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotes15(notesList);

    setShow15(false)
  }
};

// Delete a note from Firestore
const handleDeleteNote15 = async (id) => {
  await deleteDoc(doc(db, 'notes15', id));
  setNotes15(notes15.filter(note => note.id !== id));
  
  setShow15(true)
  
};
//page 15 end


const Next=async()=>{
       
 
  setShow20(false)
  setShow21(true)
}




  const [show20, setShow20] = useState(true)
  const [show21, setShow21] = useState(false)

function Back(){
  setShow20(true)
  setShow21(false)
}

  

  return (
    <div  className='bg'>
    
      {show21?<Display message = {notes.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}
        
        message1 = {notes1.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message2 = {notes2.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message3 = {notes3.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message4 = {notes4.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message5 = {notes5.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message6 = {notes6.map(note => (
          <div key={note.id}> Click my 
           " { note.text} " link</div>
        ))}

        message7 = {notes7.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message8 = {notes8.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message9 = {notes9.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message10 = {notes10.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message11 = {notes11.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message12 = {notes12.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message13 = {notes13.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message14 = {notes14.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

        message15 = {notes15.map(note => (
          <div key={note.id}>
            {note.text}</div>
        ))}

         />:null}

{show20? <div>
        

    <div className='unit'>
      <h1>Display name</h1>
      <div>
        <input
         maxlength="30"
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="write username"
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

      
    <div className='unit' >
      <h1>About</h1>
      <div>
        <textarea
          className='firstname'
          type="text"
          value={newNote1}
          onChange={(e) => setNewNote1(e.target.value)}
          placeholder="write about you"
          maxlength="170"
          contentEditable="true"
        />
       {show1? <button className='birthadd' onClick={handleAddNote1}>Add</button> :null}
      </div>
      <div className='output'>
        {notes1.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote1(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>

    <div className='unit'>
      <h1>birthday</h1>
      <div>
        <input
         maxlength="25"
          type="text"
          value={newNote2}
          onChange={(e) => setNewNote2(e.target.value)}
          placeholder="e.g 24th february"
        />
       {show2? <button onClick={handleAddNote2}>Add</button> :null}
      </div>
      <div className='output'>
        {notes2.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote2(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
      
    <div className='unit'>
      <h1>Interest in? 1</h1>
      <div>
        <input
         maxlength="25"
          type="text"
          value={newNote3}
          onChange={(e) => setNewNote3(e.target.value)}
          placeholder="one of your interests"
        />
       {show3? <button onClick={handleAddNote3}>Add</button> :null}
      </div>
      <div className='output'>
        {notes3.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote3(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>Interest in? 2</h1>
      <div>
        <input
         maxlength="25"
          type="text"
          value={newNote4}
          onChange={(e) => setNewNote4(e.target.value)}
          placeholder="one of your interests"
        />
       {show4? <button onClick={handleAddNote4}>Add</button> :null}
      </div>
      <div className='output'>
        {notes4.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote4(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>Interest in? 3</h1>
      <div>
        <input
         maxlength="25"
          type="text"
          value={newNote5}
          onChange={(e) => setNewNote5(e.target.value)}
          placeholder="one of your interests"
        />
       {show5? <button onClick={handleAddNote5}>Add</button> :null}
      </div>
      <div className='output'>
        {notes5.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote5(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>Link title</h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote6}
          onChange={(e) => setNewNote6(e.target.value)}
          placeholder="one of your interests"
        />
       {show6? <button onClick={handleAddNote6}>Add</button> :null}
      </div>
      <div className='output'>
        {notes6.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote6(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>Paste link</h1>
      <div>
        <input
          type="text"
          value={newNote7}
          onChange={(e) => setNewNote7(e.target.value)}
          placeholder="one of your interests"
        />
       {show7? <button onClick={handleAddNote7}>Add</button> :null}
      </div>
      <div className='output'>
        {notes7.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote7(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>App name(e.g instagram) 1</h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote8}
          onChange={(e) => setNewNote8(e.target.value)}
          placeholder="one of your interests"
        />
       {show8? <button onClick={handleAddNote8}>Add</button> :null}
      </div>
      <div className='output'>
        {notes8.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote8(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>link to account 1</h1>
      <div>
        <input
          type="text"
          value={newNote9}
          onChange={(e) => setNewNote9(e.target.value)}
          placeholder="one of your interests"
        />
       {show9? <button onClick={handleAddNote9}>Add</button> :null}
      </div>
      <div className='output'>
        {notes9.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote9(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  

    <div className='unit'>
      <h1>App name(e.g twitter) 2</h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote10}
          onChange={(e) => setNewNote10(e.target.value)}
          placeholder="one of your interests"
        />
       {show10? <button onClick={handleAddNote10}>Add</button> :null}
      </div>
      <div className='output'>
        {notes10.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote10(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>link to account 2</h1>
      <div>
        <input
          type="text"
          value={newNote11}
          onChange={(e) => setNewNote11(e.target.value)}
          placeholder="one of your interests"
        />
       {show11? <button onClick={handleAddNote11}>Add</button> :null}
      </div>
      <div className='output'>
        {notes11.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote11(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  

    <div className='unit'>
      <h1>App name(e.g linkedin) 3</h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote12}
          onChange={(e) => setNewNote12(e.target.value)}
          placeholder="one of your interests"
        />
       {show12? <button onClick={handleAddNote12}>Add</button> :null}
      </div>
      <div className='output'>
        {notes12.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote12(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>link to account 3</h1>
      <div>
        <input
          type="text"
          value={newNote13}
          onChange={(e) => setNewNote13(e.target.value)}
          placeholder="one of your interests"
        />
       {show13? <button onClick={handleAddNote13}>Add</button> :null}
      </div>
      <div className='output'>
        {notes13.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote13(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>

    <div className='unit'>
      <h1>App name(e.g behance) </h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote14}
          onChange={(e) => setNewNote14(e.target.value)}
          placeholder="one of your interests"
        />
       {show14? <button onClick={handleAddNote14}>Add</button> :null}
      </div>
      <div className='output'>
        {notes14.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote14(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1>link to account 4</h1>
      <div>
        <input
          type="text"
          value={newNote15}
          onChange={(e) => setNewNote15(e.target.value)}
          placeholder="one of your interests"
        />
       {show15? <button onClick={handleAddNote15}>Add</button> :null}
      </div>
      <div className='output'>
        {notes15.map(note => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote15(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  

    <div className='nextnest'><button className='next' onClick={Next}>Next</button></div> 

</div>:null}

      
     {show21? <button className='backbtn' onClick={Back}>back</button>:null}
    </div>
    
  );
};

export default Notes;
