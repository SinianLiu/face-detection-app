import { RankProps } from '../../interface/interface';
import { useEffect, useState } from 'react';

const Rank = ({ name, entries }: RankProps) => {
  const [emoji, setEmoji] = useState<string>('');

  useEffect(() => {
    generateEmoji(entries);
  }, [entries]);

  const generateEmoji = (entries: number) => {
    fetch(
      `https://zy3z5n6g53.execute-api.us-east-1.amazonaws.com/count?count=${entries}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmoji(data.input);
      })
      .catch(console.log);
  };

  return (
    <div>
      <div className="white f3">{`${name}, your current entry count is...`}</div>
      <div className="white f1">{entries}</div>
      <div className="white f3">{`Count Badge: ${emoji}`}</div>
    </div>
  );
};

export default Rank;

