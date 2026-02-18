export interface Menu {
  id?: number;
  name: string;
  description: string;
  price: number;
  category_id?: number;
  is_active?: number;
  image_url?: string;
  menu_date?: string;
}
