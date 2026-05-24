declare module "bidi-js" {
  type Direction = "ltr" | "rtl" | "auto";

  interface EmbeddingLevels {
    levels: Uint8Array;
    paragraphs: Array<{ start: number; end: number; level: number }>;
  }

  interface Bidi {
    getEmbeddingLevels(text: string, baseDirection?: Direction): EmbeddingLevels;
    getReorderedString(text: string, embeddingLevels: EmbeddingLevels): string;
  }

  export default function bidiFactory(): Bidi;
}
