import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Story from "./components/Story"

function App() {
  const url = `https://twitter.com/intent/tweet`;
  const [total, setTotal] = useState(url);
  
  const send = text => {
    
    const hashtag = "\n%23devlibs dev-libs.netlify.com"
    // replace the line breaks and spaces with their "URL" equivalent
    const tweet = (text+hashtag).replace(/\n/g, "%0D").replace(/\s/g, "%20")
    console.log(tweet)
    setTotal(url + "?text=" + tweet);
  }

  return (
    <div className="App">
      <div style={{ height: "40vh" }} />
      <Story send={send}/>
      <div style={{ display: "flex", justifyContent: "space-around", width: "40%", margin: "0 auto" }}>
        <p
          onClick={() => window.open(total,'popup','width=600,height=600')}
          className="twitter-share-button"
          data-size="large"
          data-show-count="false"
        >
         Tweet
        </p>
      </div>
    </div>
  );
}

export default App;
