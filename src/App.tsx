import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useEffect, useState, useCallback } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import addEventListenerToLinks from "./util/addEventListenerToLinks";
import getClipLink from "./util/getClipLink";
import { MdOutlineDragIndicator } from "react-icons/md";

function App() {
  const [clipLink, setClipLink] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isWatchingClip, setIsWatchingClip] = useState(false);

  const clickHandler = useCallback((e: Event) => {
    e.preventDefault();
    setIsWatchingClip(true);
    setIsOpen(true);
    setClipLink(
      getClipLink(
        (e?.target as HTMLAnchorElement)?.getAttribute("href") as string
      )
    );
  }, []);

  useEffect(() => {
    const targetNode = document.querySelector(
      ".Layout-sc-nxg1ff-0.lgtHpz.chat-scrollable-area__message-container"
    );
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const observerCallback = function (mutationsList: MutationRecord[]) {
      for (const mutation of mutationsList) {
        if (
          (mutation.addedNodes[0] as HTMLElement)?.querySelector(
            ".link-fragment"
          )
        ) {
          addEventListenerToLinks(clickHandler);
        }
      }
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode as HTMLElement, config);
  }, []);

  if (isWatchingClip) {
    return (
      <Overlay isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <Content>
          <DraggablePerformant>
            <div>
              <DragIcon />
              <iframe
                width="560"
                height="315"
                src={clipLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DraggablePerformant>
        </Content>
      </Overlay>
    );
  }

  return null;
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
  position: relative;
  top: 50%;
  left: 50%;
  width: fit-content;
  /* transform: translate(-50%, -50%); */
`;

const DragIcon = styled(MdOutlineDragIndicator)`
  font-size: 32px;
  cursor: pointer;
`;

const DraggablePerformant = styled(Draggable)`
  will-change: transform;
`;

export default App;
