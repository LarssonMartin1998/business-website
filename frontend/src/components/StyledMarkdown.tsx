import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { twMerge } from 'tailwind-merge';

import { bg, border, raw, text } from 'design-system/colors';

interface StyledMarkdownProps {
  markdownText: string;
}

function StyledMarkdown({ markdownText }: StyledMarkdownProps) {
  const inlineCodeStyle = twMerge(
    bg(raw.fogGreyLight),
    border(raw.graniteGrey),
    text(raw.pineInkLight),
    'px-1.5 py-0.5 border-1 text-sm font-mono'
  );

  return (
    <div className={text('defaultCard')}>
      <Markdown
        components={{
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),

          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4 first:mt-0 mt-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mb-3 first:mt-0 mt-5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold mb-3 first:mt-0 mt-4">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-bold mb-2 first:mt-0 mt-4">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-bold mb-2 first:mt-0 mt-3">{children}</h5>
          ),

          ul: ({ children }) => (
            <ul className="mb-4 pl-6 list-disc space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 pl-6 list-decimal space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              className={twMerge(
                text(raw.emberBark),
                'hover:underline font-medium'
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !className?.includes('language-');

            if (isInline) {
              return (
                <code className={inlineCodeStyle} {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="my-4">
                <SyntaxHighlighter
                  style={gruvboxLight}
                  language={match ? match[1] : 'text'}
                  PreTag="div"
                  showLineNumbers={true}
                  customStyle={{
                    margin: 0,
                    padding: '0.5rem',
                    backgroundColor: 'var(--color-fog-grey-light)',
                    border: '1px solid var(--color-granite-grey)',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            );
          },
        }}
      >
        {markdownText}
      </Markdown>
    </div>
  );
}

export default StyledMarkdown;
