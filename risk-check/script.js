"use strict";

const QUESTIONS = [
  "妻に話す前に、頭の中で結論を決めている",
  "断られた後、態度が重くなる",
  "妻の機嫌を見て「今夜いけるか」を探る",
  "家事や育児をやった後、見返りを期待してしまう",
  "自分の身だしなみを後回しにしている",
  "家の中で無言・ため息・不機嫌が出ている",
  "妻の反応次第で、その日の気分が大きく変わる",
  "妻以外に、自分の軸になるものがない",
  "「自分はこれだけ我慢している」と思うことが多い",
  "妻の疲れを「断るための言い訳」と感じてしまう",
  "話し合えば何とかなると思っている",
  "断られた理由をその場で知りたくなる",
  "家のことを「手伝っている」という感覚がある",
  "見た目・匂い・体型を最近見直していない",
  "断られた翌日、妻への態度が変わる"
];

const OPTIONS = [
  { value: 0, label: "ほとんど当てはまらない" },
  { value: 1, label: "少し当てはまる" },
  { value: 2, label: "かなり当てはまる" }
];

const RESULTS = [
  {
    min: 0,
    max: 7,
    range: "0〜7点",
    name: "軽度：大きな悪化要因は少ない段階",
    description: "今すぐ大きな悪化行動をしている状態ではない可能性があります。ただし、レスが長引くほど焦りは態度に出やすくなります。点数に関係なく、まず夫側の土台を整えることは損になりません。",
    actions: [
      "見た目・清潔感を整える",
      "家庭内の空気を重くしない",
      "断られた後の態度を変えない"
    ]
  },
  {
    min: 8,
    max: 15,
    range: "8〜15点",
    name: "要注意：焦りが行動に出始めている段階",
    description: "焦りや不安が、少しずつ態度や言葉に出始めている可能性があります。特に、断られた後の態度、家事や育児への見返り期待、妻の反応に気分を左右される状態には注意が必要です。",
    actions: [
      "妻の反応を探る行動をやめる",
      "家事や優しさを交換条件にしない",
      "夫側の土台整備から始める"
    ]
  },
  {
    min: 16,
    max: 23,
    range: "16〜23点",
    name: "悪化防止優先：自己流で動く前に順番確認が必要な段階",
    description: "妻の中に「また求められる」「また重い話になる」「断ったら空気が悪くなる」という警戒が積み上がっている可能性があります。この段階では、誘い方や話し合いだけを変えても逆効果になることがあります。",
    actions: [
      "求めることを一時停止する",
      "断られた後の態度を崩さない",
      "本命noteで行動の順番を確認することを推奨する"
    ]
  },
  {
    min: 24,
    max: 30,
    range: "24〜30点",
    name: "自己流危険：今のまま話すと悪化しやすい段階",
    description: "強い焦りや不安がある状態で話し合うと、夫側は向き合っているつもりでも、妻側には責め・要求・詰問として届く可能性があります。まず必要なのは、話し合いではなく沈静化です。",
    actions: [
      "一定期間、求めることを止める",
      "自分の生活とメンタルを整える",
      "必要であれば第三者相談も検討する",
      "本命noteで悪化防止の順番を確認することを推奨する"
    ]
  }
];

const state = {
  current: 0,
  answers: Array(QUESTIONS.length).fill(null),
  advanceTimer: 0
};

const screens = {
  landing: document.getElementById("landing-screen"),
  result: document.getElementById("result-screen")
};

