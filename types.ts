export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  rating: number;
  votes: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  priceForTwo: number;
  discount: string;
  image: string;
  menu: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface AISuggestion {
  dishName: string;
  reason: string;
  cuisine: string;
  estimatedCalories: string;
}

export enum ViewState {
  HOME = 'HOME',
  RESTAURANT_DETAILS = 'RESTAURANT_DETAILS',
}