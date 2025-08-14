function extractHeader(content: string): string {
  const lines = content.split('\n');
  const headerLine = lines.find(line => line.trim().startsWith('#'));
  if (!headerLine) return 'Missing Title';
  let header = headerLine.replace(/^#+\s*/, '').trim();
  header = header.replace(/<[^>]*>/g, ''); // Remove any HTML tags
  return header;
}

function extractBread(content: string): string {
  const lines = content.split('\n').slice(1);
  return lines.join('\n').trim();
}

function limitText(content: string, maxLength: number): string {
  if (content.length > maxLength) {
    content = content.slice(0, maxLength).trim() + '...';
  }

  return content;
}

function sanitizeMarkdown(content: string): string {
  return content.replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/__(.*?)__/g, '$1')     // underline
    .replace(/`(.*?)`/g, '$1')       // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/---/g, '')             // horizontal rule
    .replace(/#+\s/g, '')            // headers
    .replace(/<[^>]*>/g, '');        // HTML tags
}

function extractAndLimitBread(content: string): string {
  let bread = extractBread(content);
  bread = sanitizeMarkdown(bread);
  const maxLength = 100;
  return limitText(bread, maxLength);
}

export { extractHeader, extractAndLimitBread, extractBread, limitText, sanitizeMarkdown };
