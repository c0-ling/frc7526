let currentPlayer = null;
let currentLevel = 0;
let countdownTimer = null;
let countdownRemaining = 0;

// DOM 元素
const titleEl = document.getElementById("title");
const riddleEl = document.getElementById("riddle");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const hintBtn = document.getElementById("hintButton");
const hintText = document.getElementById("hint");
const resultText = document.getElementById("result");

const storySection = document.getElementById("storySection");
const storyText = document.getElementById("storyText");
const startChallengeBtn = document.getElementById("startChallengeBtn");

const challengeSection = document.getElementById("challengeSection");
const challengeTitle = document.getElementById("challengeTitle");
const challengeContent = document.getElementById("challengeContent");
const challengeAnswerInput = document.getElementById("challengeAnswer");
const challengeSubmitBtn = document.getElementById("challengeSubmitBtn");
const challengeHintBtn = document.getElementById("challengeHintBtn");
const challengeHintText = document.getElementById("challengeHint");
const challengeResultText = document.getElementById("challengeResult");
const timerEl = document.getElementById("timer");

const deadScreen = document.getElementById("deadScreen");

// ======= 流程狀態 =======
let gameState = "login"; // login -> demo -> story -> challenge -> end

// 1. 檢查輸入名字，登入流程
function checkAnswer() {
  if (gameState !== "login") return;

  const input = answerInput.value.trim();
  if (!input) return;

  if (players[input]) {
    currentPlayer = input;
    currentLevel = 0;
    resultText.textContent = "";
    hintText.textContent = "";
    hintBtn.style.display = "none";

    // 進入示範關卡（demo）
    startDemoLevel();
  } else {
    resultText.textContent = "❌ 查無此學員，請重新輸入";
    resultText.style.color = "red";
  }
}

// 2. 顯示示範題（第一關）
function startDemoLevel() {
  gameState = "demo";
  const demoLevel = players[currentPlayer][0];
  titleEl.textContent = demoLevel.title;
  riddleEl.innerHTML = demoLevel.question;

  answerInput.style.display = "inline-block";
  answerInput.value = "";
  submitBtn.style.display = "inline-block";
  submitBtn.onclick = demoCheckAnswer;

  hintBtn.style.display = demoLevel.hint ? "inline-block" : "none";
  hintText.textContent = "";
  resultText.textContent = "";

  // 切換到 demo 狀態後，input綁定監聽改為demoCheckAnswer
  answerInput.onkeydown = (e) => {
    if (e.key === "Enter") demoCheckAnswer();
  };
}

// 3. 示範題檢查
function demoCheckAnswer() {
  const input = answerInput.value.trim();
  const demoLevel = players[currentPlayer][0];

  if (input === demoLevel.answer) {
    // 通過示範關卡，顯示劇情說明
    showStory();
  } else {
    resultText.textContent = "❌ 答案錯誤，請重新輸入";
    resultText.style.color = "red";
  }
}

// 4. 顯示劇情說明
function showStory() {
  gameState = "story";

  titleEl.textContent = "【Future Robotics Corp. 考核計畫】";
  riddleEl.style.display = "none";
  answerInput.style.display = "none";
  submitBtn.style.display = "none";
  hintBtn.style.display = "none";
  hintText.textContent = "";
  resultText.textContent = "";

  storySection.style.display = "block";
  storyText.innerHTML =
  `感謝你通過初步審查，獲得參與本公司最終選拔測驗的資格。<br><br>` +
  `接下來的測驗是由 <b>Future Robotics Corp.</b> 全自動化閉鎖系統所管理，<span style="color: #ff7675;">一旦啟動，將無法中途退出或暫停</span>。請務必慎重考慮。<br><br>` +
  `本測驗旨在全面評估你的<b>專業技能</b>、<b>團隊合作</b>、<b>邏輯推理</b>與<b>抗壓能力</b>。測驗過程中，你將面臨多重嚴苛挑戰，必須在有限時間內做出正確判斷，並協同夥伴共同完成任務。<br><br>` +
  `<b>請注意：</b><br>` +
  `1. 本測驗具有一定挑戰性與風險，請確保您已充分了解並願意接受相關規範。<br>` +
  `2. 測驗過程中如有錯誤，可能需重新開始，請保持專注與謹慎。<br>` +
  `3. 請尊重流程，避免中途退出，以保障整體體驗與公平性。<br><br>` +
  `若你充分了解並願意承擔上述風險，請於下方簽署<span style="color: #ffeaa7;">數位切結書</span>，正式啟動挑戰。`;

  challengeSection.style.display = "none";
  deadScreen.style.display = "none";
}

// start challenge
function startChallenge() {
    gameState = "challenge";
    currentLevel = 1; 
    titleEl.textContent= "考核開始";
    storySection.style.display = "none";
    riddleEl.style.display = "block";

    loadChallengeLevel();
}

