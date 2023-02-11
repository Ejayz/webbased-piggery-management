import { useEffect } from "react";

export default function ConfirmControl({
  DisplayConfirmation,
  setChoice,
  title,
  message,
  choice,
}: any) {
  function updateChoice(choice: boolean) {
    setChoice(choice);
  }
  useEffect(() => {
  }, [choice]);
  return (
    <div
      className={`${
        DisplayConfirmation ? "relative" : "hidden"
      } w-full h-full flex bg-slate-800 bg-opacity-50 absolute `}
    >
      <div className="card  m-auto w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{message}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                updateChoice(true);
              }}
              className="btn btn-primary"
            >
              Accept
            </button>
            <button
              onClick={() => {
                updateChoice(false);
              }}
              className="btn btn-ghost"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
