import { Card1, Card2, Card3 } from "./assets/cards";

export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  stars: number;
  description: string;
  image: string;
}

export const hotels: Hotel[] = [
  {
    id: 0,
    name: "Harmony Hideaway Hotel",
    location: "France",
    price: 100,
    stars: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec. ",
    image: Card1,
  },
  {
    id: 1,
    name: "Harmony Hideaway Hotel",
    location: "Florence",
    price: 200,
    stars: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec. ",
    image: Card2,
  },
  {
    id: 2,
    name: "Hotel 3",
    location: "Wroclaw",
    price: 300,
    stars: 3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec. ",
    image: Card3,
  },
];