// loading formal level
function loadChallengeLevel() {
    if (!players[currentPlayer]) return;

    if (currentLevel >= players[currentPlayer].length) {
    // finish
        gameState = "end";
        titleEl.textContent = "🎉 恭喜你通過密室關卡！";
        riddleEl.innerHTML = `<p>你們費盡心力，終於合力解開了那最後一道謎題。</p>
<p>門打開的瞬間，強光湧入，你們逃出了那令人窒息的密室。</p>
<p>身體雖疲憊，心中卻燃起一絲希望。</p>

<p>就在此時，手機震動了。</p>

<h3>📡 你收到了一則訊息</h3>
<p><strong>來自：FRaCtal 系統</strong></p>
<hr>
<p><strong>挑戰者們：</strong></p>

<p>你們已成功跨越所有階段，證明了你們的智慧、勇氣與團結合作的強大。</p>

<p>但現在，真正的最後試煉降臨——<br>
<strong>雲朵挑戰賽</strong>，正等待著你們的到來。</p>

<p>闖過它，你們將掌握<br>
進入未來的關鍵——<strong>錄取通知書</strong>的最終線索。</p>

<p><strong>我一直在看著你們。</strong><br>
別讓我失望。</p>
<img src="img/eyeblow.png" alt="答案">
<hr>`;
        challengeSection.style.display = "none";
        answerInput.style.display = "none";
        submitBtn.style.display = "none";
        hintBtn.style.display = "none";
        hintText.textContent = "";
        resultText.textContent = "";
        timerEl.textContent = "";
        return;
  }

  const level = players[currentPlayer][currentLevel];
  riddleEl.textContent = "";
  titleEl.textContent = "正式考核";
  challengeTitle.textContent = level.title;
  challengeContent.innerHTML = ""; 
  challengeAnswerInput.value = "";
  challengeResultText.textContent = "";
  challengeHintText.textContent = "";
  challengeHintBtn.style.display = level.hint ? "inline-block" : "none";
  timerEl.textContent = "";

  challengeSection.style.display = "block";
  answerInput.style.display = "none";
  submitBtn.style.display = "none";
  hintBtn.style.display = "none";
  hintText.textContent = "";
  resultText.textContent = "";

  if (level.type === "text") {
    challengeContent.innerHTML = level.question;
    challengeAnswerInput.style.display = "inline-block";
    challengeSubmitBtn.style.display = "inline-block";
  } else if (level.type === "countdown") {
    challengeContent.innerHTML = level.question;
    challengeAnswerInput.style.display = "inline-block";
    challengeSubmitBtn.style.display = "inline-block";
    startCountdown(level.timeLimit);
  } else if (level.type === "explore") {
    challengeContent.innerHTML = level.question + "<br>" + (level.content || "");
    challengeAnswerInput.style.display = "inline-block";
    challengeSubmitBtn.style.display = "inline-block";
  } else if (level.type === "escape") {
    challengeContent.innerHTML = level.question + "<br><br>";

    level.items.forEach((item, index) => {
        const itemBtn = document.createElement("button");
        itemBtn.textContent = item.name;
        itemBtn.onclick = () => showEscapeItem(index);
        challengeContent.appendChild(itemBtn);
    });

    challengeAnswerInput.style.display = "inline-block";
    challengeSubmitBtn.style.display = "inline-block";
  }
}

// 7. subit answer
function submitChallengeAnswer() {
  if (gameState !== "challenge") return;

  const input = challengeAnswerInput.value.trim();
  const level = players[currentPlayer][currentLevel];

  if (!input) return;

  if (input === level.answer) {
    clearCountdown();

    currentLevel++;
    loadChallengeLevel();
  } else {
    challengeResultText.textContent = "❌ 答案錯誤，請重新輸入";
    challengeResultText.style.color = "red";
  }
}

// hint
function showHint() {
  if (gameState !== "demo") return;
  const demoLevel = players[currentPlayer][0];
  hintText.textContent = "💡 提示：" + (demoLevel.hint || "提示未設定");
  hintBtn.style.display = "none";
}

function showChallengeHint() {
  if (gameState !== "challenge") return;
  const level = players[currentPlayer][currentLevel];
  challengeHintText.textContent = "💡 提示：" + (level.hint || "提示未設定");
  challengeHintBtn.style.display = "none";
}

// countdown
function startCountdown(seconds) {
  countdownRemaining = seconds;
  timerEl.textContent = `倒數計時：${countdownRemaining}秒`;
  challengeSubmitBtn.disabled = false;
  challengeAnswerInput.disabled = false;

  countdownTimer = setInterval(() => {
    countdownRemaining--;
    timerEl.textContent = `倒數計時：${countdownRemaining}秒`;

    if (countdownRemaining <= 0) {
      clearCountdown();
      showDeadScreen();
    }
  }, 1000);
}

function clearCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  timerEl.textContent = "";
}

// you are dead
function showDeadScreen() {
  gameState = "dead";
  challengeSection.style.display = "none";
  deadScreen.style.display = "block";
  titleEl.textContent = "";
}

function returnToChallenge() {
  deadScreen.style.display = "none";
  gameState = "challenge";
  loadChallengeLevel();
}

function showEscapeItem(index) {
    const level = players[currentPlayer][currentLevel];
    const item = level.items[index];

    challengeContent.innerHTML = `<p>${item.content}</p><button onclick="loadChallengeLevel()">返回房間</button>`;
    challengeAnswerInput.style.display = "none";
    challengeSubmitBtn.style.display = "none";
    challengeHintBtn.style.display = "none";
}

// 11. Enter鍵
answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkAnswer();
});
challengeAnswerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitChallengeAnswer();
});
