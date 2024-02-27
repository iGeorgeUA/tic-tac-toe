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

  function initView() {
    view.closeAll();
    view.clearMoves();
    view.setTurnIndicator(store.game.currentPlayer);
    view.updateScoreboard(
      store.stats.playerWithStats[0].wins,
      store.stats.playerWithStats[1].wins,
      store.stats.ties
    );
    view.initializeMoves(store.game.moves);
  }

  window.addEventListener("storage", () => {
    initView();
  });

  initView();

  view.bindGameResetEvent((event) => {
    store.reset();
    initView();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();

    view.closeAll();
    view.clearMoves();
    view.setTurnIndicator(store.game.currentPlayer);
    view.updateScoreboard(
      store.stats.playerWithStats[0].wins,
      store.stats.playerWithStats[1].wins,
      store.stats.ties
    );
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    view.handlePlayerMove(square, store.game.currentPlayer);

    store.playerMove(+square.id);

    if (store.game.status.isComplete) {
      view.openModal(
        store.game.status.winner
          ? `${store.game.status.winner.name} wins!`
          : "Tie!"
      );

      return;
    }

    view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);
