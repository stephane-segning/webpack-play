import "./sw";
import "./style.scss";

import("./custom/todo-list");
import("./helper/button");

async function main() {
  console.log("App starting...");
  const { addTitle, TitleType } = await import("./helper/title");
  const { PageName, addNavBar } = await import("./helper/nav");

  // First get the root div
  const rootDiv = document.getElementById("root")! as HTMLDivElement;

  // Then append some content to it.
  rootDiv.appendChild(
    await addNavBar((page) => {
      console.log("page", page === PageName.HOME ? "home" : "contact");
    })
  );

  rootDiv.appendChild(addTitle("Some title", TitleType.TITLE, "h1"));
  rootDiv.appendChild(addTitle("Some sub title", undefined));

  rootDiv.appendChild(document.createElement("hr"));

  const tL = document.createElement("todo-list");
  tL.setAttribute("x-prefix", "test");
  rootDiv.appendChild(tL);
}

window.addEventListener("load", main);
