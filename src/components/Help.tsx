import React from 'react';
import { GearIcon, HelpIcon, MenuIcon } from './Icons';

interface HelpProps {
  debugMode: boolean;
  printURL: boolean;
}

interface HelpState {
  showFeelings: boolean;
  showMoreQuestions: boolean;
  showFeedback: boolean;
}

export default class Help extends React.Component<HelpProps, HelpState> {
  constructor(props: HelpProps) {
    super(props);

    this.state = {
      showFeelings: false,
      showMoreQuestions: false,
      showFeedback: false,
    };
  }

  onToggleShowFeelings = () => {
    this.setState({
      showFeelings: !this.state.showFeelings,
    });
  };

  onToggleShowMoreQuestions = () => {
    this.setState({
      showMoreQuestions: !this.state.showMoreQuestions,
    });
  };

  onToggleShowFeedback = () => {
    this.setState({
      showFeedback: !this.state.showFeedback,
    });
  };

  onToggleShowHelp = () => {
    const helpButton = document.getElementById('helpButton');
    if (helpButton) {
      helpButton.click();
    }
  };

  render() {
    return (
      <div id="help">
        <hr></hr>
        <h2>Append Editor Help</h2>
        <p>
          The Append Editor is an <b>unofficial</b>{' '}
          <a
            href="https://standardnotes.org/help/77/what-are-editors"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            editor
          </a>{' '}
          for{' '}
          <a
            href="https://standardnotes.org/"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            Standard Notes
          </a>
          , a free,{' '}
          <a
            href="https://standardnotes.org/knowledge/5/what-is-free-and-open-source-software"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            open-source
          </a>
          , and{' '}
          <a
            href="https://standardnotes.org/knowledge/2/what-is-end-to-end-encryption"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            end-to-end encrypted
          </a>{' '}
          notes app. The Append Editor is also free software licensed under{' '}
          <a
            href="https://github.com/TheodoreChu/append-editor/blob/main/LICENSE"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            AGPL-3.0
          </a>
          . Its source code is available on{' '}
          <a
            href="https://github.com/TheodoreChu/append-editor"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            GitHub
          </a>
          .
        </p>
        <h3>How do I use the Append Editor?</h3>
        <p>
          The Append Editor supports{' '}
          <a
            href="https://guides.github.com/features/mastering-markdown/"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            Markdown
          </a>{' '}
          with{' '}
          <a
            href="https://katex.org/docs/support_table.html"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            KaTeX
          </a>
          , syntax highlighting, in-line HTML, table of contents, footnotes,
          auto-linking,{' '}
          <a
            href="https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            emoji codes
          </a>
          , and more.{' '}
        </p>
        <p>
          There are four editing modes in the Append Editor: Plain Textarea,
          CodeMirror, Dynamic, and Monaco. You can read about each mode and
          choose which to use in the Settings{' '}
          <span className="inline-text-and-svg">
            <span>(</span>
            <GearIcon role="img" />
            <span>)</span>
          </span>
          .
        </p>
        <p>
          The Append Editor also has built-in support for default and per-note
          font sizes, font families, and custom CSS. The menu{' '}
          <span className="inline-text-and-svg">
            <span>(</span>
            <MenuIcon role="img" />
            <span>)</span>
          </span>{' '}
          has additional options for customizing the appearance of the editor,
          sharing your note, and quick actions for editing.
        </p>
        <p>
          Please visit the documentation at{' '}
          <a
            href="https://appendeditor.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            appendeditor.com
          </a>{' '}
          for the full list of features and keyboard shortcuts.
        </p>
        <h3>How do I Install the Append Editor in Standard Notes?</h3>
        <ol>
          <li>
            Download, install, and sign in to the Standard Notes{' '}
            <a
              href="https://standardnotes.org/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              Desktop
            </a>{' '}
            app.
          </li>
          <li>
            In the bottom left corner of the app, click <b>Extensions</b>.
          </li>
          <li>
            Click <b>Import Extensions</b> and paste the following link into the
            input box. If you want to use the alpha version, replace{' '}
            <code>beta</code> with <code>alpha</code>:{' '}
            <code>
              <a
                href="https://raw.githubusercontent.com/TheodoreChu/append-editor/main/public/beta.ext.json"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://raw.githubusercontent.com/TheodoreChu/append-editor/main/public/beta.ext.json
              </a>
            </code>
          </li>
        </ol>
        <h3>What do I write about?</h3>
        Here are some questions to help you get started:
        <ul>
          <li>How are you? What's happening?</li>
          <li>What might be affecting your mood?</li>
          <li>Which feelings fit your mood and to what extent?</li>
          <details onToggle={this.onToggleShowFeelings}>
            <summary>
              {!this.state.showFeelings && [
                <p className="link">Show feelings</p>,
              ]}
              {this.state.showFeelings && [
                <p className="link">Hide feelings</p>,
              ]}
            </summary>
            <li>
              <b>Positive Feelings:</b> bold, calm, cheerful, confident,
              content, eager, ecstatic, energized, engaged, enthusiastic,
              excited, grateful, happy, humorous, inspired, joyful, light,
              lively, loving, motivated, optimistic, passionate, peaceful,
              playful, proud, reassured, refreshed, relaxed, relieved,
              satisfied, secure, surprised, thrilled, wonderful
            </li>
            <li>
              <b>Negative Feelings:</b> afraid, angry, annoyed, anxious,
              ashamed, bored, burnt out, confused, demoralized, depressed,
              disappointed, disgusted, distraught, embarrassed, empty,
              exhausted, frustrated, furious, guilty, heavy, insecure,
              irritated, jealous, jittery, lethargic, lonely, nervous, numb,
              resentful, sad, self-conscious, sleepy, stressed, tired, winded,
              worried
            </li>
          </details>
          <li>What thoughts are contributing to the way you're feeling?</li>
          <details onToggle={this.onToggleShowMoreQuestions}>
            <summary>
              {!this.state.showMoreQuestions && [
                <p className="link">Show more questions</p>,
              ]}
              {this.state.showMoreQuestions && [
                <p className="link">Show fewer questions</p>,
              ]}
            </summary>
          </details>
          {this.state.showMoreQuestions && [
            <div>
              <li>
                What do you hope your life will look like in a week? a month? a
                year?
              </li>
              <li>
                What can you do today to make your life the way you want it?
              </li>
              <li>
                How will you feel when you've realized the goals that you have
                for yourself?
              </li>
              <li>Who or what do you feel grateful for and why?</li>
              <li>What did you enjoy about today?</li>
            </div>,
          ]}
        </ul>
        <details onToggle={this.onToggleShowFeedback}>
          <summary>
            <p className="link">Need more help?</p>
          </summary>
          {this.state.showFeedback && [
            <p>
              Feel free to{' '}
              <a
                href="https://appendeditor.com/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                reach out
              </a>{' '}
              if you have any questions, comments, concerns, or feedback.{' '}
              <span role="img" aria-label="wave emoji">
                👋
              </span>
              <br />
              If you find any bugs or have a feature request, please{' '}
              <a
                href="https://github.com/TheodoreChu/append-editor/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                open an issue on GitHub
              </a>
              .{' '}
              <span role="img" aria-label="smile emoji">
                🙂
              </span>
              <br />
              You are using version <code>1.1.2</code>. The release notes and
              change log are available on{' '}
              <a
                href="https://github.com/TheodoreChu/append-editor/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>,
          ]}
        </details>
        Click&nbsp;
        <span className="inline-text-and-svg" onClick={this.onToggleShowHelp}>
          <span>(</span>
          <HelpIcon fill={'var(--sn-stylekit-info-color)'} role="button" />
          <span>)</span>
        </span>{' '}
        &nbsp;in the header to close this section.
        <hr></hr>
      </div>
    );
  }
}
