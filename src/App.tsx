import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useEffect, useState, useCallback } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import addEventListenerToLinks from "./util/addEventListenerToLinks";
import getClipLink from "./util/getClipLink";
import { MdOutlineDragIndicator, MdClose } from "react-icons/md";

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
      <Overlay
        dangerouslyBypassFocusLock
        dangerouslyBypassScrollLock
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
      >
        <Content>
          <Draggable bounds="body">
            <DraggableInnerWrapper>
              <iframe
                width="560"
                height="315"
                src={clipLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <ButtonsWrapper>
                <button onClick={() => setIsOpen(false)}>
                  <CloseButton />
                </button>

                <DragIcon />
              </ButtonsWrapper>
            </DraggableInnerWrapper>
          </Draggable>
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
  z-index: 9999;
  pointer-events: none;
`;

const Content = styled(DialogContent)`
  position: relative;
  width: fit-content;
`;

const DragIcon = styled(MdOutlineDragIndicator)`
  font-size: 32px;
  cursor: pointer;
`;

const DraggableInnerWrapper = styled.div`
  display: flex;
  pointer-events: all;
  will-change: transform;
  background-color: #0e0e10;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CloseButton = styled(MdClose)`
  font-size: 30px;
  text-align: center;
`;

export default App;
