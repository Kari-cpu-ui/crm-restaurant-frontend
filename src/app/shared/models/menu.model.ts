export interface Pizza {
    id: number;
    name: string;
    category: string;
    description?: string;
    price: number;
}

export interface Menu {
    id: number;
    name: string;
    menu_date: Date;
    description: string;
    price: number;
    category_id: string;
    is_active: number;
    image_url: string;
}
