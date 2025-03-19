import { PropsWithChildren } from 'react';
import { Fragment } from 'react/jsx-runtime';

interface HighlightedTextProps {
  text: string;
  query: string;
  MatchComponent: React.ComponentType<PropsWithChildren<{ key?: string }>>;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, query, MatchComponent }) => {
  if (!query || !text) {
    return <>{text}</>;
  }

  // Escape special regex characters in the query and create a case-insensitive regex
  // const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${query})`, 'gi');

  // Split the text into parts based on the regex matches
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = regex.test(part);
        const Component = isMatch ? MatchComponent : Fragment;
        // eslint-disable-next-line react-x/no-array-index-key
        return <Component key={`${index}`}>{part}</Component>;
      })}
    </>
  );
};