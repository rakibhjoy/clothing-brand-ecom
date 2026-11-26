export const STUDIO_PIECES = [
  { id: 'wr-tee-02', label: 'Washed tee', sheet: '/images/studio/navy-angles.jpg' },
  { id: 'wr-denim-01', label: 'Baggy denim', sheet: '/images/studio/denim-angles.jpg' },
  { id: 'wr-shirt-01', label: 'Check flannel', sheet: '/images/studio/flannel-angles.jpg' }
];

export function getStudioPiece(id) {
  return STUDIO_PIECES.find((piece) => piece.id === id);
}
