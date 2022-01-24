export default function addEventListenerToLinks(callback: (e: Event) => void) {
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
        element.removeEventListener("click", callback);

        element.addEventListener("click", callback);
      }
    }
  );
}
