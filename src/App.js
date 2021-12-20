import React from "react";


const text = `It wás sö terriblý cold. Snow was falling, and it was almost dark. Evening came on, the last evening of the year.
In the cold and gloom a poor little girl, bareheaded and barefoot, was walking through the streets. Of course when she had left her house she'd had slippers on, but what good had they been?`;

const markedWords = {
  terriblý: 'learning',
  'was falling': 'familiar',
  falling: 'learning',
  evening: 'familiar',
  year: 'learning',
  'came on': 'learned',
  the: 'learned',
  'of course': 'learning',
  and: 'learned',
  street: 'familiar',
}

const phraseFinder = `(${Object.keys(markedWords).filter(key => key.split(' ').length > 1).join('|')})`
const wordFinder = `(?<words>[\\p{Letter}\\p{Mark}'-]+)`;
const noWordFinder = `(?<nowords>[^\\p{Letter}\\p{Mark}'-]+)`;

const phraseRegExp = new RegExp(phraseFinder, 'gui');
const wordRegExp = new RegExp(wordFinder, 'gui');
const tokenRegExp = new RegExp(`${phraseFinder}|${wordFinder}|${noWordFinder}`, 'gui');


const Word = function ({ word, status }) {
  return <span className={status + ' word'}>{word}</span>
};

const Phrase = function ({ phrase, status }) {
  return (
    <span className={status + ' phrase'}>
      {
        phrase.split(' ').map((word, index, array) => <><Word key={word + index} word={word} status={markedWords[word.toLowerCase()]} />{index === array.length - 1 ? '' : ' '}</>)
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
          if (token.match(phraseRegExp)) return <Phrase key={token + index} phrase={token} status={markedWords[token.toLowerCase()]} />;
          if (token.match(wordRegExp)) return <Word key={token + index} word={token} status={markedWords[token.toLowerCase()]} />;
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
