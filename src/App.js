import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={`https://i.imgur.com/7BZH2xx.png`} className="App-logo" alt="logo" />
        <div className="Header-input">
         <input type="text" name="username"></input>
         <input type="password" name="password"></input>
         <div className="Button Sign-in">SIGN IN</div>
         <div className="Button Sign-up">SIGN UP</div>
        </div>
      </header>
      <div className="Dictionary">
        <h1>My Dictionary</h1>
        <div className="Add-a-word">
          <input type="text" name="search"></input>
          <div className="Button">ADD WORD OR PHRASE</div>
        </div>
        <div className="My-words">
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

export default App;
