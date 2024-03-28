export async function addNavBar(onNavigation: (name: PageName) => void) {
  const { addButton } = await import("./button");

  const nav = document.createElement("nav");
  nav.appendChild(await addButton("Home", () => onNavigation(PageName.HOME)));
  nav.appendChild(
    await addButton("Contact", () => onNavigation(PageName.CONTACT))
  );
  return nav;
}

export enum PageName {
  HOME,
  CONTACT,
}
