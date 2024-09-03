// GallerySlide.ts
export interface GallerySlide {
  category?: string;
  title: string;
  imgUrl: string;
  imgUrlWebp?: string;
  id: number;
  url?: string;
  videoUrl?: string;
  err?: string; // optional to match Item interface
}
