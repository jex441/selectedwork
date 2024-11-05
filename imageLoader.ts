'use client';

export default function cloudinaryLoader({
  width,
  quality,
}: {
  width: number;
  quality?: string;
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  return `https://res.cloudinary.com/jeffreywood/image/upload/c_crop/v1730744750/Rectangle_247_aet16y.png`;
}
