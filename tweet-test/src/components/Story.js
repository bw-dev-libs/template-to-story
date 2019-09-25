import React, { useState, useEffect } from "react";
import { template, tinyDict } from "../utils/data";

export default function Story(props) {

  // Creating two state variables:
  // fulltext = the text that the user will see
  // allWords = An object of each word to fill in the blank
  const [fulltext, setFulltext] = useState("");
  const [allWords, setAllWords] = useState();


  // Inside our useEffect . . .
  useEffect(() => {

    // If allWords doesn't exist, that means we just loaded the page
    //     (allWords starts out as undefined)
    // If allWords doesn't exist, we call the newRandoms function
    if (!allWords) {
      newRandoms();

      // Otherwise, we take our words and template and convert them to a string
    } else {
      convertToString();
    }
  }, [allWords]);

  /**
   * This function just takes the imported dictionary from our data file,
   * and uses it to create an object:
   * The object has one random word for each category,
   * emulating an `axios.get()` request.
   * Once we have the object, we `setAllWords()`, calling the `useEffect()` function again,
   * and then converting everything into a string
   */
  const newRandoms = () => {
    const newObj = {};
    for (let wordSet in tinyDict) {
      const randomIndex = [
        Math.floor(Math.random() * tinyDict[wordSet].length)
      ];
      const randomWord = tinyDict[wordSet][randomIndex];
      newObj[wordSet] = randomWord;
    }
    setAllWords(newObj);
  };

  /**
   * Takes the template from our data,
   * as well as our object of `allWords`,
   * and converts them to a single string.
   */
  const convertToString = () => {
    let str = "";

    // looping through objects, woo hoo.
    for (let word in template) {
      let piece = "";

      // The template has 7 properties, while `allwords` only has 6.
      //     (there are some extra words after the last "user entered" word)
      // This if statement just checks to make sure a word exists in our
      // allWords object.
      // If it exists, we add the template AND our word.
      // If it doesn't exist, we just add the template.
      if (allWords[word]) {
        piece = template[word] + allWords[word];
      } else {
        piece = template[word];
      }
      str += piece;
    }
    setFulltext(str);
    props.send(str)
  };

  return (
    <div>
      <p>{fulltext}</p>
      <button onClick={newRandoms}>New Randoms</button>
    </div>
  );
}
