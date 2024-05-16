export interface ICouponCardData {
  id: number;
  is_fav: number;
  is_new: number;
  rate: number;
  discount_range: number;
  status: number;
  last_used: string;
  brand_logo: string;
  link: string;
  title: string;
  subtitle: string;
  code: string | number;
  brand_name: string;
  brand_id: string;
  featured: number;
  used: number;
  type: string;
  details?: string;
  image: string;
}
