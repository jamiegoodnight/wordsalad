import './App.css';
import React, {useState, useEffect} from 'react';
import firebase from "firebase/app";
import fire from './fire'
import "firebase/auth";
import Word from './components/Word'

const App = () => {
  const [user, setUser] = useState('')
  const [newDefinition, useNewDefinition] = useState('')
  const [newWord, setNewWord] = useState('')
  const [dictionary, setDictionary] = useState([])
  const [myDictionary, setMyDictionary] = useState([])
  const [isClicked, setIsClicked] = useState(false)
  const [isClicked2, setIsClicked2] = useState(false)
  const [disable, setDisable] = useState(false)
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = fire.firestore();
  const fetchWords= async () => {
    const data = await db.collection('words').get()
    const myData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
    setDictionary(myData.sort(function(a, b){
      if(a.word < b.word) { return -1; }
      if(a.word > b.word) { return 1; }
      return 0;
  }))
  }
  const signIn = () => {
  // console.log("HI")
  // console.log("FIRE ->", fire)
    setIsClicked(true)
    setTimeout(function(){setIsClicked(false)}, 200)
    fire.auth().signInWithPopup(provider)
    .then(result => {
    // console.log("This is my result", result.credential.idToken)
      console.log(result.additionalUserInfo.profile.id)
      console.log(result)
      setUser(result.additionalUserInfo.profile.id)
    })
    .then(function(e){
      const fetchData = async () => { 
        const data = await db.collection('words').get()
        const myData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
        setDictionary(myData.sort(function(a, b){
          if(a.word < b.word) { return -1; }
          if(a.word > b.word) { return 1; }
          return 0;
      }))
        // setDictionary(data.docs.map(doc => doc.data()))
      }
      fetchData()
    })
    // .then(function(e){
    //   dictionary.map(w => {
    //     console.log("My w", w)
    //   })
    //   setMyDictionary(dictionary.filter(w => w.userId===user ))
    //   console.log("Here is my Dictionary", myDictionary)
    // })
  }
  const addWord = () => {
    setDisable(true)
    console.log("Disable", disable)
    setIsClicked2(true)
    if(newWord.length > 0){ 
    let words = db.collection('words')
    words.add({
      userId: user,
      word: newWord,
      definition: newDefinition
    }).then(result =>{
      setNewWord("")
      fetchWords()
    })
  }
  setTimeout(function(){setIsClicked2(false)}, 200)
  setDisable(false)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={`https://i.imgur.com/7BZH2xx.png`} className="App-logo" alt="logo" />
        <div className="Header-input">
         {/* <input type="text" name="username"></input>
         <input type="password" name="password"></input> */}
         <div className={isClicked===true ? "clicked" : "Button"} onClick={(e) =>signIn()}>SIGN IN WITH GOOGLE</div>
        </div>
      </header>
      <div className={user.length > 1 ? "Dictionary" : "no-user"}>
        <h1>My Dictionary</h1>
        <div className="Add-a-word">
          <input type="text" value={newWord} onChange={(e) => {
            setNewWord(e.target.value)
          }}></input>
          <div className={isClicked2===true ? "clicked2" : "Button"} onClick={disable === true ? console.log(disable) : (e) => addWord()}>ADD WORD OR PHRASE</div>
        </div>
        <div className="My-words">
        {dictionary.map(w => { 
          if(w.userId===user){
            return(  
             <Word w={w} fetchWords={fetchWords} />
            )
          }
        // <div className="Word">
        //   <h2>{w.word}</h2>
        //   <p>{w.definition}</p>
        //   <div className="Icons">
        //     <i class="fas fa-edit"></i>
        //     <i class="fas fa-trash"></i>
        //   </div>  
        // </div>
        })}
          {/* <div className="Word">
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
            <p>Who dat is a fun way to say, "Who is that?" Consider how boring it usually is to 
              say that. You know? "Who dat" really takes it up a notch or two or three. Or four.
              There's no putting a number on the number of notches it takes it up in all seriousness.
            </p>
            <div className="Icons">
             <i class="fas fa-edit"></i>
             <i class="fas fa-trash"></i>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App



// const signIn = () => {
//   // console.log("HI")
//   // console.log("FIRE ->", fire)
//   fire.auth().signInWithPopup(provider)
//   .then(result => {
//     // console.log("This is my result", result.credential.idToken)
//     console.log(result.additionalUserInfo.profile.id)
//     console.log(result)
//     setUser(result.additionalUserInfo.profile.id)
//   })
//   .then(function(e){
//     const fetchData = async () => { 
//       const data = await db.collection('words').get()
//       setDictionary(data.docs.map(doc => doc.data()))

//     }
//     fetchData()
//   })
//   .then(function(e){
//     dictionary.map(w => {
//       console.log("My w", w)
//     })
//     setMyDictionary(dictionary.filter(w => w.userId===user ))
//     console.log("Here is my Dictionary", myDictionary)
//   })
// }