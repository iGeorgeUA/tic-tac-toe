import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconSrc: "cross.svg",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconSrc: "circle.svg",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("tic-tac-toe-storage-key", players);

  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });

  window.addEventListener("storage", () => {
    view.render(store.game, store.stats);
  });

  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
