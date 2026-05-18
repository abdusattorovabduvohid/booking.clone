import axios from "axios";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const apiClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
});

export interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  location: string;
  type: string;
  stars: number;
  rating: number;
  ratingLabel: string;
  reviews: number;
  distance: string;
  address: string;
  price: number;
  priceOld: number | null;
  priceFrom: boolean;
  nights: number;
  genius: boolean;
  image: string;
  images: string[];
  liked: boolean;
  badge: string | null;
  freeCancel: boolean;
  noPrep: boolean;
  breakfast: boolean;
  description: string;
  amenities: string[];
  rooms: {
    type: string;
    description: string;
    capacity: number;
    price: number;
    options: string[];
  }[];
  reviewScores: {
    staff: number;
    facilities: number;
    cleanliness: number;
    comfort: number;
    value: number;
    location: number;
    wifi: number;
  };
  reviewsList: {
    author: string;
    country: string;
    avatar: string;
    text: string;
    score: number;
  }[];
}

function ratingLabel(r: number) {
  if (r >= 9.5) return "Великолепно";
  if (r >= 9.0) return "Превосходно";
  if (r >= 8.5) return "Потрясающе";
  if (r >= 8.0) return "Очень хорошо";
  if (r >= 7.0) return "Хорошо";
  return "Оценка по отзывам";
}

function normalizeHotel(h: any): Hotel {
  const typeMap: Record<string, string> = {
    apartment: "Апартаменты",
    resort: "Курортный отель",
    guesthouse: "Гостевой дом",
    hostel: "Хостел",
    hotel: "Гостиница",
  };
  const type = typeMap[h.category?.toLowerCase()] || h.category || "Гостиница";

  const images = h.images_urls || [
    h.image_url || `https://picsum.photos/seed/hotel_${h.id}/300/200`,
    `https://picsum.photos/seed/hotel_${h.id}_1/300/200`,
    `https://picsum.photos/seed/hotel_${h.id}_2/300/200`,
    `https://picsum.photos/seed/hotel_${h.id}_3/300/200`,
    `https://picsum.photos/seed/hotel_${h.id}_4/300/200`
  ];

  const amenities = h.amenities || [
    "Бесплатный Wi-Fi",
    "Семейные номера",
    "Круглосуточная стойка регистрации",
    "Отопление",
    "Кондиционер",
    "Номера для некурящих"
  ];

  const rooms = h.rooms || [
    {
      type: "Апартаменты с 1 спальней",
      description: "Собственная кухня • Ванная комната • Балкон • Кондиционер • Телевизор с плоским экраном • Бесплатный Wi-Fi",
      capacity: 2,
      price: h.price_per_night || 623020,
      options: ["Превосходный завтрак включен", "Бесплатная отмена до 11 июня 2026 г."]
    },
    {
      type: "Апартаменты Делюкс",
      description: "Собственная кухня • Ванная комната • Балкон • Кондиционер • Телевизор с плоским экраном • Бесплатный Wi-Fi",
      capacity: 3,
      price: Math.floor((h.price_per_night || 623020) * 1.3),
      options: ["Превосходный завтрак включен", "Бесплатная отмена до 11 июня 2026 г.", "Предоплата не требуется"]
    }
  ];

  const reviewScores = h.review_scores || {
    staff: 9.6,
    facilities: 8.8,
    cleanliness: 9.1,
    comfort: 9.0,
    value: 9.3,
    location: 9.5,
    wifi: 9.7
  };

  const reviewsList = h.reviews_list || [
    {
      author: "Alexey",
      country: "Нидерланды",
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=Alexey`,
      text: "Очень удобное расположение отеля. Все достопримечательности центра города в пешей доступности. Великолепный и очень отзывчивый персонал. По прибытии организовали раннее заселение.",
      score: 9.1
    },
    {
      author: "Iuliia",
      country: "Россия",
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=Iuliia`,
      text: "Завтраки замечательные, сытные и разнообразные, готовятся для каждого гостя заботливыми хозяевами. Отель очень чистый и аккуратный. Мебель и техника новенькие.",
      score: 9.5
    }
  ];

  return {
    id: h.id,
    name: h.name,
    city: h.city,
    country: h.country,
    location: h.city ? `${h.city}${h.country ? ", " + h.country : ""}` : "",
    type,
    stars: h.stars ?? 0,
    rating: parseFloat(h.rating) ?? 0,
    ratingLabel: ratingLabel(parseFloat(h.rating) ?? 0),
    reviews: h.reviews_count || 0,
    distance: h.distance_center || "",
    address: h.address || "Doktor Mehmet Öz Sokak 21, Бейоглу, 34433 Стамбул, Турция",
    price: h.price_per_night || 0,
    priceOld: h.original_price || null,
    priceFrom: true,
    nights: 1,
    genius: h.is_genius ?? false,
    image: h.image_url || `https://picsum.photos/seed/hotel_${h.id}/300/200`,
    images,
    liked: false,
    badge: h.badge || null,
    freeCancel: h.free_cancel ?? true,
    noPrep: h.no_prepay ?? true,
    breakfast: h.breakfast ?? false,
    description: h.description || "Это великолепный вариант размещения с современными удобствами, отличным дизайном и внимательным обслуживанием. Гости хвалят это место за удобное расположение и уют.",
    amenities,
    rooms,
    reviewScores,
    reviewsList
  };
}

