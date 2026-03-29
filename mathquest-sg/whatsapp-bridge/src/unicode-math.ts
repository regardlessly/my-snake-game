const superscriptMap: Record<string, string> = {
  '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3',
  '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077',
  '8': '\u2078', '9': '\u2079',
  'a': '\u1D43', 'b': '\u1D47', 'c': '\u1D9C', 'd': '\u1D48',
  'e': '\u1D49', 'f': '\u1DA0', 'g': '\u1D4D', 'h': '\u02B0',
  'i': '\u2071', 'j': '\u02B2', 'k': '\u1D4F', 'l': '\u02E1',
  'm': '\u1D50', 'n': '\u207F', 'o': '\u1D52', 'p': '\u1D56',
  'r': '\u02B3', 's': '\u02E2', 't': '\u1D57', 'u': '\u1D58',
  'v': '\u1D5B', 'w': '\u02B7', 'x': '\u02E3', 'y': '\u02B8',
  'z': '\u1DBB',
  '+': '\u207A', '-': '\u207B', '=': '\u207C',
  '(': '\u207D', ')': '\u207E',
};

const subscriptMap: Record<string, string> = {
  '0': '\u2080', '1': '\u2081', '2': '\u2082', '3': '\u2083',
  '4': '\u2084', '5': '\u2085', '6': '\u2086', '7': '\u2087',
  '8': '\u2088', '9': '\u2089',
  'a': '\u2090', 'e': '\u2091', 'h': '\u2095', 'i': '\u1D62',
  'j': '\u2C7C', 'k': '\u2096', 'l': '\u2097', 'm': '\u2098',
  'n': '\u2099', 'o': '\u2092', 'p': '\u209A', 'r': '\u1D63',
  's': '\u209B', 't': '\u209C', 'u': '\u1D64', 'v': '\u1D65',
  'x': '\u2093',
  '+': '\u208A', '-': '\u208B', '=': '\u208C',
  '(': '\u208D', ')': '\u208E',
};

const commonFractions: Record<string, string> = {
  '1/2': '\u00BD',
  '1/3': '\u2153',
  '2/3': '\u2154',
  '1/4': '\u00BC',
  '3/4': '\u00BE',
  '1/5': '\u2155',
  '2/5': '\u2156',
  '3/5': '\u2157',
  '4/5': '\u2158',
  '1/6': '\u2159',
  '5/6': '\u215A',
  '1/7': '\u2150',
  '1/8': '\u215B',
  '3/8': '\u215C',
  '5/8': '\u215D',
  '7/8': '\u215E',
  '1/9': '\u2151',
  '1/10': '\u2152',
};

const symbolReplacements: [RegExp, string][] = [
  [/\\pi/g, '\u03C0'],
  [/\\theta/g, '\u03B8'],
  [/\\alpha/g, '\u03B1'],
  [/\\beta/g, '\u03B2'],
  [/\\gamma/g, '\u03B3'],
  [/\\delta/g, '\u03B4'],
  [/\\epsilon/g, '\u03B5'],
  [/\\lambda/g, '\u03BB'],
  [/\\mu/g, '\u03BC'],
  [/\\sigma/g, '\u03C3'],
  [/\\omega/g, '\u03C9'],
  [/\\phi/g, '\u03C6'],
  [/\\times/g, '\u00D7'],
  [/\\div/g, '\u00F7'],
  [/\\pm/g, '\u00B1'],
  [/\\mp/g, '\u2213'],
  [/\\leq/g, '\u2264'],
  [/\\geq/g, '\u2265'],
  [/\\neq/g, '\u2260'],
  [/\\approx/g, '\u2248'],
  [/\\equiv/g, '\u2261'],
  [/\\infty/g, '\u221E'],
  [/\\sum/g, '\u03A3'],
  [/\\prod/g, '\u03A0'],
  [/\\int/g, '\u222B'],
  [/\\partial/g, '\u2202'],
  [/\\nabla/g, '\u2207'],
  [/\\forall/g, '\u2200'],
  [/\\exists/g, '\u2203'],
  [/\\in/g, '\u2208'],
  [/\\notin/g, '\u2209'],
  [/\\subset/g, '\u2282'],
  [/\\supset/g, '\u2283'],
  [/\\cup/g, '\u222A'],
  [/\\cap/g, '\u2229'],
  [/\\emptyset/g, '\u2205'],
  [/\\rightarrow/g, '\u2192'],
  [/\\leftarrow/g, '\u2190'],
  [/\\Rightarrow/g, '\u21D2'],
  [/\\Leftarrow/g, '\u21D0'],
  [/\\leftrightarrow/g, '\u2194'],
  [/\\therefore/g, '\u2234'],
  [/\\because/g, '\u2235'],
  [/\\angle/g, '\u2220'],
  [/\\degree/g, '\u00B0'],
  [/\\circ/g, '\u00B0'],
  [/\\cdot/g, '\u00B7'],
  [/\\ldots/g, '\u2026'],
  [/\\cdots/g, '\u22EF'],
];

