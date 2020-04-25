declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    button: any;
    div: any;
  }
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare type UnionOf<T> = T[keyof T];