import { getMockHotels } from "../mocks/hotels";
import { getMockCities } from "../mocks/cities";

export async function getPopularHotels(limit = 8): Promise<Hotel[]> {
  try {
    const { data } = await apiClient.get("/hotels", {
      params: {
        order: "rating.desc",
        limit,
      },
    });
    if (!data?.length) return getMockHotels("dubai", limit).map(normalizeHotel);
    return data.map(normalizeHotel);
  } catch (error) {
    console.error("getPopularHotels:", error);
    return getMockHotels("dubai", limit).map(normalizeHotel);
  }
}

export async function getWeekendHotels(limit = 8): Promise<Hotel[]> {
  try {
    const { data } = await apiClient.get("/hotels", {
      params: {
        order: "rating.desc",
        limit,
      },
    });
    if (!data?.length) return getMockHotels("tashkent", limit).map(normalizeHotel);
    return data.map(normalizeHotel);
  } catch (error) {
    console.error("getWeekendHotels:", error);
    return getMockHotels("tashkent", limit).map(normalizeHotel);
  }
}

export async function getUniqueHotels(limit = 4): Promise<Hotel[]> {
  try {
    const { data: badgeData } = await apiClient.get("/hotels", {
      params: {
        badge: "not.is.null",
        order: "rating.desc",
        limit,
      },
    });

    if (badgeData && badgeData.length >= limit) {
      return badgeData.map(normalizeHotel);
    }

    const { data } = await apiClient.get("/hotels", {
      params: {
        order: "rating.desc",
        limit,
      },
    });
    if (!data?.length) return getMockHotels("unique", limit).map(normalizeHotel);
    return data.map(normalizeHotel);
  } catch (error) {
    console.error("getUniqueHotels:", error);
    return getMockHotels("unique", limit).map(normalizeHotel);
  }
}

export async function searchHotels(params: {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  rooms?: number;
} = {}): Promise<Hotel[]> {
  try {
    const requestParams: any = {
      order: "rating.desc",
    };

    if (params.destination) {
      requestParams.or = `city.ilike.*${params.destination}*,name.ilike.*${params.destination}*,country.ilike.*${params.destination}*`;
    }

    const { data } = await apiClient.get("/hotels", { params: requestParams });
    if (!data?.length) {
      const all = getMockHotels("all").map(normalizeHotel);
      if (!params.destination) return all;
      
      const q = params.destination.toLowerCase();
      const cleanQ = q.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji}/gu, '').trim().toLowerCase();

      const cityMap: Record<string, string> = {
        "guanchjou": "guangzhou",
        "гуанчжоу": "guangzhou",
        "syuichjou": "xuzhou",
        "сюйчжоу": "xuzhou",
        "chuchjou": "chuzhou",
        "чучжоу": "chuzhou",
        "nankin": "nanjing",
        "нанкин": "nanjing",
        "vena": "vienna",
        "вена": "vienna"
      };

      const cleanQMapped = cityMap[cleanQ] || cleanQ;

      return all.filter(
        (h) =>
          h.name?.toLowerCase().includes(cleanQMapped) ||
          h.location?.toLowerCase().includes(cleanQMapped) ||
          h.city?.toLowerCase().includes(cleanQMapped) ||
          h.country?.toLowerCase().includes(cleanQMapped) ||
          h.name?.toLowerCase().includes(cleanQ) ||
          h.location?.toLowerCase().includes(cleanQ) ||
          h.city?.toLowerCase().includes(cleanQ) ||
          h.country?.toLowerCase().includes(cleanQ)
      );
    }
    return data.map(normalizeHotel);
  } catch (error) {
    console.error("searchHotels:", error);
    return getMockHotels("all").map(normalizeHotel);
  }
}

