
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Display from './display';
import { useNavigate, useParams } from "react-router-dom";
import './profilerpage.css';
import { 
  onAuthStateChanged, 
  setPersistence, 
  browserLocalPersistence, 
  signInAnonymously 
} from 'firebase/auth';
import { VisibilityContext } from './VisibilityContext';


const Notes = () => {

  const { isComponentVisible } = useContext(VisibilityContext);

  setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("anon ti wole")

    return signInAnonymously(auth);
   
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });
  
  const { uid } = useParams()

  //page 0 start
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [user, setUser]= useState(null)
  const [loading, setLoading] = useState(true);
  const [empty6, setEmpty6] = useState(true);
  const [empty8, setEmpty8] = useState(true);
  const [empty10, setEmpty10] = useState(true);
  const [empty12, setEmpty12] = useState(true);
  const [empty14, setEmpty14] = useState(true);


  // Fetch notes from Firestore
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const notesCollection = collection(db, 'users', uid, 'notes');
        setLoading(true);
  try {
          const notesSnapshot = await getDocs(notesCollection);
          const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotes(notesList);
          console.log(uid)
        } catch (error) {
          console.error('Error fetching notes:', error);
        } 
        finally {
          setLoading(false); // Stop loading after fetching is done
        }
      } else {
        console.log("No user is signed in");
        setNotes([]); 
        setLoading(false)
      }
    });
    return () => unsubscribeAuth();
  }, []); 
  

  const [show, setShow] = useState(true)

  // Add a new note to Firestore
  const handleAddNote = async () => {
    if (newNote.trim() && uid) {
      await addDoc(collection(db, 'users', uid, 'notes'), { text: newNote, uid: uid });
      setNewNote('');

      const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes'));
      const notesList = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesList);
      setShow(false);
    }
  };
    

  const handleDeleteNote = async (noteId) => {
    if (uid) {
      await deleteDoc(doc(db, 'users', uid, 'notes', noteId));
      setNotes(notes.filter(note => note.id !== noteId)); 
    }
    setShow(true)
  };
  //page 0 end

   //page 1 start
   const [notes1, setNotes1] = useState([]);
   const [newNote1, setNewNote1] = useState('');
 
   // Fetch notes from Firestore
   useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const notesCollection = collection(db, 'users', uid, 'notes1');
  try {
          const notesSnapshot = await getDocs(notesCollection);
          const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotes1(notesList);
        } catch (error) {
          console.error('Error fetching notes:', error);
        } 
      } else {
        console.log("No user is signed in");
        setNotes1([]); 
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const [show1, setShow1] = useState(true)

  // Add a new note to Firestore
  const handleAddNote1 = async () => {
    if (newNote1.trim() && uid) {
      await addDoc(collection(db, 'users', uid, 'notes1'), { text: newNote1, uid: uid });
      setNewNote1('');

      const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes1'));
      const notesList = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes1(notesList);
      setShow1(false);
    }
  };
    

  const handleDeleteNote1 = async (noteId) => {
    if (uid) {
      await deleteDoc(doc(db, 'users', uid, 'notes1', noteId));
      setNotes1(notes1.filter(note => note.id !== noteId)); 
    }
    setShow1(true)
  };
   //page 1 end
 
    //page 2 start
    const [notes2, setNotes2] = useState([]);
    const [newNote2, setNewNote2] = useState('');
  
    // Fetch notes from Firestore
    useEffect(() => {
      const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
      const notesCollection = collection(db, 'users', uid, 'notes2');
    try {
            const notesSnapshot = await getDocs(notesCollection);
            const notesList = notesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotes2(notesList);
          } catch (error) {
            console.error('Error fetching notes:', error);
          } 
        } else {
          console.log("No user is signed in");
          setNotes2([]); 
        }
      });
      return () => unsubscribeAuth();
    }, []);
  
    const [show2, setShow2] = useState(true)
  
    // Add a new note to Firestore
    const handleAddNote2 = async () => {
      if (newNote2.trim() && uid) {
        await addDoc(collection(db, 'users', uid, 'notes2'), { text: newNote2, uid: uid });
        setNewNote2('');
  
        const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes2'));
        const notesList = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes2(notesList);
        setShow2(false);
      }
    };
      
  
    const handleDeleteNote2 = async (noteId) => {
      if (uid) {
        await deleteDoc(doc(db, 'users', uid, 'notes2', noteId));
        setNotes2(notes2.filter(note => note.id !== noteId)); 
      }
      setShow2(true)
    };
    //page 2 end

     //page 3 start
     const [notes3, setNotes3] = useState([]);
     const [newNote3, setNewNote3] = useState('');
   
     // Fetch notes from Firestore
     useEffect(() => {
      const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const notesCollection = collection(db, 'users', uid, 'notes3');
    try {
            const notesSnapshot = await getDocs(notesCollection);
            const notesList = notesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotes3(notesList);
          } catch (error) {
            console.error('Error fetching notes:', error);
          } 
        } else {
          console.log("No user is signed in");
          setNotes3([]); 
        }
      });
      return () => unsubscribeAuth();
    }, []);
  
    const [show3, setShow3] = useState(true)
  
    // Add a new note to Firestore
    const handleAddNote3 = async () => {
      if (newNote3.trim() && uid) {
        await addDoc(collection(db, 'users', uid, 'notes3'), { text: newNote3, uid: uid });
        setNewNote3('');
  
        const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes3'));
        const notesList = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes3(notesList);
        setShow3(false);
      }
    };
      
  
    const handleDeleteNote3 = async (noteId) => {
      if (uid) {
        await deleteDoc(doc(db, 'users', uid, 'notes3', noteId));
        setNotes3(notes3.filter(note => note.id !== noteId)); 
      }
      setShow3(true)
    };
     //page 3 end

      //page 4 start
      const [notes4, setNotes4] = useState([]);
      const [newNote4, setNewNote4] = useState('');
    
      // Fetch notes from Firestore
      useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const notesCollection = collection(db, 'users', uid, 'notes4');
      try {
              const notesSnapshot = await getDocs(notesCollection);
              const notesList = notesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotes4(notesList);
            } catch (error) {
              console.error('Error fetching notes:', error);
            } 
          } else {
            console.log("No user is signed in");
            setNotes4([]); 
          }
        });
        return () => unsubscribeAuth();
      }, []);
    
      const [show4, setShow4] = useState(true)
    
      // Add a new note to Firestore
      const handleAddNote4 = async () => {
        if (newNote4.trim() && uid) {
          await addDoc(collection(db, 'users', uid, 'notes4'), { text: newNote4, uid: uid });
          setNewNote4('');
    
          const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes4'));
          const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotes4(notesList);
          setShow4(false);
        }
      };
        
    
      const handleDeleteNote4 = async (noteId) => {
        if (uid) {
          await deleteDoc(doc(db, 'users', uid, 'notes4', noteId));
          setNotes4(notes4.filter(note => note.id !== noteId)); 
        }
        setShow4(true)
      };
      //page 4 end

       //page 5 start
       const [notes5, setNotes5] = useState([]);
       const [newNote5, setNewNote5] = useState('');
     
       // Fetch notes from Firestore
       useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const notesCollection = collection(db, 'users', uid, 'notes5');
      try {
              const notesSnapshot = await getDocs(notesCollection);
              const notesList = notesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotes5(notesList);
            } catch (error) {
              console.error('Error fetching notes:', error);
            } 
          } else {
            console.log("No user is signed in");
            setNotes5([]); 
          }
        });
        return () => unsubscribeAuth();
      }, []);
    
      const [show5, setShow5] = useState(true)
    
      // Add a new note to Firestore
      const handleAddNote5 = async () => {
        if (newNote5.trim() && uid) {
          await addDoc(collection(db, 'users', uid, 'notes5'), { text: newNote5, uid: uid });
          setNewNote1('');
    
          const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes5'));
          const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotes5(notesList);
          setShow5(false);
        }
      };
        
    
      const handleDeleteNote5 = async (noteId) => {
        if (uid) {
          await deleteDoc(doc(db, 'users', uid, 'notes5', noteId));
          setNotes5(notes5.filter(note => note.id !== noteId)); 
        }
        setShow5(true)
      };
       //page 5 end


       
       //page 6 start
       const [notes6, setNotes6] = useState([]);
       const [newNote6, setNewNote6] = useState('');
     
       // Fetch notes from Firestore
       useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const notesCollection = collection(db, 'users', uid, 'notes6');
      try {
              const notesSnapshot = await getDocs(notesCollection);
              const notesList = notesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotes6(notesList);
            } catch (error) {
              console.error('Error fetching notes:', error);
            } 
            finally {
              setEmpty6(false); // Stop loading after fetching is done
            }
          } else {
            console.log("No user is signed in");
            setNotes6([]);
            setEmpty6(false) 
          }
        });
        return () => unsubscribeAuth();
      }, []);
    
      const [show6, setShow6] = useState(true)
    
      // Add a new note to Firestore
      const handleAddNote6 = async () => {
        if (newNote6.trim() && uid) {
          await addDoc(collection(db, 'users', uid, 'notes6'), { text: newNote6, uid: uid });
          setNewNote6('');
    
          const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes6'));
          const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotes6(notesList);
          setShow6(false);
        }
      };
        
    
      const handleDeleteNote6 = async (noteId) => {
        if (uid) {
          await deleteDoc(doc(db, 'users', uid, 'notes6', noteId));
          setNotes6(notes6.filter(note => note.id !== noteId)); 
        }
        setShow6(true)
      };
       //page 6 end


        //page 7 start
        const [notes7, setNotes7] = useState([]);
        const [newNote7, setNewNote7] = useState('');
      
        // Fetch notes from Firestore
        useEffect(() => {
          const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
              const notesCollection = collection(db, 'users', uid, 'notes7');
        try {
                const notesSnapshot = await getDocs(notesCollection);
                const notesList = notesSnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                setNotes7(notesList);
              } catch (error) {
                console.error('Error fetching notes:', error);
              } 
             
            } else {
              console.log("No user is signed in");
              setNotes7([]); 
             
            }
          });
          return () => unsubscribeAuth();
        }, []);
      
        const [show7, setShow7] = useState(true)
      
        // Add a new note to Firestore
        const handleAddNote7 = async () => {
          if (newNote7.trim() && uid) {
            await addDoc(collection(db, 'users', uid, 'notes7'), { text: newNote7, uid: uid });
            setNewNote7('');
      
            const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes7'));
            const notesList = notesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotes7(notesList);
            setShow7(false);
          }
        };
          
      
        const handleDeleteNote7 = async (noteId) => {
          if (uid) {
            await deleteDoc(doc(db, 'users', uid, 'notes7', noteId));
            setNotes7(notes7.filter(note => note.id !== noteId)); 
          }
          setShow7(true)
        };
        //page 7 end

         //page 8 start
         const [notes8, setNotes8] = useState([]);
         const [newNote8, setNewNote8] = useState('');
       
         // Fetch notes from Firestore
         useEffect(() => {
          const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
              const notesCollection = collection(db, 'users', uid, 'notes8');
        try {
                const notesSnapshot = await getDocs(notesCollection);
                const notesList = notesSnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                setNotes8(notesList);
              } catch (error) {
                console.error('Error fetching notes:', error);
              } 
              finally {
                setEmpty8(false); // Stop loading after fetching is done
              }
            } else {
              console.log("No user is signed in");
              setNotes8([]); 
              setEmpty8(false)
            }
          });
          return () => unsubscribeAuth();
        }, []);
      
        const [show8, setShow8] = useState(true)
      
        // Add a new note to Firestore
        const handleAddNote8 = async () => {
          if (newNote8.trim() && uid) {
            await addDoc(collection(db, 'users', uid, 'notes8'), { text: newNote8, uid: uid });
            setNewNote8('');
      
            const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes8'));
            const notesList = notesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotes8(notesList);
            setShow8(false);
          }
        };
          
      
        const handleDeleteNote8 = async (noteId) => {
          if (uid) {
            await deleteDoc(doc(db, 'users', uid, 'notes8', noteId));
            setNotes8(notes8.filter(note => note.id !== noteId)); 
          }
          setShow8(true)
        };
         //page 8 end
 

         //page 9 start
         const [notes9, setNotes9] = useState([]);
         const [newNote9, setNewNote9] = useState('');
       
         // Fetch notes from Firestore
         useEffect(() => {
          const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
              const notesCollection = collection(db, 'users', uid, 'notes9');
        try {
                const notesSnapshot = await getDocs(notesCollection);
                const notesList = notesSnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                setNotes9(notesList);
              } catch (error) {
                console.error('Error fetching notes:', error);
              } 
            } else {
              console.log("No user is signed in");
              setNotes9([]); 
            }
          });
          return () => unsubscribeAuth();
        }, []);
      
        const [show9, setShow9] = useState(true)
      
        // Add a new note to Firestore
        const handleAddNote9 = async () => {
          if (newNote9.trim() && uid) {
            await addDoc(collection(db, 'users', uid, 'notes9'), { text: newNote9, uid: uid });
            setNewNote1('');
      
            const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes9'));
            const notesList = notesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotes9(notesList);
            setShow9(false);
          }
        };
          
      
        const handleDeleteNote9 = async (noteId) => {
          if (uid) {
            await deleteDoc(doc(db, 'users', uid, 'notes9', noteId));
            setNotes9(notes9.filter(note => note.id !== noteId)); 
          }
          setShow9(true)
        };
         //page 9 end
 

          //page 10 start
          const [notes10, setNotes10] = useState([]);
          const [newNote10, setNewNote10] = useState('');
        
          // Fetch notes from Firestore
          useEffect(() => {
            const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
              if (user) {
                const notesCollection = collection(db, 'users', uid, 'notes10');
          try {
                  const notesSnapshot = await getDocs(notesCollection);
                  const notesList = notesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
                  setNotes10(notesList);
                } catch (error) {
                  console.error('Error fetching notes:', error);
                } 
                finally {
                  setEmpty10(false); // Stop loading after fetching is done
                }
              } else {
                console.log("No user is signed in");
                setNotes10([]); 
                setEmpty10(false)
              }
            });
            return () => unsubscribeAuth();
          }, []);
        
          const [show10, setShow10] = useState(true)
        
          // Add a new note to Firestore
          const handleAddNote10 = async () => {
            if (newNote10.trim() && uid) {
              await addDoc(collection(db, 'users', uid, 'notes10'), { text: newNote10, uid: uid });
              setNewNote10('');
        
              const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes10'));
              const notesList = notesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotes10(notesList);
              setShow10(false);
            }
          };
            
        
          const handleDeleteNote10 = async (noteId) => {
            if (uid) {
              await deleteDoc(doc(db, 'users', uid, 'notes10', noteId));
              setNotes10(notes10.filter(note => note.id !== noteId)); 
            }
            setShow10(true)
          };
          //page 10 end
  

           //page 11 start
           const [notes11, setNotes11] = useState([]);
           const [newNote11, setNewNote11] = useState('');
         
           // Fetch notes from Firestore
           useEffect(() => {
            const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
              if (user) {
                const notesCollection = collection(db, 'users', uid, 'notes11');
          try {
                  const notesSnapshot = await getDocs(notesCollection);
                  const notesList = notesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
                  setNotes11(notesList);
                } catch (error) {
                  console.error('Error fetching notes:', error);
                } 
              } else {
                console.log("No user is signed in");
                setNotes11([]); 
              }
            });
            return () => unsubscribeAuth();
          }, []);
        
          const [show11, setShow11] = useState(true)
        
          // Add a new note to Firestore
          const handleAddNote11 = async () => {
            if (newNote11.trim() && uid) {
              await addDoc(collection(db, 'users', uid, 'notes11'), { text: newNote11, uid: uid });
              setNewNote1('');
        
              const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes11'));
              const notesList = notesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotes11(notesList);
              setShow11(false);
            }
          };
            
        
          const handleDeleteNote11 = async (noteId) => {
            if (uid) {
              await deleteDoc(doc(db, 'users', uid, 'notes11', noteId));
              setNotes11(notes11.filter(note => note.id !== noteId)); 
            }
            setShow11(true)
          };
           //page 11 end

            //page 12 start
            const [notes12, setNotes12] = useState([]);
            const [newNote12, setNewNote12] = useState('');
          
            // Fetch notes from Firestore
            useEffect(() => {
              const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
                if (user) {
                  const notesCollection = collection(db, 'users', uid, 'notes12');
            try {
                    const notesSnapshot = await getDocs(notesCollection);
                    const notesList = notesSnapshot.docs.map(doc => ({
                      id: doc.id,
                      ...doc.data(),
                    }));
                    setNotes12(notesList);
                  } catch (error) {
                    console.error('Error fetching notes:', error);
                  } 
                  finally {
                    setEmpty12(false); // Stop loading after fetching is done
                  }
                } else {
                  console.log("No user is signed in");
                  setNotes12([]); 
                  setEmpty12(false)
                }
              });
              return () => unsubscribeAuth();
            }, []);
          
            const [show12, setShow12] = useState(true)
          
            // Add a new note to Firestore
            const handleAddNote12 = async () => {
              if (newNote12.trim() && uid) {
                await addDoc(collection(db, 'users', uid, 'notes12'), { text: newNote12, uid: uid });
                setNewNote12('');
          
                const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes12'));
                const notesList = notesSnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                setNotes12(notesList);
                setShow12(false);
              }
            };
              
          
            const handleDeleteNote12 = async (noteId) => {
              if (uid) {
                await deleteDoc(doc(db, 'users', uid, 'notes12', noteId));
                setNotes12(notes12.filter(note => note.id !== noteId)); 
              }
              setShow12(true)
            };
            //page 12 end
 

             //page 13 start
           const [notes13, setNotes13] = useState([]);
           const [newNote13, setNewNote13] = useState('');
         
           // Fetch notes from Firestore
           useEffect(() => {
            const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
              if (user) {
                const notesCollection = collection(db, 'users', uid, 'notes13');
          try {
                  const notesSnapshot = await getDocs(notesCollection);
                  const notesList = notesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
                  setNotes13(notesList);
                } catch (error) {
                  console.error('Error fetching notes:', error);
                } 
              } else {
                console.log("No user is signed in");
                setNotes13([]); 
              }
            });
            return () => unsubscribeAuth();
          }, []);
        
          const [show13, setShow13] = useState(true)
        
          // Add a new note to Firestore
          const handleAddNote13 = async () => {
            if (newNote13.trim() && uid) {
              await addDoc(collection(db, 'users', uid, 'notes13'), { text: newNote13, uid: uid });
              setNewNote13('');
        
              const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes13'));
              const notesList = notesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotes13(notesList);
              setShow13(false);
            }
          };
            
        
          const handleDeleteNote13 = async (noteId) => {
            if (uid) {
              await deleteDoc(doc(db, 'users', uid, 'notes13', noteId));
              setNotes13(notes13.filter(note => note.id !== noteId)); 
            }
            setShow13(true)
          };
           //page 13 end


