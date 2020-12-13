import React from 'react';
import { EyeIcon, HelpIcon, PencilIcon, PlusIcon } from './Icons';
import {
  clickAppendButton,
  clickEditButton,
  clickHelpButton,
  clickViewButton,
} from '../lib/clickButton';

const Intro: React.FC<any> = () => (
  <div id="intro">
    <details>
      <summary>
        Welcome to the Append Editor!{' '}
        <span role="img" aria-label="wave emoji">
          👋
        </span>{' '}
        Your note is empty.{' '}
        <span role="img" aria-label="smile emoji">
          🙂
        </span>
      </summary>
      <p>To get started:</p>
      <ul>
        <li>
          <p>
            Click the Pencil
            <button
              className="inline-text-and-svg"
              onClick={clickEditButton}
              title="Toggle Edit Mode"
            >
              <span>(</span>
              <PencilIcon role="button" />
              <span>) </span>
            </button>
            to open <b>Edit Mode</b>
          </p>
        </li>
        <li>
          <p>
            Click the Plus
            <button
              className="inline-text-and-svg"
              onClick={clickAppendButton}
              title="Toggle Append Mode"
            >
              <span>(</span>
              <PlusIcon role="button" />
              <span>)</span>
            </button>
            to open <b>Append Mode</b>
          </p>
        </li>
      </ul>
      <p>
        View Mode
        <button
          className="inline-text-and-svg"
          onClick={clickViewButton}
          title="Toggle View Mode"
        >
          <span>(</span>
          <EyeIcon condition={true} role="button" />
          <span>)</span>
        </button>
        is currently <b>on</b>. Your note will automatically render here when
        you type in <b>Edit Mode</b>. In <b>Append Mode</b>, clicking{' '}
        <b>Append</b> will add the text in the textarea to the end of your note.
      </p>
      <p>
        If you are using the demo at{' '}
        <a
          href="https://beta.appendeditor.com"
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          beta.appendeditor.com
        </a>
        , then your notes will be lost after you close the page.
      </p>
      <p>
        If you want to save your notes, then click Help
        <button
          className="inline-text-and-svg"
          onClick={clickHelpButton}
          title="Toggle show Help"
        >
          <span>(</span>
          <HelpIcon role="button" />
          <span>)</span>
        </button>
        at the top and follow the instructions on how to install the Append
        Editor in{' '}
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
        notes app.
      </p>
      <p>
        If you like Standard Notes, please check out Standard Notes{' '}
        <a
          href="https://standardnotes.org/extensions"
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          Extended
        </a>{' '}
        for more editors, themes, components, and methods to backup up your
        data.
      </p>
      <p>
        Happy note-taking!{' '}
        <span role="img" aria-label="smile emoji">
          😄
        </span>
      </p>
    </details>
  </div>
);

export default Intro;
