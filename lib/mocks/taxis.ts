export interface Taxi {
  id: number;
  name: string;
  seats: number;
  wait_time: string;
  price: number;
  perKm: number | null;
  description: string;
  image: string;
  free_cancel: boolean;
}

export function getMockTaxis(): Taxi[] {
  return [
    {
      id: 1,
      name: "Эконом",
      seats: 4,
      wait_time: "5-10 мин",
      price: 85000,
      perKm: 1200,
      description: "Доступный вариант для коротких поездок",
      image: "https://picsum.photos/seed/taxi1/300/180",
      free_cancel: true,
    },
    {
      id: 2,
      name: "Комфорт",
      seats: 4,
      wait_time: "3-7 мин",
      price: 140000,
      perKm: 1800,
      description: "Тихий и удобный автомобиль",
      image: "https://picsum.photos/seed/taxi2/300/180",
      free_cancel: true,
    },
    {
      id: 3,
      name: "Бизнес",
      seats: 4,
      wait_time: "7-12 мин",
      price: 250000,
      perKm: 3000,
      description: "Премиальный автомобиль для деловых поездок",
      image: "https://picsum.photos/seed/taxi3/300/180",
      free_cancel: true,
    },
    {
      id: 4,
      name: "Минивэн",
      seats: 7,
      wait_time: "10-15 мин",
      price: 180000,
      perKm: 2200,
      description: "Идеально для групп и семей",
      image: "https://picsum.photos/seed/taxi4/300/180",
      free_cancel: true,
    },
    {
      id: 5,
      name: "Люкс / Президент",
      seats: 4,
      wait_time: "15 мин",
      price: 450000,
      perKm: 5000,
      description: "Роскошный представительский класс с профессиональным водителем",
      image: "https://picsum.photos/seed/taxi5/300/180",
      free_cancel: true,
    },
    {
      id: 6,
      name: "Электро Комфорт (BYD)",
      seats: 4,
      wait_time: "5-10 мин",
      price: 160000,
      perKm: 2000,
      description: "Современный и бесшумный электромобиль BYD Song Plus",
      image: "https://picsum.photos/seed/taxi6/300/180",
      free_cancel: true,
    },
    {
      id: 7,
      name: "Туристический Микроавтобус",
      seats: 15,
      wait_time: "20 мин",
      price: 380000,
      perKm: 4000,
      description: "Комфортабельный трансфер Mercedes Sprinter для больших туристических групп",
      image: "https://picsum.photos/seed/taxi7/300/180",
      free_cancel: true,
    },
  ];
}
