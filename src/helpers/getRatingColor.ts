export enum RatingType {
  low,
  mid,
  high,
}

export const getRatingColor = (rating: number) => {
  if (rating >= 7) {
    return RatingType.high;
  }
  if (rating >= 5) {
    return RatingType.mid;
  }

  return RatingType.low;
};
