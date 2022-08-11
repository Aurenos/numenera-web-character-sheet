import {
  DocumentRemoveIcon,
  DownloadIcon,
  CodeIcon,
} from "@heroicons/react/outline";
import React from "react";
import { Action, State } from "../../lib/reducer";
import ToolButton from "./ToolButton";

function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

interface CornerToolsProps {
  dispatch: React.Dispatch<Action>;
  state: State;
}

const CornerTools = (props: CornerToolsProps) => {
  const { dispatch, state } = props;
  return (
    <div className='absolute right-0 top-0 mr-4 mt-4'>
      <div className='flex flex-col space-y-2'>
        <ToolButton
          className='btn-accent'
          toolTip='Download Character Sheet Data'
          onClickHandler={() => {
            download(
              "numenera-web-character-sheet.json",
              JSON.stringify(state.sheet)
            );
          }}
        >
          <DownloadIcon className='h-6 w-6' />
        </ToolButton>
        <ToolButton
          className='btn btn-square btn-error'
          toolTip='Reset Character Sheet'
          onClickHandler={() => dispatch({ t: "resetSheet" })}
        >
          <DocumentRemoveIcon className='h-6 w-6' />
        </ToolButton>
        <a
          href='https://github.com/Aurenos/numenera-web-character-sheet'
          target='_blank'
        >
          <ToolButton onClickHandler={() => {}} toolTip='Go to Source Code'>
            <CodeIcon className='h-6 w-6' />
          </ToolButton>
        </a>
      </div>
    </div>
  );
};

export default CornerTools;
