const animatorContainer = document.querySelector(".animator");
const executeButton = document.querySelector(".execute");

// const codeSnippet = document.querySelector(".code-snippet-area");
// const codeSnippet1 = document.querySelector(".code-snippet-area1");
// const submitButton = document.querySelector(".submit");
// const diff_Api = new diff_match_patch();

// submitButton.addEventListener("click", () => {
//   const currText1 = codeSnippet.value.split("\n").join("<~LB~>");
//   const currText2 = codeSnippet1.value.split("\n").join("<~LB~>");

//   let diff = diff_Api.diff_main(currText1, currText2);
//   let newDiff = diff_Api.diff_cleanupSemantic(diff);
//   console.log(newDiff);
// });

// const map = [
//   { value: -1, key: "Goo" },
//   { value: 1, key: "Ba" },
//   { value: 0, key: "d dog" },
// ];

const newMap = [
  {
    0: 0,
    1: "I am the very model of a ",
  },
  {
    0: -1,
    1: "modern Major-General,<~LB~>I've information vegetable, anim",
  },
  {
    0: 1,
    1: "cartoon individual,<~LB~>My animation's comical, unusu",
  },
  {
    0: 0,
    1: "al, and ",
  },
  {
    0: -1,
    1: "miner",
  },
  {
    0: 1,
    1: "whimsic",
  },
  {
    0: 0,
    1: "al,<~LB~>I",
  },
  {
    0: -1,
    1: " know the kings of England, and I quote the fights historical,<~LB~>From Marathon to Waterloo, in order categorical",
  },
  {
    0: 1,
    1: "'m quite adept at funny gags, comedic theory I have read,<~LB~>From wicked puns and stupid jokes to anvils that drop on your head",
  },
  {
    0: 0,
    1: ".",
  },
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
