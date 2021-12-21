import React from "react";
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue
} from 'recoil';


const userwordsState = atom({
  key: 'userwordsState',
  default: {
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
});


const Word = function ({ word, status }) {
  const [userwords, setuserwords] = useRecoilState(userwordsState);

  const setToLearning = function (event) {
    let userwordsCopy = Object.assign({}, userwords);
    userwordsCopy[event.target.textContent.toLowerCase()] = 'learning';
    setuserwords(userwordsCopy);
  }

  return <span className={status + ' word'} onClick={setToLearning}>{word}</span>
};


const Phrase = function ({ phrase, status }) {
  const parts = phrase.split(' ');
  const userwords = useRecoilValue(userwordsState);

  return (
    <span className={status + ' phrase'}>
      {
        parts.map((word, index, array) => <><Word key={word + index} word={word} status={userwords[word.toLowerCase()]} />{index === array.length - 1 ? '' : ' '}</>)
      }
    </span>
  )
};


const Paragraph = function({ paragraph }) {
  const userwords = useRecoilValue(userwordsState);

  const phrases = Object.keys(userwords).filter(key => key.split(' ').length > 1);
  const phraseFinder = phrases.length === 0 ? '' : `(${phrases.join('|')})|`;
  const wordFinder = `(?<words>[\\p{Letter}\\p{Mark}'-]+)`;
  const noWordFinder = `(?<nowords>[^\\p{Letter}\\p{Mark}'-]+)`;

  const wordRegExp = new RegExp(wordFinder, 'gui');
  const tokenRegExp = new RegExp(`${phraseFinder}${wordFinder}|${noWordFinder}`, 'gui');

  const tokens = paragraph.match(tokenRegExp);


  return (
    <p>
      {
        tokens.map((token, index) => {
          if (phrases.includes(token)) return <Phrase key={token + index} phrase={token} status={userwords[token.toLowerCase()]} />;
          if (token.match(wordRegExp)) return <Word key={token + index} word={token} status={userwords[token.toLowerCase()]} />;
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
  const text = `It wás sö terriblý cold. Snow was falling, and it was almost dark. Evening came on, the last evening of the year.
In the cold and gloom a poor little girl, bareheaded and barefoot, was walking through the streets. Of course when she had left her house she'd had slippers on, but what good had they been?`;

  return (
    <RecoilRoot>
      <TextBody text={text} />
    </RecoilRoot>
  );
}

export default App;
