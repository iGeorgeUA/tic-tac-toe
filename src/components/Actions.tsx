import { useState } from "react";
import "./Actions.css";

type Props = {
  onAction(action: "reset" | "new-round"): void;
};

export default function Actions({ onAction }: Props) {
  const [actionsOpen, setActionsOpen] = useState(false);

  return (
    <div className="actions">
      <button
        className="actions-btn"
        onClick={() => setActionsOpen((prev) => !prev)}
      >
        Actions
        {actionsOpen ? (
          <img src="up-arrow.svg" alt="up arrow" height="16px" width="10px" />
        ) : (
          <img
            src="down-arrow.svg"
            alt="down arrow"
            height="16px"
            width="10px"
          />
        )}
      </button>
      {actionsOpen && (
        <div className="items border">
          <button onClick={() => onAction("reset")}>Reset</button>
          <button onClick={() => onAction("new-round")}>New Round</button>
        </div>
      )}
    </div>
  );
}
