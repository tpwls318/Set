import { ICard } from "../card";
import { SHAPES_IDX, FILLS_IDX, COLORS_IDX } from "../config";
export const shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5);

export const drawCards = (arr: any[], n: number) => {
  let draggedCards: any[] = [];
  while (n > 0 && arr.length) {
    draggedCards.push(arr.pop());
    n--;
  }
  return draggedCards;
};

export const isSet = (cards: ICard[]) =>
  !(
    cards.reduce((acc, v) => acc + v.number, 0) % 3 ||
    cards.reduce((acc, v) => acc + SHAPES_IDX[v.shape], 0) % 3 ||
    cards.reduce((acc, v) => acc + FILLS_IDX[v.fill], 0) % 3 ||
    cards.reduce((acc, v) => acc + COLORS_IDX[v.color], 0) % 3
  );

export const hasSet = (cards: ICard[]) => {
  let sets: any = [];
  for (let i = 0; i < cards.length - 2; i++) {
    for (let j = i + 1; j < cards.length - 1; j++) {
      for (let k = j + 1; k < cards.length; k++) {
        if (isSet([i, j, k].map((v) => cards[v]))) {
          console.log([i, j, k]);
          return [i, j, k];
        }
      }
    }
  }
  return false;
};
