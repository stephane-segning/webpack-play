import "./button.scss";

export async function addButton(
  text: string,
  onClick: (ev: MouseEvent) => void
): Promise<HTMLButtonElement> {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", onClick);
  return button;
}
