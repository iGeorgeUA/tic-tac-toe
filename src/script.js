const App = {
  $: {
    actions: document.querySelector('[data-id="actions"]'),
    actionsItems: document.querySelector('[data-id="actions-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    modal: document.querySelector('[data-id="modal"]'),
    modalText: document.querySelector('[data-id="modal-text"]'),
    modalBtn: document.querySelector('[data-id="modal-btn"]'),
    turn: document.querySelector('[data-id="turn"]'),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => +move.squareId);
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((val) => p1Moves.includes(val));
      const p2Wins = pattern.every((val) => p2Moves.includes(val));

      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });
    return {
      status: moves.length === 9 || winner != null ? "complete" : "in-progress",
      winner,
    };
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    App.$.actions.addEventListener("click", (event) => {
      App.$.actionsItems.classList.toggle("hidden");
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("reset");
    });

    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("new round");
    });

    App.$.modalBtn.addEventListener("click", (event) => {
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
      App.$.modal.classList.add("hidden");
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);
        const nextPlayer = getOppositePlayer(currentPlayer);

        const squareIcon = document.createElement("img");
        const turnIcon = document.createElement("img");
        const turnLabel = document.createElement("p");
        turnLabel.innerText = `Player ${nextPlayer}, you are up!`;

        if (currentPlayer === 1) {
          squareIcon.src = "cross.svg";
          squareIcon.alt = "X image";

          turnIcon.src = "circle.svg";
          turnIcon.alt = "O image";

          turnLabel.classList = "turquoise";
        } else {
          squareIcon.src = "circle.svg";
          squareIcon.alt = "O image";

          turnIcon.src = "cross.svg";
          turnIcon.alt = "X image";

          turnLabel.classList = "yellow";
        }
        squareIcon.classList.add("img-size");
        turnIcon.classList.add("img-label");

        App.$.turn.replaceChildren(turnIcon, turnLabel);

        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        square.replaceChildren(squareIcon);

        const game = App.getGameStatus(App.state.moves);

        let message = "";

        if (game.status === "complete") {
          App.$.modal.classList.remove("hidden");
          if (game.winner) {
            message = `Player ${game.winner} wins!`;
          } else {
            message = "Tie game!";
          }
        }

        App.$.modalText.textContent = message;
      });
    });
  },
};

window.addEventListener("load", App.init);
