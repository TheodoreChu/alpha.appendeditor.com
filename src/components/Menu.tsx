import React from 'react';
import prettier from 'prettier';
import parserMarkdown from 'prettier/parser-markdown';
import { EditingModes } from './AppendEditor';
import {
  ChevronToggleButton,
  CopyButton,
  EyeButton,
  PencilButton,
  PrintButton,
} from './Buttons';

// Import types
import { HtmlElementId } from './AppendEditor';

enum HtmlClassName {
  chevronToggleButton = 'menu-button chevron-toggle-button',
  menuButton = 'menu-button',
  on = ' on',
  off = ' off',
}

interface MenuProps {
  borderlessMode?: boolean;
  editingMode?: string;
  fixedHeightMode?: boolean;
  fullWidthMode?: boolean;
  monacoEditorLanguage: string;
  onConfirmPrintUrl: () => void;
  overflowMode?: boolean;
  refreshEdit: () => void;
  refreshView: () => void;
  saveText: (text: string) => void;
  showMenuOptionsEdit?: boolean;
  //showMenuOptionsMonacoEditor?: boolean;
  showMenuOptionsShare?: boolean;
  showMenuOptionsView?: boolean;
  text: string;
  toggleBorderlessMode: () => void;
  toggleFixedHeightMode: () => void;
  toggleFullWidthMode: () => void;
  toggleOverflowMode: () => void;
  toggleShowMenu: () => void;
  toggleShowMenuOptionsEdit: () => void;
  //toggleShowMenuOptionsMonacoEditor?: () => void;
  toggleShowMenuOptionsView: () => void;
  toggleShowMenuOptionsShare: () => void;
  viewMode?: boolean;
}

