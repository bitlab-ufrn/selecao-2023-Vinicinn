/* `var array;` is declaring a variable named `array` without assigning it a value. The variable is
likely intended to be used to store an array of strings retrieved from a file. */
var array;

/* This code is using the `fetch` API to retrieve the contents of a file named "words.txt". The `then`
method is used to handle the response from the server. The first `then` method takes the response
object and returns the text content of the response. The second `then` method takes the text content
and splits it into an array of strings using the newline character as the delimiter. The resulting
array is stored in the `array` variable. */
fetch("words.txt")
  .then((response) => response.text())
  .then((text) => {
    array = text.split("\n");
  });

/**
 * The function analyzes a given text for offensive content and displays a message indicating whether
 * or not the text contains such content.
 * @param classname - The parameter "classname" is a string that represents the class name of the HTML
 * element that contains the text to be analyzed.
 */
function analyzer(classname) {
  let text = (document.getElementsByClassName(classname)[0].value + "").toLowerCase();
  let words = "";
  let has = false;
  array.forEach((element) => {
    let elementString = element + " ";
    if (text.includes(elementString.trim())) {
      has = true;
      if (words == "") {
        words += elementString.trim();
      } else {
        words += ", " + elementString.trim();
      }

      let p = document.querySelector("p");
      let newP = document.createElement("p");
      let wordsP = document.createElement("p");

      newP.textContent = "O texto possui conteudo Ofensivo!";
      newP.style.color = "red";
      newP.className = "result";
      wordsP.textContent = '['+words+']';

      p.replaceWith(newP);
      newP.appendChild(wordsP);
    } else if (has == false) {
      let p = document.querySelector("p");
      let newP = document.createElement("p");

      newP.textContent = "O texto não possui conteudo Ofensivo!";
      newP.style.color = "green";
      newP.className = "result";

      p.replaceWith(newP);
    }
  });
}

/* This code is selecting the first HTML element with the class name "textinput" and adding an event
listener to it. The event listener listens for the "keyup" event, which is triggered when a key is
released after being pressed down. If the key that was released has a key code of 13 (which
corresponds to the "Enter" key), the `analyzer` function is called with the parameter "textinput".
This allows the function to analyze the text inputted by the user and check for offensive words. */
let input = document.getElementsByClassName("textinput")[0];
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    analyzer("textinput");
  }
});
