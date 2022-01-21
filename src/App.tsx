function App() {
  Array.from(document.querySelectorAll(".link-fragment.tw-link")).forEach(
    (element) => {
      if (
        element.getAttribute("href") &&
        (/^https:\/\/clips\.twitch\.tv\/(?!embed)\S+/.test(
          element.getAttribute("href") as string
        ) ||
          /^https:\/\/www\.twitch\.tv\/(\S+)\/(clip)\/\S+/.test(
            element.getAttribute("href") as string
          ))
      ) {
        element.addEventListener("click", (el) => {
          el.preventDefault();
        });
      }
    }
  );
  return <h1 style={{ zIndex: 99999999 }}>App was injected.</h1>;
}

export default App;