interface MenuState {
  message?: string;
  displayMessageShare: boolean;
  displayMessageEdit: boolean;
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  clearTooltipTimer: NodeJS.Timeout | undefined;
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      message: '',
      displayMessageEdit: false,
      displayMessageShare: false,
    };
  }

  resetMessageTimer = () => {
    if (this.clearTooltipTimer) {
      clearTimeout(this.clearTooltipTimer);
    }
    this.clearTooltipTimer = setTimeout(() => {
      this.setState({
        displayMessageEdit: false,
        displayMessageShare: false,
      });
    }, 5000);
  };

  showMessageEdit = () => {
    this.setState(
      {
        displayMessageEdit: true,
        displayMessageShare: false,
      },
      () => {
        this.resetMessageTimer();
      }
    );
  };
  showMessageShare = () => {
    this.setState(
      {
        displayMessageEdit: false,
        displayMessageShare: true,
      },
      () => {
        this.resetMessageTimer();
      }
    );
  };

  copyToClipboard = (text: string) => {
    const textField = document.createElement('textarea');
    textField.value = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    this.showMessageShare();
    textField.remove();
  };

  copyText = () => {
    if (this.props.text) {
      this.setState({ message: 'Copied Text to clipboard' }, () => {
        this.copyToClipboard(this.props.text);
      });
    } else {
      this.setState({ message: 'No text to copy. Your note is empty' }, () => {
        this.showMessageShare();
      });
    }
  };

  copyHtml = () => {
    if (!this.props.viewMode) {
      this.setState(
        { message: 'Unable to copy HTML. Please turn View Mode on' },
        () => this.showMessageShare()
      );
    } else if (!this.props.text) {
      this.setState({ message: 'No HTML to copy. Your note is empty' }, () => {
        this.showMessageShare();
      });
    } else {
      const renderedNote = document.getElementById('renderedNote');
      if (renderedNote?.firstElementChild?.innerHTML) {
        this.setState({ message: 'Copied HTML to clipboard' });
        this.copyToClipboard(renderedNote?.firstElementChild.innerHTML);
      }
    }
  };

  formatText = () => {
    if (
      this.props.monacoEditorLanguage !== 'markdown' &&
      this.props.editingMode === EditingModes.useMonacoEditor
    ) {
      this.setState(
        {
          message:
            'Error: Your Monaco Editor language is not Markdown. Formatting is only available for Markdown',
        },
        () => {
          this.showMessageEdit();
        }
      );
    } else if (this.props.text) {
      this.setState(
        { message: 'Formatted Markdown text with Prettier' },
        () => {
          try {
            const formattedText = prettier.format(this.props.text, {
              parser: 'markdown',
              plugins: [parserMarkdown],
            });
            this.props.saveText(formattedText);
            this.props.refreshEdit();
            this.props.refreshView();
            this.showMessageEdit();
          } catch (e) {
            this.setState({ message: 'Error formatting text: ' + e }, () => {
              this.showMessageEdit();
            });
            console.log('Error formatting text: ' + e);
          }
        }
      );
    } else {
      this.setState(
        { message: 'No text to format. Your note is empty' },
        () => {
          this.showMessageEdit();
        }
      );
    }
  };

  uncheckBoxes = () => {
    const { text } = this.props;
    const checkedBoxes = new RegExp(/- \[x\]/gm);
    if (checkedBoxes.test(text)) {
      const newText = text.replace(checkedBoxes, '- [ ]');
      this.props.saveText(newText);
      this.props.refreshEdit();
      this.props.refreshView();
      this.setState({ message: 'Unchecked all checkboxes' }, () => {
        this.showMessageEdit();
      });
    } else {
      this.setState({ message: 'No checked checkboxes found' }, () => {
        this.showMessageEdit();
      });
    }
  };

  render() {
    // You can render any custom fallback UI
    return [
      <div
        className="menu-overlay"
        key={'menu-overlay'}
        onClick={this.props.toggleShowMenu}
      />,
      <div id={HtmlElementId.menu} key={HtmlElementId.menu}>
        <ChevronToggleButton
          caption={'Appearance'}
          className={HtmlClassName.chevronToggleButton}
          condition={this.props.showMenuOptionsView}
          key={'appearance'}
          onClick={this.props.toggleShowMenuOptionsView}
          title={'Toggle show options for the appearance of the editor'}
        />
        {this.props.showMenuOptionsView && [
          <EyeButton
            caption={'Borderless'}
            className={
              HtmlClassName.menuButton +
              (this.props.borderlessMode ? HtmlClassName.on : HtmlClassName.off)
            }
            condition={this.props.borderlessMode}
            key={'borderless'}
            messageOn={'on'}
            messageOff={'off'}
            onClick={this.props.toggleBorderlessMode}
            title={
              'Toggle Borderless Mode. Blends borders and margins into the background for a cleaner look'
            }
          />,
          <EyeButton
            caption={'Fixed Height'}
            className={
              HtmlClassName.menuButton +
              (this.props.fixedHeightMode
                ? HtmlClassName.on
                : HtmlClassName.off)
            }
            condition={this.props.fixedHeightMode}
            key={'fixed-height'}
            messageOn={'on'}
            messageOff={'off'}
            onClick={this.props.toggleFixedHeightMode}
            title={
              'Toggle Fixed Height Mode. Limits the height of the content container for easier side-by-side editing'
            }
          />,
          <EyeButton
            caption={'Full Width'}
            className={
              HtmlClassName.menuButton +
              (this.props.fullWidthMode ? HtmlClassName.on : HtmlClassName.off)
            }
            condition={this.props.fullWidthMode}
            key={'full-width'}
            messageOn={'on'}
            messageOff={'off'}
            onClick={this.props.toggleFullWidthMode}
            title={
              'Toggle Full Width Mode for unrestricted editing. Borderless mode plus unset maximum container widths'
            }
          />,
          <EyeButton
            caption={'Horizontal Overflow'}
            className={
              HtmlClassName.menuButton +
              (this.props.overflowMode ? HtmlClassName.on : HtmlClassName.off)
            }
            condition={this.props.overflowMode}
            key={'horizontal-overflow'}
            messageOn={'visible'}
            messageOff={'auto'}
            onClick={this.props.toggleOverflowMode}
            title={
              'Toggle Horizontal Overflow. Visible is great for editing and viewing large tables and preformatted text. Works best with Full Width mode'
            }
          />,
        ]}
        <ChevronToggleButton
          caption={'Share'}
          className={HtmlClassName.chevronToggleButton}
          condition={this.props.showMenuOptionsShare}
          key={'share'}
          onClick={this.props.toggleShowMenuOptionsShare}
          title={'Toggle show options to share your note'}
        />
        {this.props.showMenuOptionsShare && [
          <CopyButton
            caption={'Copy note text'}
            className={HtmlClassName.menuButton}
            fill={'var(--sn-stylekit-success-color)'}
            key={'copy-note-text'}
            onClick={this.copyText}
            title={"Copy the text of your note to your device's clipboard"}
          />,
          <CopyButton
            caption={'Copy rendered HTML'}
            className={HtmlClassName.menuButton}
            fill={'var(--sn-stylekit-success-color)'}
            key={'copy-rendered-html'}
            onClick={this.copyHtml}
            title={
              "Copy the rendered HTML from your note text to your device's clipboard"
            }
          />,
          <PrintButton
            caption={'Print rendered note'}
            className={'menu-button off'}
            fill={'var(--sn-stylekit-foreground-color)'}
            key={'print-rendered-note'}
            id={HtmlElementId.printButton}
            onClick={this.props.onConfirmPrintUrl}
            title={
              'Print rendered note. Works best on the web app in Chromium browsers (e.g., MS Edge, Google Chrome). Not available on mobile'
            }
          />,
          <div
            className={`notification ${
              this.state.displayMessageShare ? 'visible' : 'hidden'
            }`}
            key={'notification'}
          >
            <p>
              <b>{this.state.message}</b>
            </p>
          </div>,
        ]}
        <ChevronToggleButton
          caption={'Actions'}
          className={HtmlClassName.chevronToggleButton}
          condition={this.props.showMenuOptionsEdit}
          onClick={this.props.toggleShowMenuOptionsEdit}
          title={'Toggle show actions to quickly format and edit your note'}
        />
        {this.props.showMenuOptionsEdit && [
          <PencilButton
            caption={'Format Markdown text'}
            className={HtmlClassName.menuButton}
            fill={'var(--sn-stylekit-warning-color)'}
            key={'format-markdown-text'}
            onClick={this.formatText}
            title={
              'Format Markdown text with Prettier. WARNING: this may cause undesired changes to your note text. Use the Note History feature to revert unwanted changes'
            }
          />,
          <PencilButton
            caption={'Uncheck all checkboxes'}
            className={HtmlClassName.menuButton}
            fill={'var(--sn-stylekit-danger-color)'}
            key={'uncheck-all-checkboxes'}
            onClick={this.uncheckBoxes}
            title={
              'Uncheck all checkboxes. DANGER: this may cause undesired changes to your note text. Use the Note History feature to revert unwanted changes'
            }
          />,
          <div
            className={`notification ${
              this.state.displayMessageEdit ? 'visible' : 'hidden'
            }`}
            key={'notification'}
          >
            <p>
              <b>{this.state.message}</b>
            </p>
          </div>,
        ]}
        <div className="extra-space"></div>
      </div>,
    ];
  }
}
