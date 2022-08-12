import React, { useState } from "react";
import CharacterSheet from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";

interface ImportSheetModalProps {
  dispatch: React.Dispatch<Action>;
  isVisible: boolean;
}

const ImportSheetModal = (props: ImportSheetModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { dispatch, isVisible } = props;
  const modalVisibleCls = isVisible ? "modal-open" : "";

  const dismissDialog = () => {
    dispatch({ t: "setImportDialogVisibility", visible: false });
    setSelectedFile(null);
    // Because setting the value via the usual React mechanism makes everything explode
    let input = document.getElementById("sheetFile") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  return (
    <div className={`modal modal-bottom sm:modal-middle ${modalVisibleCls}`}>
      <div className='modal-box relative prose'>
        <h3>Import Character Sheet</h3>
        <button
          className='btn btn-sm btn-circle absolute right-2 top-2'
          onClick={dismissDialog}
        >
          ✕
        </button>
        <input
          id='sheetFile'
          type='file'
          className='input input-primary w-full pt-2 text-lg text-center'
          onChange={evt => {
            if (evt.target.files) setSelectedFile(evt.target.files[0]);
          }}
        />
        <div className='modal-action'>
          <button
            className='btn btn-primary'
            onClick={() => {
              const reader = new FileReader();
              reader.onload = e => {
                let textData = e.target?.result?.toString();
                if (textData) {
                  const sheet = JSON.parse(textData) as CharacterSheet;
                  console.log(sheet);
                  dispatch({ t: "importCharacterSheet", sheet });
                  dismissDialog();
                }
              };
              if (selectedFile !== null) reader.readAsText(selectedFile);
            }}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportSheetModal;
