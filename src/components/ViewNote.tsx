import React from 'react';
import { EditingModes, HtmlElementId } from './AppendEditor';
import DynamicEditor from './DynamicEditor';
import Help from './Help';
import Intro from './Intro';
import { renderMarkdown } from '../lib/renderMarkdown';

interface ViewProps {
  appendMode: boolean;
  bypassDebounce: boolean;
  debugMode: boolean;
  editMode: boolean;
  editingMode?: string;
  monacoEditorLanguage: string;
  printURL: boolean;
  saveText: (text: string) => void;
  showHelp: boolean;
  text: string;
}

interface ViewState {
  showHelp: boolean;
}

export default class ViewNote extends React.Component<ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);

    this.state = {
      showHelp: this.props.showHelp,
    };
  }

  onToggleShowHelp = () => {
    const helpButton = document.getElementById('helpButton');
    if (helpButton) {
      helpButton.click();
    }
  };

  renderMarkdown = (text: string) => {
    const markdown = renderMarkdown(text, this.props.bypassDebounce);
    return markdown;
  };

  render() {
    const { text } = this.props;
    return (
      <div
        className={
          'sk-panel main view' + (this.props.printURL ? ' printURL' : '')
        }
        id={HtmlElementId.view}
        key={HtmlElementId.view}
      >
        {!text && (
          <Intro
            appendMode={this.props.appendMode}
            editMode={this.props.editMode}
            showHelp={this.props.showHelp}
          />
        )}
        {!text && this.state.showHelp && <hr></hr>}
        {this.state.showHelp && (
          <Help
            debugMode={this.props.debugMode}
            printURL={this.props.printURL}
          />
        )}
        <div
          id={HtmlElementId.renderedNote}
          key={HtmlElementId.renderedNote}
          className={
            '' +
            (this.props.editingMode === EditingModes.useDynamicEditor
              ? ''
              : 'rendered-note-section')
          }
        >
          {this.props.editingMode === EditingModes.useMonacoEditor &&
          this.props.monacoEditorLanguage !== 'markdown' &&
          this.props.monacoEditorLanguage !== 'html' &&
          text ? (
            this.renderMarkdown(
              '```' + this.props.monacoEditorLanguage + '\n' + text + '\n```'
            )
          ) : this.props.editingMode === EditingModes.useDynamicEditor ? (
            <DynamicEditor
              debugMode={this.props.debugMode}
              onChange={this.props.saveText}
              readOnly={true}
              text={text}
            />
          ) : (
            this.renderMarkdown(text)
          )}
        </div>
      </div>
    );
  }
}