//page 14 start
const [notes14, setNotes14] = useState([]);
const [newNote14, setNewNote14] = useState('');

// Fetch notes from Firestore
useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const notesCollection = collection(db, 'users', uid, 'notes14');
try {
        const notesSnapshot = await getDocs(notesCollection);
        const notesList = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes14(notesList);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } 
      finally {
        setEmpty14(false); // Stop loading after fetching is done
      }
    } else {
      console.log("No user is signed in");
      setNotes14([]); 
      setEmpty14(false)
    }
  });
  return () => unsubscribeAuth();
}, []);

const [show14, setShow14] = useState(true)

// Add a new note to Firestore
const handleAddNote14 = async () => {
  if (newNote14.trim() && uid) {
    await addDoc(collection(db, 'users', uid, 'notes14'), { text: newNote14, uid: uid });
    setNewNote14('');

    const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes14'));
    const notesList = notesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNotes14(notesList);
    setShow14(false);
  }
};
  

const handleDeleteNote14 = async (noteId) => {
  if (uid) {
    await deleteDoc(doc(db, 'users', uid, 'notes14', noteId));
    setNotes14(notes14.filter(note => note.id !== noteId)); 
  }
  setShow14(true)
};
//page 14 end


//page 15 start
const [notes15, setNotes15] = useState([]);
const [newNote15, setNewNote15] = useState('');

