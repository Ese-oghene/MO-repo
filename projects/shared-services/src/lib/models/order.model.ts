export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category?: Category;
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: string;
  subtotal: number;
  product?: Product;
}

export interface User {
  id: number;
  name: string;
  phone_no: string;
}

export interface Order {
  id: number;
  user_id: number;
  total: string;
  status: string;
  created_at: string;
  updated_at: string;
  user?: User;
  order_items: OrderItem[];
}
