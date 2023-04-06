const generateConst = (keys: string[]) => {
  return keys.reduce((acc: any, v) => {
    acc[v] = v.toLowerCase();
    return acc;
  }, {});
};
export const SHAPES = {
  DIAMOND: "diamond",
  SQUIGGLE: "squiggle",
  OVAL: "oval",
} as const;

export const FILLS = {
  STRIPED: "striped",
  OPEN: "open",
  SOLID: "solid",
} as const;

export const COLORS = {
  RED: "red",
  GREEN: "green",
  PURPLE: "purple",
} as const;

export const SHAPES_IDX = {
  diamond: 1,
  squiggle: 2,
  oval: 3,
};

export const FILLS_IDX = {
  striped: 1,
  open: 2,
  solid: 3,
};

export const COLORS_IDX = {
  red: 1,
  green: 2,
  purple: 3,
};

interface IPath {
  d: string;
  fill?: string;
}

interface IPaths {
  diamond: IPath;
  squiggle: IPath;
  oval: IPath;
}

export const paths: IPaths = {
  diamond: {
    d: "M25 0 L50 50 L25 100 L0 50 Z",
  },
  squiggle: {
    d: "M38.4,63.4c0,16.1,11,19.9,10.6,28.3c-0.5,9.2-21.1,12.2-33.4,3.8s-15.8-21.2-9.3-38c3.7-7.5,4.9-14,4.8-20 c0-16.1-11-19.9-10.6-28.3C1,0.1,21.6-3,33.9,5.5s15.8,21.2,9.3,38C40.4,50.6,38.5,57.4,38.4,63.4z",
  },
  oval: {
    d: "M25,99.5C14.2,99.5,5.5,90.8,5.5,80V20C5.5,9.2,14.2,0.5,25,0.5S44.5,9.2,44.5,20v60 C44.5,90.8,35.8,99.5,25,99.5z",
  },
};

export const colors = {
  red: "#e74c3c",
  green: "#27ae60",
  purple: "#8e44ad",
};
