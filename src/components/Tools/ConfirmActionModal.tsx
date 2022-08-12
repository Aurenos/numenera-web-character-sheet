import React from "react";
import { Action } from "../../lib/reducer";

interface ConfirmActionModalProps {
  dispatch: React.Dispatch<Action>;
  promptedAction: Action | null;
  confirmationText: string;
}

const ConfirmActionModal = (props: ConfirmActionModalProps) => {
  const { dispatch, promptedAction } = props;
  const modalVisibleCls = promptedAction !== null ? "modal-open" : "";
  const dismissModal: Action = {
    t: "promptActionConfirmation",
    action: null,
    confirmationText: "",
  };

  return (
    <div className={`modal modal-bottom sm:modal-middle ${modalVisibleCls}`}>
      <div className='modal-box prose'>
        <h3>Confirm Action</h3>
        <p className='py-4'>{props.confirmationText}</p>
        <div className='flex flex-row space-x-4 modal-action'>
          <button
            className='btn btn-error w-16'
            onClick={() => dispatch(dismissModal)}
          >
            No
          </button>
          <button
            className='btn btn-success w-16'
            onClick={() => {
              if (promptedAction !== null) dispatch(promptedAction);
              dispatch(dismissModal);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
