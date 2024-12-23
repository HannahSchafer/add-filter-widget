import "@testing-library/jest-dom";

global.TextEncoder = class TextEncoder {
  encode(input: string): Uint8Array {
    return new Uint8Array([...input].map((char) => char.charCodeAt(0)));
  }

  get encoding(): string {
    return "utf-8";
  }
} as typeof TextEncoder;
