import { Restaurant } from './types';

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: "Luigi's Italian Trattoria",
    cuisine: ["Italian", "Pizza", "Pasta"],
    rating: 4.5,
    deliveryTime: "30-40 min",
    priceForTwo: 40,
    discount: "20% OFF",
    image: "https://picsum.photos/500/300?random=1",
    menu: [
      {
        id: '101',
        name: "Margherita Pizza",
        description: "Classic tomato sauce, fresh mozzarella, and basil.",
        price: 14,
        image: "https://picsum.photos/200/200?random=101",
        isVeg: true,
        rating: 4.8,
        votes: 120
      },
      {
        id: '102',
        name: "Fettuccine Alfredo",
        description: "Rich creamy parmesan sauce over pasta.",
        price: 16,
        image: "https://picsum.photos/200/200?random=102",
        isVeg: true,
        rating: 4.2,
        votes: 85
      },
      {
        id: '103',
        name: "Chicken Parmigiana",
        description: "Breaded chicken breast topped with marinara and cheese.",
        price: 19,
        image: "https://picsum.photos/200/200?random=103",
        isVeg: false,
        rating: 4.6,
        votes: 200
      }
    ]
  },
  {
    id: '2',
    name: "Spice Route",
    cuisine: ["Indian", "Curry", "Biryani"],
    rating: 4.2,
    deliveryTime: "25-35 min",
    priceForTwo: 35,
    discount: "Free Delivery",
    image: "https://picsum.photos/500/300?random=2",
    menu: [
      {
        id: '201',
        name: "Butter Chicken",
        description: "Tender chicken in a rich tomato and butter gravy.",
        price: 18,
        image: "https://picsum.photos/200/200?random=201",
        isVeg: false,
        rating: 4.9,
        votes: 500
      },
      {
        id: '202',
        name: "Paneer Tikka",
        description: "Marinated cottage cheese grilled in tandoor.",
        price: 15,
        image: "https://picsum.photos/200/200?random=202",
        isVeg: true,
        rating: 4.4,
        votes: 150
      }
    ]
  },
  {
    id: '3',
    name: "Sushi Zen",
    cuisine: ["Japanese", "Sushi", "Asian"],
    rating: 4.8,
    deliveryTime: "40-50 min",
    priceForTwo: 60,
    discount: "10% OFF",
    image: "https://picsum.photos/500/300?random=3",
    menu: [
      {
        id: '301',
        name: "Salmon Sashimi",
        description: "Fresh slices of premium salmon.",
        price: 22,
        image: "https://picsum.photos/200/200?random=301",
        isVeg: false,
        rating: 4.9,
        votes: 300
      },
      {
        id: '302',
        name: "Avocado Maki",
        description: "Sushi roll filled with fresh avocado.",
        price: 12,
        image: "https://picsum.photos/200/200?random=302",
        isVeg: true,
        rating: 4.5,
        votes: 90
      }
    ]
  },
  {
    id: '4',
    name: "Burger Kingpin",
    cuisine: ["American", "Fast Food", "Burgers"],
    rating: 4.0,
    deliveryTime: "20-30 min",
    priceForTwo: 25,
    discount: "BOGO",
    image: "https://picsum.photos/500/300?random=4",
    menu: [
      {
        id: '401',
        name: "Double Cheese Whopper",
        description: "Two flame-grilled patties with melted cheese.",
        price: 11,
        image: "https://picsum.photos/200/200?random=401",
        isVeg: false,
        rating: 4.3,
        votes: 1200
      },
      {
        id: '402',
        name: "Crispy Fries",
        description: "Golden salted fries.",
        price: 5,
        image: "https://picsum.photos/200/200?random=402",
        isVeg: true,
        rating: 4.1,
        votes: 800
      }
    ]
  },
   {
    id: '5',
    name: "Dragon Wok",
    cuisine: ["Chinese", "Asian"],
    rating: 4.3,
    deliveryTime: "30-40 min",
    priceForTwo: 30,
    discount: "15% OFF",
    image: "https://picsum.photos/500/300?random=5",
    menu: [
      {
        id: '501',
        name: "Kung Pao Chicken",
        description: "Spicy stir-fry with chicken, peanuts, and vegetables.",
        price: 16,
        image: "https://picsum.photos/200/200?random=501",
        isVeg: false,
        rating: 4.5,
        votes: 220
      }
    ]
  },
  {
    id: '6',
    name: "Taco Fiesta",
    cuisine: ["Mexican", "Tacos"],
    rating: 4.6,
    deliveryTime: "25-35 min",
    priceForTwo: 28,
    discount: "",
    image: "https://picsum.photos/500/300?random=6",
    menu: [
      {
        id: '601',
        name: "Beef Tacos (3pcs)",
        description: "Crunchy shells with seasoned beef and lettuce.",
        price: 12,
        image: "https://picsum.photos/200/200?random=601",
        isVeg: false,
        rating: 4.7,
        votes: 310
      }
    ]
  }
];

export const CUISINES = [
  { name: 'Italian', img: 'https://picsum.photos/100/100?random=50' },
  { name: 'Burger', img: 'https://picsum.photos/100/100?random=51' },
  { name: 'Indian', img: 'https://picsum.photos/100/100?random=52' },
  { name: 'Pizza', img: 'https://picsum.photos/100/100?random=53' },
  { name: 'Chinese', img: 'https://picsum.photos/100/100?random=54' },
  { name: 'Healthy', img: 'https://picsum.photos/100/100?random=55' },
];