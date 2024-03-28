import "./title.scss";

export function addTitle(
  text: string,
  type: TitleType = TitleType.SUB_TITLE,
  variant: TitleVariant = "h3"
) {
  const title: HTMLHeadingElement = document.createElement(variant);
  title.innerText = text;

  title.classList.add("header");

  switch (type) {
    case TitleType.SUB_TITLE:
      title.classList.add("sub-title");
      break;
    case TitleType.TITLE:
      title.classList.add("title");
      break;
  }

  return title;
}

export enum TitleType {
  TITLE,
  SUB_TITLE,
}

export type TitleVariant = "h1" | "h2" | "h3";
