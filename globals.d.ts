declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    button: any;
    div: any;
  }
}

declare type UnionOf<T> = T[keyof T];
