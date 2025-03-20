import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HighlightedText } from './HighlightedText';
import { PropsWithChildren } from 'react';

const MatchComponent: React.FC<PropsWithChildren> = ({ children }) => {
  return (<span>{ children }</span>);
};

describe('HighlightedText', () => {
  it('renders with no match', () => {
    const testId = 'A';
    render(
      <span data-testId={testId}>
        <HighlightedText
          text="foo"
          query="bar"
          MatchComponent={MatchComponent}
        />
      </span>
    );
    expect(screen.getAllByTestId('A')).toMatchSnapshot();
  });

  it('renders with full match', () => {
    const testId = 'B';
    render(
      <span data-testId={testId}>
        <HighlightedText
          text="foo"
          query="foo"
          MatchComponent={MatchComponent}
        />
      </span>
    );
    expect(screen.getAllByTestId(testId)).toMatchSnapshot();
  });

  it('renders with partial match', () => {
    const testId = 'C';
    render(
      <span data-testId={testId}>
        <HighlightedText
          text="a foo b"
          query="foo"
          MatchComponent={MatchComponent}
        />
      </span>
    );
    expect(screen.getAllByTestId(testId)).toMatchSnapshot();
  });

  it('renders with partial match in word', () => {
    const testId = 'C';
    render(
      <span data-testId={testId}>
        <HighlightedText
          text="afoob"
          query="foo"
          MatchComponent={MatchComponent}
        />
      </span>
    );
    expect(screen.getAllByTestId(testId)).toMatchSnapshot();
  });

  it('renders with multiple matches', () => {
    const testId = 'D';
    render(
      <span data-testId={testId}>
        <HighlightedText
          text="a foo b foo"
          query="foo"
          MatchComponent={MatchComponent}
        />
      </span>
    );
    expect(screen.getAllByTestId(testId)).toMatchSnapshot();
  });

  it('renders with adjacent matches', () => {
    const testId = 'E';
    render(
      <span data-testId={testId}>
        <HighlightedText
          text="a foofoo"
          query="foo"
          MatchComponent={MatchComponent}
        />
      </span>
    );
    expect(screen.getAllByTestId(testId)).toMatchSnapshot();
  });

  it('renders with matches containing regex characters', () => {
    const testId = 'F';
    render(
      <span data-testId={testId}>
        <HighlightedText
          text="a f$o\[o"
          query="f$o\[o"
          MatchComponent={MatchComponent}
        />
      </span>
    );
    expect(screen.getAllByTestId(testId)).toMatchSnapshot();
  });
});
