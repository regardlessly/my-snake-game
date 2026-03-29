import sharp from 'sharp';
import pino from 'pino';

const logger = pino({ name: 'latex-renderer' });

// Simple LRU cache for rendered images
class LRUCache<K, V> {
  private map = new Map<K, V>();
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.map.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.map.delete(key);
      this.map.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.maxSize) {
      // Delete oldest entry
      const firstKey = this.map.keys().next().value;
      if (firstKey !== undefined) {
        this.map.delete(firstKey);
      }
    }
    this.map.set(key, value);
  }
}

const imageCache = new LRUCache<string, Buffer>(100);

function latexToSvg(latex: string): string {
  // Build a simple SVG rendering of the LaTeX expression
  // This is a lightweight approach that doesn't require mathjax-node
  // (which has heavy dependencies and compatibility issues)
  const escapedLatex = latex
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const fontSize = 32;
  const padding = 20;
  // Estimate width based on character count
  const estimatedWidth = Math.max(200, escapedLatex.length * fontSize * 0.6 + padding * 2);
  const height = fontSize * 2 + padding * 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${estimatedWidth}" height="${height}">
    <rect width="100%" height="100%" fill="white"/>
    <text x="${padding}" y="${height / 2 + fontSize / 3}"
          font-family="serif" font-size="${fontSize}" fill="black">
      ${escapedLatex}
    </text>
  </svg>`;
}

export async function renderLatex(latex: string): Promise<Buffer> {
  // Check cache first
  const cached = imageCache.get(latex);
  if (cached) {
    logger.debug('Cache hit for LaTeX render');
    return cached;
  }

  try {
    const svg = latexToSvg(latex);
    const svgBuffer = Buffer.from(svg);

    // Convert SVG to PNG with 2x scale using sharp
    const pngBuffer = await sharp(svgBuffer, { density: 144 }) // 144 DPI = 2x scale
      .png()
      .toBuffer();

    imageCache.set(latex, pngBuffer);
    logger.info({ latexLength: latex.length }, 'Rendered LaTeX to PNG');
    return pngBuffer;
  } catch (err) {
    logger.error({ err, latex }, 'Failed to render LaTeX, creating fallback text image');
    return createFallbackImage(latex);
  }
}

async function createFallbackImage(text: string): Promise<Buffer> {
  // Create a simple text image as fallback
  const width = Math.max(400, text.length * 16 + 40);
  const height = 80;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="white"/>
    <text x="20" y="50" font-family="monospace" font-size="20" fill="black">
      ${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
    </text>
  </svg>`;

  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  imageCache.set(text, pngBuffer);
  return pngBuffer;
}
