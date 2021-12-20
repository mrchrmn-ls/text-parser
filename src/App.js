import React from "react";


const text = `It wás sö terriblý cold. 
Snow was falling, and it was almost dark. 
Evening came on, the last evening of the year.`;

const markedWords = {
  terriblý: 'learning',
  'was falling': 'familiar',
  falling: 'learning',
  evening: 'learned',
  year: 'learning',
  'came on': 'learned',
}

const phraseFinder = `(${Object.keys(markedWords).filter(key => key.split(' ').length > 1).join('|')})`
const wordFinder = `(?<words>[\\p{Letter}\\p{Mark}'-]+)`;
const noWordFinder = `(?<nowords>[^\\p{Letter}\\p{Mark}'-]+)`;

const phraseRegExp = new RegExp(phraseFinder, 'gu');
const wordRegExp = new RegExp(wordFinder, 'gu');
const tokenRegExp = new RegExp(`${phraseFinder}|${wordFinder}|${noWordFinder}`, 'gu');


const Word = function ({ word, status }) {
  return <span className={status}>{word}</span>
};

const Phrase = function ({ phrase, status }) {
  return (
    <span className={status + ' phrase'}>
      {
        phrase.split(' ').map((word, index, array) => <><Word key={word + index} word={word} status={markedWords[word]} />{index === array.length - 1 ? '' : ' '}</>)
      }
    </span>
  )
};

const Paragraph = function({ paragraph }) {
  const tokens = paragraph.match(tokenRegExp);
 
  return (
    <p>
      {
        tokens.map((token, index) => {
          if (token.match(phraseRegExp)) return <Phrase key={token + index} phrase={token} status={markedWords[token]} />;
          if (token.match(wordRegExp)) return <Word key={token + index} word={token} status={markedWords[token]} />;
          return <span key={token + index}>{token}</span>;
        })
      }
    </p>
  );  
}

const TextBody = function ({ text }) {
  const paragraphs = text.split('\n');

  return (
    <div>
      {
        paragraphs.map((paragraph, index) => <Paragraph key={index} paragraph={paragraph} />)
      }
    </div>
  );
};

const App = function () {
  return (
    <>
      <TextBody text={text} />
    </>
  );
}

export default App;