// Fetch notes from Firestore
useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const notesCollection = collection(db, 'users', uid, 'notes15');
try {
        const notesSnapshot = await getDocs(notesCollection);
        const notesList = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes15(notesList);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } 
    } else {
      console.log("No user is signed in");
      setNotes15([]); 
    }
  });
  return () => unsubscribeAuth();
}, []);

const [show15, setShow15] = useState(true)

// Add a new note to Firestore
const handleAddNote15 = async () => {
  if (newNote15.trim() && uid) {
    await addDoc(collection(db, 'users', uid, 'notes15'), { text: newNote15, uid: uid });
    setNewNote15('');

    const notesSnapshot = await getDocs(collection(db, 'users', uid, 'notes15'));
    const notesList = notesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNotes15(notesList);
    setShow15(false);
  }
};
  

const handleDeleteNote15 = async (noteId) => {
  if (uid) {
    await deleteDoc(doc(db, 'users', uid, 'notes15', noteId));
    setNotes15(notes15.filter(note => note.id !== noteId)); 
  }
  setShow15(true)
};
//page 15 end


const Next=async()=>{

  setShow20(true)
  setShow21(false)
}

  const [show20, setShow20] = useState(true)
  const [show21, setShow21] = useState(false)

const Edit=async()=>{
  setShow20(false)
  setShow21(true)
}
const [see20, setSee20] = useState(true)
const hideEdit=async()=>{
 
  setSee20(false)
}



  return (
    <div  className='bg'>
    
      {show20?<Display
      
      loadings = {loading}
      empty6s = {empty6}  empty8s = {empty8}
      empty10s = {empty10}  empty12s = {empty12}
      empty14s = {empty14}

      message = {notes.map(note => (
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

{show21? <div>
        

    <div className='unit'>
      <h1 className='hp1'>Display name</h1>
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
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>

      
    <div className='unit' >
      <h1 className='hp1'>About</h1>
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
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote1(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>

    <div className='unit'>
      <h1 className='hp1'>Birthday</h1>
      <div>
        <input
         maxlength="30"
          type="text"
          value={newNote2}
          onChange={(e) => setNewNote2(e.target.value)}
          placeholder="e.g 24th february"
        />
       {show2? <button onClick={handleAddNote2}>Add</button> :null}
      </div>
      <div className='output'>
        {notes2.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote2(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
      
    <div className='unit'>
      <h1 className='hp1'>Interested in? 1</h1>
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
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote3(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>Interested in? 2</h1>
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
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote4(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>Interested in? 3</h1>
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
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote5(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>Link title</h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote6}
          onChange={(e) => setNewNote6(e.target.value)}
          placeholder="e.g 'portfolio'"
        />
       {show6? <button onClick={handleAddNote6}>Add</button> :null}
      </div>
      <div className='output'>
        {notes6.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote6(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>Paste link</h1>
      <div>
        <input
          type="text"
          value={newNote7}
          onChange={(e) => setNewNote7(e.target.value)}
          placeholder="https://example.com"
        />
       {show7? <button onClick={handleAddNote7}>Add</button> :null}
      </div>
      <div className='output'>
        {notes7.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote7(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>App name 1(e.g facebook)</h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote8}
          onChange={(e) => setNewNote8(e.target.value)}
          placeholder="Instagram"
        />
       {show8? <button onClick={handleAddNote8}>Add</button> :null}
      </div>
      <div className='output'>
        {notes8.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote8(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>link to account 1</h1>
      <div>
        <input
          type="text"
          value={newNote9}
          onChange={(e) => setNewNote9(e.target.value)}
          placeholder="https://example.com"
        />
       {show9? <button onClick={handleAddNote9}>Add</button> :null}
      </div>
      <div className='output'>
        {notes9.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote9(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  

    <div className='unit'>
      <h1 className='hp1'>App name 2(e.g twitter)</h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote10}
          onChange={(e) => setNewNote10(e.target.value)}
          placeholder="twitter"
        />
       {show10? <button onClick={handleAddNote10}>Add</button> :null}
      </div>
      <div className='output'>
        {notes10.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote10(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>link to account 2</h1>
      <div>
        <input
          type="text"
          value={newNote11}
          onChange={(e) => setNewNote11(e.target.value)}
          placeholder="https://example.com"
        />
       {show11? <button onClick={handleAddNote11}>Add</button> :null}
      </div>
      <div className='output'>
        {notes11.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote11(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  

    <div className='unit'>
      <h1 className='hp1'>App name 3(e.g linkedin)</h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote12}
          onChange={(e) => setNewNote12(e.target.value)}
          placeholder="LinkedIn"
        />
       {show12? <button onClick={handleAddNote12}>Add</button> :null}
      </div>
      <div className='output'>
        {notes12.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote12(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>link to account 3</h1>
      <div>
        <input
          type="text"
          value={newNote13}
          onChange={(e) => setNewNote13(e.target.value)}
          placeholder="https://example.com"
        />
       {show13? <button onClick={handleAddNote13}>Add</button> :null}
      </div>
      <div className='output'>
        {notes13.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote13(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>

    <div className='unit'>
      <h1 className='hp1'>App name 4(e.g behance) </h1>
      <div>
        <input
         maxlength="20"
          type="text"
          value={newNote14}
          onChange={(e) => setNewNote14(e.target.value)}
          placeholder="behance"
        />
       {show14? <button onClick={handleAddNote14}>Add</button> :null}
      </div>
      <div className='output'>
        {notes14.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote14(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>


    <div className='unit'>
      <h1 className='hp1'>link to account 4</h1>
      <div>
        <input
          type="text"
          value={newNote15}
          onChange={(e) => setNewNote15(e.target.value)}
          placeholder="https://example.com"
        />
       {show15? <button onClick={handleAddNote15}>Add</button> :null}
      </div>
      <div className='output'>
        {notes15.map(note => (
          <div className='notep' key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote15(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  

    

</div>:null}

              
     {show21?   <div className='nextnest'><button className='next' onClick={() => { Next(); }}>Next</button></div>  :null}   
 
    
     {isComponentVisible && <button className='backbtn' onClick={Edit}>
          Edit
        </button>}
      
    
    </div>
    
  );
};

export default Notes;
