#!/usr/bin/env -S tsx

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { raw, twPrefixes, twStateVariants } from 'design-system/colors';

const colours = Object.values(raw);
const variants = ['', ...twStateVariants] as const;

const classes: string[] = [];
for (const variant of variants)
  for (const prefix of twPrefixes)
    for (const colour of colours)
      classes.push(variant ? `${variant}:${prefix}-${colour}`
        : `${prefix}-${colour}`);

const fileContent = `
/*
${classes.join('\n')}
*/
`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../src/design-system/generated');
await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, 'colors_safelist.ts'), fileContent);

console.log('✓ colors_safelist.ts generated');
