const animatorContainer = document.querySelector(".animator");
const executeButton = document.querySelector(".execute");

const diff_Api = new diff_match_patch();

const map = [
  { value: -1, key: "Goo" },
  { value: 1, key: "Ba" },
  { value: 0, key: "d dog" },
];

let positionToBeLeftShift = 0;
let positionToBeShiftedAfterAnimation = 0;

function nextSlideExecution() {
  animatorContainer.innerHTML = "";

  map.forEach((item) => {
    const span = document.createElement("span");
    span.className =
      item.value == 1 ? "code-snippet code-snippet__add" : "code-snippet";
    span.textContent = item.key;

    span.style.left = `${positionToBeLeftShift}px`;

    animatorContainer.appendChild(span);

    //to determine the current position after animation
    const currentSnippetWidth = span.getBoundingClientRect().width;
    //after redering if the element needs to be removed then turn the opacity 0 and turn display to none
    if (item.value == -1) {
      setTimeout(() => {
        span.style.opacity = 0;
      }, 500);
      setTimeout(() => {
        span.classList.add("code-snippet__removal");
      }, 2100);
    } else if (item.value == 1) {
      span.style.display = "none";
      const currPositionToBeLeftShifted = positionToBeShiftedAfterAnimation;
      span.style.left = `${currPositionToBeLeftShifted}px`;
      setTimeout(() => {
        span.classList.remove("code-snippet__add");
        span.style.opacity = 0;
        span.style.display = "inline-block";
      }, 2500);
      setTimeout(() => {
        span.style.opacity = 1;
      }, 2600);
      positionToBeShiftedAfterAnimation += currentSnippetWidth;
    } else {
      const currPositionToBeLeftShifted = positionToBeShiftedAfterAnimation;
      setTimeout(() => {
        span.style.left = `${currPositionToBeLeftShifted}px`;
      }, 2600);
      positionToBeShiftedAfterAnimation += currentSnippetWidth;
    }

    if (item.value != 1) {
      positionToBeLeftShift += currentSnippetWidth;
    }
  });
}

executeButton.addEventListener("click", () => {
  nextSlideExecution();
});
