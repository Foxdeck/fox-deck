const icon = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12,18c.552,0,1,.448,1,1s-.448,1-1,1-1-.448-1-1,.448-1,1-1Zm12,1.5V4.5c0-2.481-2.019-4.5-4.5-4.5H4.5C2.019,0,0,2.019,0,4.5v15c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5ZM19.5,1c1.93,0,3.5,1.57,3.5,3.5v15c0,1.93-1.57,3.5-3.5,3.5H4.5c-1.93,0-3.5-1.57-3.5-3.5V4.5c0-1.93,1.57-3.5,3.5-3.5h15Zm-7,14.5v-.646c0-.89,.614-1.899,1.428-2.348,1.5-.827,2.307-2.525,2.009-4.226-.283-1.611-1.605-2.934-3.216-3.216-1.102-.192-2.204,.059-3.101,.709-.875,.635-1.464,1.604-1.615,2.657-.039,.273,.151,.527,.424,.566,.276,.04,.527-.151,.566-.424,.112-.787,.554-1.512,1.212-1.989,.675-.491,1.507-.68,2.341-.533,1.204,.211,2.193,1.2,2.404,2.404,.229,1.3-.363,2.547-1.506,3.177-1.146,.632-1.946,1.958-1.946,3.224v.646c0,.276,.224,.5,.5,.5s.5-.224,.5-.5Z"/></svg>
`

export class SimpleQuestion {
  static get toolbox() {
    return {
      title: "Question",
      icon
    };
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.contentEditable = "true";
    element.classList.add("ce-paragraph");
    element.classList.add("ce-question");
    element.classList.add("cdx-block");

    const question = document.createElement("input");
    question.classList.add("ce-question-input")
    question.classList.add("ce-question-title")
    question.placeholder = "What is 3+3?";

    const answer = document.createElement("textarea");
    answer.classList.add("ce-question-input")
    answer.classList.add("ce-question-answer")
    answer.placeholder = "3+3=6!";

    element.appendChild(question);
    element.appendChild(answer);
    return element;
  }

  save(blockContent: any) {
    return {
      url: blockContent.value
    };
  }
}