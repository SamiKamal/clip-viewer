import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useState } from "react";
import styled from "styled-components";
import getClipLink from "./util/getClipLink";

function App() {
  const [clipLink, setClipLink] = useState<string>("");
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
          setClipLink(getClipLink(element.getAttribute("href") as string));
        });
      }
    }
  );

  if (isWatchingClip) {
    return (
      <Overlay isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <Content>
          <iframe
            width="560"
            height="315"
            src={clipLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Content>
      </Overlay>
    );
  }

  return <h1>App was Injected.</h1>;
}

const Overlay = styled(DialogOverlay)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0 0 0 / 0.4);
  z-index: 1;
`;

const Content = styled(DialogContent)`
  background-color: #000000d9;
  position: relative;
  top: 50%;
  left: 50%;
  width: fit-content;
  transform: translate(-50%, -50%);
`;

export default App;
