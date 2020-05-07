import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

const math = require('remark-math');
const rehypeKatex = require('rehype-katex')
const highlight = require('rehype-highlight');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const toc = require('remark-toc');
const footnotes = require('remark-footnotes');
const slug = require('remark-slug');

var processor = unified()
  .use(parse)
  .use(slug)
  .use(toc, {maxDepth:6})
  .use(externalLinks)
  .use(footnotes, {inlineNotes: true})
  .use(remark2rehype)
  .use(math)
  .use(rehypeKatex) 
  .use(highlight, {ignoreMissing: true})
  .use(emoji)
  .use(rehype2react, {createElement: React.createElement})

export default class ViewNote extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    text: this.props.text,
    viewMode: this.props.viewMode,
    showHelp: this.props.showHelp,
    showFeelings: false,
    showMoreQuestions: false,
    showFeedback: false,
    };
    //this.onChange = this.onChange.bind(this);
  }

  onToggleShowFeelings = () => {
    this.setState({
      showFeelings: !this.state.showFeelings
    });
  };

  onToggleShowMoreQuestions = () => {
    this.setState({
      showMoreQuestions: !this.state.showMoreQuestions
    });
  };

  onToggleShowFeedback = () => {
    this.setState({
      showFeedback: !this.state.showFeedback
    });
  };

  render() {
    const { text } = this.props;

    return (
      <div className="sk-panel main">
        <div className="sk-panel-content view">
          <div className="sk-panel-section">
          <div className="note-entry">
          <div className="note-details">
          <div className="note-info">
          { (!text) && ([
            <div className="note-content">
              <div style={{textAlign: "center"}}>
              <details><summary>
              Welcome to the Append Editor! 👋 Your note is empty. 🙂</summary>
              <br></br>      
              Click <strong>Edit</strong> at the top ⬆️ or <strong>Append</strong> at the bottom ⬇️ to add to your note. 📝
              <br></br><br></br>
              Click <strong>Help</strong> in the top menu to learn more about this editor.
              <br></br><br></br>
              Happy note-taking! 😄
              </details>
              </div>
            </div>
          ])}
          { this.state.showHelp && ([
            <div className="note-content">
              <hr></hr>
              <h3>How do I use the Append Editor?</h3>
              This editor supports <a href="https://guides.github.com/features/mastering-markdown/" target="_blank" rel="nofollow noreferrer noopener">GitHub flavored Markdown</a>, <a href="https://katex.org/docs/support_table.html" target="_blank" rel="nofollow noreferrer noopener">LaTeX via KaTeX</a>, and <a href="https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md" target="_blank" rel="nofollow noreferrer noopener">Emoji codes</a>. For the full list of keyboard shortcuts, please visit <a href="https://docs.standardnotes.org/editing/append-editor" target="_blank" rel="noreferrer noopener">docs.standardnotes.org/editing/append-editor</a>.
              <h3>What do I write about?</h3>
              Here are some questions to help you get started:
              <ul>
                <li>How are you? What's happening?</li>
                <li>What might be affecting your mood?</li>
                <li>Which feelings fit your mood and to what extent?</li>
                <li>What thoughts are contributing to the way you're feeling?</li>
                  <details onToggle={this.onToggleShowFeelings}>
                  <summary>
                    {!this.state.showFeelings && ([<a>Show feelings</a>])}
                    {this.state.showFeelings && ([<a>Hide feelings</a>])}</summary>
                  <ul>
                    <li>Positive Feelings: bold, calm, cheerful, confident, content, eager, ecstatic, energized, engaged, enthusiastic, excited, grateful, happy, humorous, inspired, joyful, light, lively, loving, motivated, optimistic, passionate, peaceful, playful, proud, reassured, refreshed, relaxed, relieved, satisfied, secure, surprised, thrilled, wonderful</li>
                    <li>Negative Feelings: afraid, angry, annoyed, anxious, ashamed, bored, burnt out, confused, demoralized, depressed, disappointed, disgusted, distraught, embarrassed, empty, exhausted, frustrated, furious, guilty, heavy, insecure, irritated, jealous, jittery, lethargic, lonely, nervous, numb, resentful, sad, self-conscious, sleepy, stressed, tired, winded, worried</li>
                  </ul>
                  </details>
                  <details onToggle={this.onToggleShowMoreQuestions}>
                    <summary>
                    {!this.state.showMoreQuestions && ([<a>Show more questions</a>])}
                    {this.state.showMoreQuestions && ([<a>Show fewer questions</a>])}
                    </summary>
                  </details>
                {this.state.showMoreQuestions &&([
                <div>
                <li>What do you hope your life will look like in a week? a month? a year?</li>
                <li>What can you do today to make your life the way you want it?</li>
                <li>How will you feel when you've realized the goals that you have for yourself?</li>
                <li>Who or what do you feel grateful for and why?</li>
                <li>What did you enjoy about today?</li>
                </div>
                ])}
              </ul>
              <details onToggle={this.onToggleShowFeedback}>
                <summary><a>Give feedback</a></summary>
                {this.state.showFeedback && ([
                <div>
                We love hearing from users. 🙂 Please visit <a href="https://standardnotes.org/help" target="_blank" rel="noreferrer noopener">standardnotes.org/help</a> with all of the questions, comments, and concerns that you may have. 👋
                <br></br><br></br>
                </div>
                ])}
              </details>
              Click <strong>Help</strong> in the top menu to close this section.
              <hr></hr>
            </div>
          ])}
          { text && ([
            <div className="note-content">
              {processor.processSync(text).result}
              </div>,
            ])}
          </div>
          </div>
          <div className="note-options">
          </div>
          </div>
          </div>
        </div>
      </div>
  );
  }
}
