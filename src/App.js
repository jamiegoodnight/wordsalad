import './App.css';
import React, {useState, useEffect} from 'react';
import firebase from "firebase/app";
import fire from './fire'
import "firebase/auth";

const App = () => {
  const [user, setUser] = useState('')
  const [newDefinition, useNewDefinition] = useState('')
  const [newWord, setNewWord] = useState('')
  const [dictionary, setDictionary] = useState([])
  const [myDictionary, setMyDictionary] = useState([])
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = fire.firestore();
  const signIn = () => {
    console.log("HI")
    console.log("FIRE ->", fire)
    fire.auth().signInWithPopup(provider).then(function(result){
      // console.log("This is my result", result.credential.idToken)
      console.log(result.additionalUserInfo.profile.id)
      console.log(result)
      setUser(result.additionalUserInfo.profile.id)
    }).then(function(e){
      const fetchData = async () => { 
        const data = await db.collection('words').get()
        setDictionary(data.docs.map(doc => doc.data()))
      }
      fetchData()
    }).then(function(e){
      dictionary.map(w => {
        console.log("My w", w)
      })
      setMyDictionary(dictionary.filter(w => w.userId===user ))
      console.log("Here is my Dictionary", myDictionary)
    })
  }
  const addWord = () => {
    let words = db.collection('words')
    words.add({
      userId: user,
      word: newWord,
      definition: newDefinition
    })
  }
  const updateWord = () => {
    const db=firebase.firestore() 
    db.collection('words').doc(word.definition).set({... word, definition})
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={`https://i.imgur.com/7BZH2xx.png`} className="App-logo" alt="logo" />
        <div className="Header-input">
         {/* <input type="text" name="username"></input>
         <input type="password" name="password"></input> */}
         <div className="Button Sign-in" onClick={(e) =>signIn()}>SIGN IN WITH GOOGLE</div>
        </div>
      </header>
      <div className="Dictionary">
        <h1>My Dictionary</h1>
        <div className="Add-a-word">
          <input type="text" value={newWord} onChange={(e) => {
            setNewWord(e.target.value)
          }}></input>
          <div className="Button" onClick={(e) => addWord()}>ADD WORD OR PHRASE</div>
        </div>
        <div className="My-words">
        {myDictionary.map(w => (
        <div className="Word">
          <h2>{w.word}</h2>
          <p>{w.definition}</p>
          <div className="Icons">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash"></i>
          </div>  
        </div>
      ))}
          <div className="Word">
            <h2>Cat</h2>
            <p>Definition of cat.</p>
            <div className="Icons">
             <i class="fas fa-edit"></i>
             <i class="fas fa-trash"></i>
            </div>
          </div>
          <div className="Word">
            <h2>Orange</h2>
            <p>Oranges are fruit that are orange. They are not lemons, those are yellow.</p>
            <div className="Icons">
             <i class="fas fa-edit"></i>
             <i class="fas fa-trash"></i>
            </div>
          </div>
          <div className="Word">
            <h2>Left</h2>
            <p>Left is a direction you go when you don't go right, forward, or backwards.</p>
            <div className="Icons">
             <i class="fas fa-edit"></i>
             <i class="fas fa-trash"></i>
            </div>
          </div>
          <div className="Word">
            <h2>Who dat</h2>
            <p>Who dat is a fun way to say, "Who is that?"</p>
            <div className="Icons">
             <i class="fas fa-edit"></i>
             <i class="fas fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App