const app = document.getElementById("app");
const questionList = document.getElementById("question-list");
const quizCount = document.getElementById("quiz-count");
const progressBar = document.getElementById("progress-bar");
const submitButton = document.querySelector('[data-action="show-result"]');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => {
    if (!element) return;
    element.classList.toggle("is-hidden", key !== name);
  });
  if (app && typeof app.scrollTo === "function") {
    app.scrollTo({ top: 0, behavior: "auto" });
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

function getAnsweredCount() {
  return state.answers.filter(answer => answer !== null).length;
}

function getRevealThrough() {
  const firstUnanswered = state.answers.findIndex(answer => answer === null);
  return firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered;
}

function startQuiz() {
  clearTimeout(state.advanceTimer);
  state.current = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  renderQuiz();
  showScreen("landing");
}

function renderQuiz() {
  const answeredCount = getAnsweredCount();
  const allAnswered = answeredCount === QUESTIONS.length;
  const revealThrough = getRevealThrough();

  quizCount.textContent = `${answeredCount} / ${QUESTIONS.length}`;
  progressBar.style.width = `${(answeredCount / QUESTIONS.length) * 100}%`;

  questionList.innerHTML = QUESTIONS.map((question, index) => {
    const answer = state.answers[index];
    const isOpen = index <= revealThrough;
    const isAnswered = answer !== null;
    const isActive = index === state.current;
    const isLocked = index > revealThrough;
    const cardClass = [
      "accordion-question",
      isOpen ? "is-open" : "",
      isAnswered ? "is-answered" : "",
      isActive ? "is-active" : "",
      isLocked ? "is-locked" : ""
    ].filter(Boolean).join(" ");
    const meta = isAnswered
      ? `<span class="summary-answer">${answer}点</span>`
      : `<span class="summary-meta">${index + 1} / ${QUESTIONS.length}</span>`;
    const body = isOpen ? renderQuestionBody(question, index, answer) : "";

    return `
      <article class="${cardClass}" id="question-card-${index}">
        <button
          class="question-summary"
          type="button"
          data-action="open-question"
          data-index="${index}"
          ${isLocked ? "disabled" : ""}
          aria-expanded="${isOpen ? "true" : "false"}">
          <span class="summary-title">Q${index + 1}</span>
          ${meta}
        </button>
        ${body}
      </article>
    `;
  }).join("");

  submitButton.disabled = !allAnswered;
  submitButton.textContent = allAnswered
    ? "結果を見る"
    : `あと${QUESTIONS.length - answeredCount}問で結果を表示できます`;
}

function renderQuestionBody(question, index, answer) {
  return `
    <div class="question-body">
      <h2>${escapeHtml(question)}</h2>
      <div class="choices" role="radiogroup" aria-label="Q${index + 1}">
        ${OPTIONS.map(option => {
          const selected = answer === option.value;
          return `
            <button
              class="choice-button${selected ? " is-selected" : ""}"
              type="button"
              role="radio"
              aria-checked="${selected ? "true" : "false"}"
              data-action="select-answer"
              data-index="${index}"
              data-value="${option.value}">
              <span class="choice-main">
                <span>${escapeHtml(option.label)}</span>
                <span class="choice-score">${option.value}点</span>
              </span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function openQuestion(index) {
  clearTimeout(state.advanceTimer);
  const questionIndex = Number(index);
  if (questionIndex > getRevealThrough()) return;
  state.current = questionIndex;
  renderQuiz();
  scrollToQuestion(questionIndex);
}

function selectAnswer(index, value) {
  const questionIndex = Number(index);
  state.answers[questionIndex] = Number(value);
  const firstUnanswered = state.answers.findIndex(answer => answer === null);
  state.current = firstUnanswered === -1 ? questionIndex : firstUnanswered;
  renderQuiz();
  scrollToQuestion(state.current);
}

function scrollToQuestion(index) {
  const targetCard = document.getElementById(`question-card-${index}`);
  if (!targetCard) return;
  targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
}

function getScore() {
  return state.answers.reduce((total, answer) => total + (Number(answer) || 0), 0);
}

function getResult(score) {
  return RESULTS.find(result => score >= result.min && score <= result.max) || RESULTS[0];
}

function renderResult() {
  const score = getScore();
  const result = getResult(score);
  const dangerPercent = (score / 30) * 100;

  document.getElementById("score-value").textContent = String(score);
  document.getElementById("danger-bar").style.width = `${dangerPercent}%`;
  document.getElementById("score-range").textContent = result.range;
  document.getElementById("result-heading").textContent = result.name;
  document.getElementById("result-description").textContent = result.description;
  document.getElementById("action-list").innerHTML = result.actions
    .map(action => `<li>${escapeHtml(action)}</li>`)
    .join("");
}

const restartButton = document.querySelector('[data-action="restart"]');
if (restartButton) {
  restartButton.addEventListener("click", startQuiz);
}

if (questionList) {
  questionList.addEventListener("click", event => {
  const answerButton = event.target.closest('[data-action="select-answer"]');
  if (answerButton) {
    selectAnswer(answerButton.dataset.index, answerButton.dataset.value);
    return;
  }

  const summaryButton = event.target.closest('[data-action="open-question"]');
  if (summaryButton) {
    openQuestion(summaryButton.dataset.index);
  }
  });
}

if (submitButton) {
  submitButton.addEventListener("click", () => {
  if (getAnsweredCount() !== QUESTIONS.length) return;
  renderResult();
  showScreen("result");
  });
}

renderQuiz();
