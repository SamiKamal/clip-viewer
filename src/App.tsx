import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWatchingClip, setIsWatchingClip] = useState(false);

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
          setIsWatchingClip(true);
          setIsOpen(true);
        });
      }
    }
  );

  if (isWatchingClip) {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <DialogContent>
          <span onClick={() => setIsOpen(false)}>some content</span>
        </DialogContent>
      </DialogOverlay>
    );
  }

  return <h1>App was Injected.</h1>;
}

export default App;
