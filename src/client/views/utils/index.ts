

export const applyHTMLElementsInnerText = (searchElment: HTMLElement, querySelectionString: string, text: string) => {
  const element: HTMLElement = searchElment.querySelector(querySelectionString)
  if (element) element.innerText = text
}