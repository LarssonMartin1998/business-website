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

function isStringValidDomain(value: string): boolean {
  if (value.length === 0 || value.length > 253) {
    return false;
  }

  // Domain cannot start or end with a hyphen or dot
  if (value.startsWith('-') || value.endsWith('-') || value.startsWith('.') || value.endsWith('.')) {
    return false;
  }

  if (value.includes('..')) {
    return false;
  }

  const domainRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!domainRegex.test(value)) {
    return false;
  }

  if (!value.includes('.')) {
    return false;
  }

  return true;
}

function isStringValidEmail(value: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) return false;

  const parts = value.split('@');
  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;
  if (localPart.length > 64) return false;
  if (domain.length > 253) return false;

  return isStringValidDomain(domain);
}

export { extractHeader, extractAndLimitBread, extractBread, limitText, sanitizeMarkdown, isStringValidDomain, isStringValidEmail };
