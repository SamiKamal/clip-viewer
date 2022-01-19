import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
console.log("Hello World");

function App() {
  const [currentOpen, setCurrentOpen] = useState(true);
  useEffect(() => {
    console.log("Hehehe");
  });

  Array.from(document.getElementsByTagName("a")).forEach((e) => {
    e.addEventListener("click", (e) => {
      console.log(e);
    });
  });
  return (
    <h1 onClick={(e) => setCurrentOpen(!currentOpen)}>App was injected.</h1>
  );
}

const container = document.createElement("div");
container.setAttribute("id", "app-wrapper");
window.addEventListener("load", () => {
  document.body.appendChild(container);
  ReactDOM.render(<App />, container);
});