export async function getHotelById(id: string | number): Promise<Hotel | null> {
  const strId = String(id);
  
  try {
    const { data } = await apiClient.get("/hotels", {
      params: {
        id: `eq.${strId}`,
        limit: 1,
      },
    });
    if (data?.length) {
      return normalizeHotel(data[0]);
    }
  } catch (error) {
    console.error("getHotelById Supabase query error:", error);
  }

  const all = getMockHotels("all").map(normalizeHotel);
  const foundMock = all.find((h) => String(h.id) === strId);
  if (foundMock) {
    return foundMock;
  }

  const formattedName = strId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  let city = "Стамбул";
  let country = "Турция";
  let rating = 9.1;
  let price = 620000;
  let image = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80";

  if (strId.includes("residence") || strId.includes("tashkent")) {
    city = "Ташкент";
    country = "Узбекистан";
    rating = 9.4;
    price = 1100000;
    image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";
  } else if (strId.includes("samarkand") || strId.includes("furkat")) {
    city = "Самарканд";
    country = "Узбекистан";
    rating = 9.5;
    price = 780000;
    image = "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80";
  } else if (strId.includes("bukhara") || strId.includes("mini-hotel")) {
    city = "Бухара";
    country = "Узбекистан";
    rating = 9.2;
    price = 680000;
    image = "https://images.unsplash.com/photo-1582719478250-c89cae4db85b?w=600&q=80";
  } else if (strId.includes("khiva") || strId.includes("mir")) {
    city = "Хива";
    country = "Узбекистан";
    rating = 9.3;
    price = 550000;
    image = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80";
  } else if (strId.includes("chiang")) {
    city = "Чиангмай";
    country = "Таиланд";
    rating = 9.0;
    price = 920000;
    image = "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&q=80";
  } else if (strId.includes("chau")) {
    city = "Майчау";
    country = "Вьетнам";
    rating = 9.1;
    price = 850000;
    image = "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600&q=80";
  }

  return {
    id: strId as any,
    name: formattedName,
    city: city,
    country: country,
    location: `${city}, ${country}`,
    type: strId.includes("house") || strId.includes("garden") ? "Гостевой дом" : "Гостиница",
    stars: 4,
    rating: rating,
    ratingLabel: rating >= 9.5 ? "Великолепно" : rating >= 9.0 ? "Превосходно" : "Потрясающе",
    reviews: 1146,
    distance: "1.2 км от центра",
    address: `ул. Пушкина 42, ${city}, ${country}`,
    price: price,
    priceOld: Math.floor(price * 1.3),
    priceFrom: false,
    nights: 1,
    genius: true,
    image: image,
    images: [
      image,
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4db85b?w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80"
    ],
    liked: false,
    badge: "Genius",
    freeCancel: true,
    noPrep: true,
    breakfast: true,
    description: `Добро пожаловать в ${formattedName}! Это великолепный вариант размещения, расположенный в живописном районе города ${city}. Гостям предлагаются комфортабельные номера с кондиционером, бесплатным Wi-Fi, собственной ванной комнатой и полностью оборудованной кухней. Утром сервируется превосходный континентальный завтрак. Стойка регистрации работает круглосуточно.`,
    amenities: [
      "Бесплатный Wi-Fi",
      "Семейные номера",
      "Трансфер от/до аэропорта",
      "Номера для некурящих",
      "Круглосуточная стойка регистрации",
      "Кондиционер",
      "Отопление",
      "Чайник/кофеварка во всех номерах"
    ],
    rooms: [
      {
        type: "Улучшенные апартаменты с 1 спальней",
        description: "Красивые апартаменты с гостиной зоной, полностью оборудованной мини-кухней, кондиционером и собственной ванной комнатой.",
        capacity: 2,
        price: price,
        options: ["Бесплатная отмена до 15 июня", "Без предоплаты — платите на месте"]
      },
      {
        type: "Семейный номер Делюкс",
        description: "Просторный номер с двумя большими двуспальными кроватями, гостиным уголком и живописным видом на город.",
        capacity: 4,
        price: Math.floor(price * 1.5),
        options: ["Бесплатная отмена до 15 июня", "Завтрак включен в стоимость"]
      }
    ],
    reviewScores: {
      staff: 9.3,
      facilities: 9.0,
      cleanliness: 9.4,
      comfort: 9.2,
      value: 9.1,
      location: 9.6,
      wifi: 9.7
    },
    reviewsList: [
      {
        author: "Александр",
        country: "Россия",
        avatar: "https://picsum.photos/seed/user1/100/100",
        text: "Очень чистые и уютные апартаменты. Персонал невероятно вежливый и отзывчивый. Расположение отличное — все главные достопримечательности в шаговой доступности. Завтрак превзошел все ожидания!",
        score: 9.5
      },
      {
        author: "Shahzoda",
        country: "Uzbekistan",
        avatar: "https://picsum.photos/seed/user2/100/100",
        text: "Hammasi ajoyib! Xonalar juda toza va shinam, xodimlar mehribon. WiFi juda tez ishladi. Keyingi safar yana shu yerda qolamiz.",
        score: 10.0
      }
    ]
  };
}

