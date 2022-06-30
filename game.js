const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "Kamu bangun di sebuah hutan yang rimbun dan kamu melihat kelinci dari kejauhan.",
    options: [
      {
        text: "Tangkap Kelinci",
        setState: { dagingKelinci: true },
        nextText: 2,
      },
      {
        text: "Tinggalkan Kelinci",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "Kamu berusaha keluar dari hutan yang rimbun dan menemukan perkemahan yg ditinggali pedagang.",
    options: [
      {
        text: "Jual Daging Kelinci",
        requiredState: (currentState) => currentState.dagingKelinci,
        setState: { dagingKelinci: false, money: true },
        nextText: 3,
      },
      {
        text: "Tawarkan Daging Kelinci untuk Menumpang",
        requiredState: (currentState) => currentState.dagingKelinci,
        setState: { dagingKelinci: false },
        nextText: 3,
      },
      {
        text: "Hiraukan Pedagang",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "Pedagang tetap menawarkan kamu untuk pergi bersama mereka ke Kota terdekat.",
    options: [
      {
        text: "Terima Tawaran Pedagang",
        nextText: 4,
      },
      {
        text: "Hiraukan Pedagang",
        nextText: 5,
      },
      {
        text: "Lari dari Pedagang",
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text: "Kamu berhasil sampai ke Gerbang Kota bersama dengan Pedang dengan Selamat. Namun Penjaga Gerbang meminta uang agar kamu bisa masuk Kota. ( Bersambung... )",
    options: [
      {
        text: "Restart Game",
        nextText: -1,
      },
      //   {
      //     text: "Beli Tiket Masuk dari Penjaga",
      //     requiredState: (currentState) => currentState.money,
      //     setState: { money: false, tiketMasuk: true },
      //     nextText: 6,
      //   },
      //   {
      //     text: "Curi Uang Pedagang",
      //     nextText: 7,
      //   },
    ],
  },
  {
    id: 5,
    text: "Karena berjalan sendiri di hutan, Beberapa hewan buas memantau kamu dari Kejauhan (Bersambung...)",
    options: [
      {
        text: "Restart Game",
        nextText: -1,
      },
    ],
  },
];

startGame();
