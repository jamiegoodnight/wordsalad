import React, {useState, useEffect} from 'react';
import firebase from "firebase/app";
import fire from '../fire'

const Word = ({w, fetchWords}) => {
    const [definition, setDefinition] = useState(w.definition)
    const [defining, setDefining] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [display, setDisplay] = useState(true)
    const updateWord = () => { 
        const db=fire.firestore() 
        db.collection('words').doc(w.id).set({... w, definition})
        .then(result => {
            fetchWords()
        })
        setDefining(false)
      }
    const deleteWord = () => {
        setDeleting(!deleting)
        if(deleting === true){
            const db=fire.firestore() 
            db.collection('words').doc(w.id).delete()
            .then(result => {
                setDisplay(false)
                fetchWords()
            })
        } 
    }
    return(
        <>
        <div className={display === true ? "Word" : "no-display"}>
          <h2>{w.word}</h2>
          {defining === true ? (
              <textarea id="writingDefinition" value={definition} onChange={(e) => {
                  setDefinition(e.target.value)
              }} />
          ) : (
            <p>{w.definition}</p>
          )}
          <div className="Icons">
              {defining === true ? (
                <i class="fas fa-check" onClick={(e) => updateWord()}></i>
               ) : ( 
                <i class="fas fa-edit" onClick={(e) => setDefining(true)}></i>
               )}
            <i class={deleting === false ? "fas fa-trash" : "fas fa-trash warning"} onClick={(e) => deleteWord()}></i>
          </div>  
        </div>
        </>
    )
}

export default Word