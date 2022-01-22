export default function getClipLink(link: string): string {
  let clipLink: string;

  if (link.includes("clips.twitch.tv")) {
    const id = link.match(/(?:https:\/\/)?clips\.twitch\.tv\/(\S+)/i)?.[1];

    clipLink =
      "https://clips.twitch.tv/embed?clip=" +
      id +
      "&parent=" +
      window.origin.split("://")[1];
  } else if (link.includes("https://www.twitch.tv")) {
    const id = link.split("clip/")[1].split("?filter")[0];
    clipLink =
      "https://clips.twitch.tv/embed?clip=" +
      id +
      "&parent=" +
      window.origin.split("://")[1];
  } else {
    throw new Error("This is not a Twitch clip");
  }

  return clipLink;
}