export async function searchAutocomplete(q: string): Promise<Hotel[]> {
  if (!q) return [];
  const query = q.toLowerCase();

  try {
    const matchedCities = getMockCities()
      .filter((c) =>
        c.name.toLowerCase().includes(query) ||
        c.nameEn.toLowerCase().includes(query) ||
        c.nameUz.toLowerCase().includes(query) ||
        c.country.toLowerCase().includes(query) ||
        c.countryEn.toLowerCase().includes(query) ||
        c.countryUz.toLowerCase().includes(query)
      )
      .slice(0, 5)
      .map((c) => ({
        id: c.id + 20000,
        name: `${c.name} ${c.flag}`,
        city: c.name,
        country: c.country,
        location: `${c.name}, ${c.country} ${c.flag}`,
        type: "Город",
        stars: 0,
        rating: 9.6,
        ratingLabel: "Превосходно",
        reviews: c.variants,
        distance: "",
        address: `${c.name}, ${c.country}`,
        price: 0,
        priceOld: null,
        priceFrom: true,
        nights: 1,
        genius: true,
        image: `https://picsum.photos/seed/city_${c.id}/300/200`,
        images: [`https://picsum.photos/seed/city_${c.id}/300/200`],
        liked: false,
        badge: `${c.variants} вариантов размещения`,
        freeCancel: true,
        noPrep: true,
        breakfast: false,
        description: "",
        amenities: [],
        rooms: [],
        reviewScores: { staff: 9.5, facilities: 9.4, cleanliness: 9.6, comfort: 9.5, value: 9.3, location: 9.8, wifi: 9.5 },
        reviewsList: []
      }));

    const all = getMockHotels("all").map(normalizeHotel);
    const matchedHotels = all
      .filter(
        (h) =>
          h.name?.toLowerCase().includes(query) ||
          h.location?.toLowerCase().includes(query) ||
          h.city?.toLowerCase().includes(query)
      )
      .slice(0, 5);

    return [...matchedCities, ...matchedHotels].slice(0, 5);
  } catch (error) {
    console.error("searchAutocomplete error:", error);
    const all = getMockHotels("all").map(normalizeHotel);
    return all
      .filter(
        (h) =>
          h.name?.toLowerCase().includes(query) ||
          h.location?.toLowerCase().includes(query) ||
          h.city?.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }
}
