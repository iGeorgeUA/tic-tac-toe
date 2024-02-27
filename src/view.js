export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.actions = this.#qs('[data-id="actions"]');
    this.$.actionsBtn = this.#qs('[data-id="actions-btn"]');
    this.$.actionsItems = this.#qs('[data-id="actions-items"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');
    this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
    this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
    this.$.ties = this.#qs('[data-id="ties"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    this.$.actionsBtn.addEventListener("click", (event) => {
      this.#toggleActions();
    });
  }

  // events reg

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  // DOM helper methods
  updateScoreboard(p1Wins, p2Wins, ties) {
    this.$.p1Wins.innerText = `${p1Wins} wins`;
    this.$.p2Wins.innerText = `${p2Wins} wins`;
    this.$.ties.innerText = `${ties} ties`;
  }

  openModal(message) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.innerText = message;
  }

  closeAll() {
    this.#closeModal();
    this.#closeActions();
  }

  clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  initializeMoves(moves) {
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareId === +square.id);

      if (existingMove) {
        this.handlePlayerMove(square, existingMove.player);
      }
    });
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #closeActions() {
    this.$.actionsItems.classList.add("hidden");
    this.$.actionsBtn.classList.remove("border");

    const icon = this.$.actionsBtn.querySelector("img");

    icon.classList.toggle("arrow-down");
  }

  #toggleActions() {
    this.$.actionsItems.classList.toggle("hidden");
    this.$.actionsBtn.classList.toggle("border");

    const icon = this.$.actionsBtn.querySelector("img");

    icon.classList.toggle("arrow-down");
  }

  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("img");
    icon.src = player.iconSrc;
    icon.classList.add("img-size");
    squareEl.replaceChildren(icon);
  }

  setTurnIndicator(player) {
    const icon = document.createElement("img");
    const label = document.createElement("p");

    icon.src = player.iconSrc;
    icon.classList.add("img-label");

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you're up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw Error("Could not find elements");

    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw Error("Could not find elements");

    return elList;
  }
}