function toSuperscript(s: string): string {
  return s.split('').map(c => superscriptMap[c] ?? c).join('');
}

function toSubscript(s: string): string {
  return s.split('').map(c => subscriptMap[c] ?? c).join('');
}

function extractBraced(text: string, startIndex: number): { content: string; endIndex: number } | null {
  if (startIndex >= text.length || text[startIndex] !== '{') {
    return null;
  }
  let depth = 0;
  let i = startIndex;
  while (i < text.length) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      depth--;
      if (depth === 0) {
        return { content: text.slice(startIndex + 1, i), endIndex: i };
      }
    }
    i++;
  }
  return null;
}

export function latexToUnicode(text: string): string {
  let result = text;

  // Handle \frac{a}{b} - check common fractions first, then fall back to a/b
  let fracMatch: RegExpExecArray | null;
  const fracRegex = /\\frac\s*\{([^}]*)\}\s*\{([^}]*)\}/g;
  while ((fracMatch = fracRegex.exec(result)) !== null) {
    const num = fracMatch[1]!;
    const den = fracMatch[2]!;
    const key = `${num}/${den}`;
    const replacement = commonFractions[key] ?? `${num}/${den}`;
    result = result.slice(0, fracMatch.index) + replacement + result.slice(fracMatch.index + fracMatch[0].length);
    fracRegex.lastIndex = fracMatch.index + replacement.length;
  }

  // Handle \sqrt{x} -> sqrt(x)
  result = result.replace(/\\sqrt\s*\{([^}]*)\}/g, '\u221A($1)');
  // Handle simple \sqrt x
  result = result.replace(/\\sqrt\s+([a-zA-Z0-9])/g, '\u221A$1');

  // Handle superscripts: x^{abc} and x^2 (single char)
  let processed = '';
  let i = 0;
  while (i < result.length) {
    if (result[i] === '^') {
      if (i + 1 < result.length && result[i + 1] === '{') {
        const braced = extractBraced(result, i + 1);
        if (braced) {
          processed += toSuperscript(braced.content);
          i = braced.endIndex + 1;
          continue;
        }
      } else if (i + 1 < result.length) {
        processed += toSuperscript(result[i + 1]!);
        i += 2;
        continue;
      }
    }
    if (result[i] === '_') {
      if (i + 1 < result.length && result[i + 1] === '{') {
        const braced = extractBraced(result, i + 1);
        if (braced) {
          processed += toSubscript(braced.content);
          i = braced.endIndex + 1;
          continue;
        }
      } else if (i + 1 < result.length) {
        processed += toSubscript(result[i + 1]!);
        i += 2;
        continue;
      }
    }
    processed += result[i];
    i++;
  }
  result = processed;

  // Apply symbol replacements
  for (const [pattern, replacement] of symbolReplacements) {
    result = result.replace(pattern, replacement);
  }

  // Clean up remaining LaTeX commands that weren't handled
  // Remove \text{...} wrapper, keep content
  result = result.replace(/\\text\s*\{([^}]*)\}/g, '$1');
  // Remove \left and \right
  result = result.replace(/\\left/g, '');
  result = result.replace(/\\right/g, '');
  // Remove \, \; \! \quad spacing commands
  result = result.replace(/\\[,;!]/g, ' ');
  result = result.replace(/\\quad/g, '  ');
  // Remove remaining $ delimiters
  result = result.replace(/\$/g, '');

  return result.trim();
}
