const animatorContainer = document.querySelector(".animator");
const executeButton = document.querySelector(".execute");

const codeSnippet = document.querySelector(".code-snippet-area");
const codeSnippet1 = document.querySelector(".code-snippet-area1");
const submitButton = document.querySelector(".submit");
const diff_Api = new diff_match_patch();

let calculatedDiff;

submitButton.addEventListener("click", () => {
  const currText1 = codeSnippet.value.split("\n").join("<~LB~>");
  const currText2 = codeSnippet1.value.split("\n").join("<~LB~>");

  let diff = diff_Api.diff_main(currText1, currText2);
  diff_Api.diff_cleanupSemantic(diff);
  console.log(diff_Api.diff_cleanupSemantic(diff));

  calculatedDiff = diff;
  executeButton.disabled = false;
});

let positionToBeLeftShift = 0;
let positionToBeLeftShiftedAfterAnimation = 0;
let positionToBeTopShift = 0;
let positionToBeTopShiftedAfterAnimation = 0;
let counter = 25;

function nextSlideExecution() {
  animatorContainer.innerHTML = "";

  calculatedDiff.forEach((item) => {
    const snippets = item[1].split("<~LB~>");
    for (let i = 0; i < snippets.length; i++) {
      const span = document.createElement("span");
      span.className =
        item["0"] == 1 ? "code-snippet code-snippet__add" : "code-snippet";
      span.innerHTML = snippets[i].replaceAll(" ", "&nbsp;");

      span.style.left = `${positionToBeLeftShift}px`;
      span.style.top = `${positionToBeTopShift}px`;

      animatorContainer.appendChild(span);

      const currentSnippetWidth = span.getBoundingClientRect().width;

      if (item["0"] == -1) {
        setTimeout(() => {
          span.style.opacity = 0;
        }, 500);
        setTimeout(() => {
          span.classList.add("code-snippet__removal");
        }, 2100);
      } else if (item["0"] == 1) {
        span.style.display = "none";
        const currPositionToBeLeftShifted =
          positionToBeLeftShiftedAfterAnimation;
        const currPositionToBeTopShifted = positionToBeTopShiftedAfterAnimation;
        span.style.left = `${currPositionToBeLeftShifted}px`;
        span.style.top = `${currPositionToBeTopShifted}px`;
        setTimeout(() => {
          span.classList.remove("code-snippet__add");
          span.style.opacity = 0;
          span.style.display = "inline-block";
        }, 2500);
        setTimeout(() => {
          span.style.opacity = 1;
        }, 2600);
        positionToBeLeftShiftedAfterAnimation += currentSnippetWidth;
        if (i + 1 < snippets.length != 0) {
          positionToBeTopShiftedAfterAnimation += counter;
          positionToBeLeftShiftedAfterAnimation = 0;
        }
      } else {
        const currPositionToBeLeftShifted =
          positionToBeLeftShiftedAfterAnimation;
        const currPositionToBeTopShifted = positionToBeTopShiftedAfterAnimation;
        setTimeout(() => {
          span.style.left = `${currPositionToBeLeftShifted}px`;
          span.style.top = `${currPositionToBeTopShifted}px`;
        }, 2600);
        positionToBeLeftShiftedAfterAnimation += currentSnippetWidth;
        if (i + 1 < snippets.length != 0) {
          positionToBeTopShiftedAfterAnimation += counter;
          positionToBeLeftShiftedAfterAnimation = 0;
        }
      }

      if (item["0"] != 1) {
        positionToBeLeftShift += currentSnippetWidth;
        if (i + 1 < snippets.length != 0) {
          positionToBeTopShift += counter;
          positionToBeLeftShift = 0;
        }
      }
    }
  });
}

executeButton.addEventListener("click", () => {
  nextSlideExecution();
});
