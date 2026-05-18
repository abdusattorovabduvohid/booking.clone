export interface Flight {
  id: number;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  out: {
    dep: string;
    arr: string;
    airline: string;
    airlineCode: string | null;
    stops: string;
    stopCity: string | null;
    duration: string;
    route: string;
  };
  back: {
    dep: string;
    arr: string;
    airline: string;
    airlineCode: string | null;
    stops: string;
    stopCity: string | null;
    duration: string;
    route: string;
  };
  price: number;
  cabin: string;
  tags: string[];
}

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
  popularRank: number;
}

export interface FlightRoute {
  id: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  toCountry: string;
  routeLabel: string;
  teaser: string;
  samplePrice: number;
  isFeatured: boolean;
  sortOrder: number;
}

export function getFallbackFlights(locale: string = "en"): Flight[] {
  const airlines = [
    { name: "Uzbekistan Airways", code: "HY" },
    { name: "Centrum Air", code: "C1" },
    { name: "flydubai", code: "FZ" },
    { name: "Turkish Airlines", code: "TK" },
    { name: "Emirates", code: "EK" },
    { name: "Qanot Sharq", code: "HH" },
  ];

  const cityNames: Record<string, any> = {
    "TAS": { en: "Tashkent", ru: "Ташкент", uz: "Toshkent" },
    "DXB": { en: "Dubai", ru: "Дубай", uz: "Dubay" },
    "IST": { en: "Istanbul", ru: "Стамбул", uz: "Istanbul" },
    "SVO": { en: "Moscow", ru: "Москва", uz: "Moskva" },
    "DOH": { en: "Doha", ru: "Доха", uz: "Doha" }
  };

  const stopsNames: Record<string, any> = {
    "nonstop": { en: "nonstop", ru: "без пересадок", uz: "to'g'ridan-to'g'ri" },
    "1 stop": { en: "1 stop", ru: "1 пересадка", uz: "1 ta o'tish" }
  };

  const cabinNames: Record<string, any> = {
    "Economy": { en: "Economy", ru: "Эконом", uz: "Ekonom" },
    "Business": { en: "Business", ru: "Бизнес", uz: "Biznes" }
  };

  const cities = [
    { fromCode: "TAS", toCode: "DXB" },
    { fromCode: "TAS", toCode: "IST" },
    { fromCode: "TAS", toCode: "SVO" },
  ];

  const results: Flight[] = [];

  for (let i = 1; i <= 15; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const route = cities[Math.floor(Math.random() * cities.length)];
    const isDirect = Math.random() > 0.3;
    
    const outDepHour = Math.floor(Math.random() * 24);
    const outDepMin = Math.random() > 0.5 ? "00" : "30";
    const outArrHour = (outDepHour + 4) % 24;
    
    const backDepHour = Math.floor(Math.random() * 24);
    const backArrHour = (backDepHour + 5) % 24;

    const formatTime = (h: number, m: string) => {
      const ampm = h >= 12 ? 'pm' : 'am';
      const hr = h % 12 || 12;
      return `${hr}:${m} ${ampm}`;
    };

    const price = Math.floor(Math.random() * (12000000 - 3000000) + 3000000);

    const tags = [];
    if (i === 1 || i === 5) tags.push("Cheapest");
    if (i === 2 || i === 4) tags.push("Best");
    if (i === 3) tags.push("Quickest");

    results.push({
      id: i,
      fromCity: cityNames[route.fromCode][locale] || cityNames[route.fromCode]["en"],
      fromCode: route.fromCode,
      toCity: cityNames[route.toCode][locale] || cityNames[route.toCode]["en"],
      toCode: route.toCode,
      out: {
        dep: formatTime(outDepHour, outDepMin),
        arr: formatTime(outArrHour, "15"),
        airline: airline.name,
        airlineCode: airline.code,
        stops: isDirect ? stopsNames["nonstop"][locale] : stopsNames["1 stop"][locale],
        stopCity: isDirect ? null : (cityNames["DOH"][locale] || "DOH"),
        duration: isDirect ? "4h 20m" : "8h 15m",
        route: `${route.fromCode}-${route.toCode}`,
      },
      back: {
        dep: formatTime(backDepHour, "45"),
        arr: formatTime(backArrHour, "10"),
        airline: airline.name,
        airlineCode: airline.code,
        stops: isDirect ? stopsNames["nonstop"][locale] : stopsNames["1 stop"][locale],
        stopCity: isDirect ? null : (cityNames["DOH"][locale] || "DOH"),
        duration: isDirect ? "4h 30m" : "9h 00m",
        route: `${route.toCode}-${route.fromCode}`,
      },
      price: price,
      cabin: Math.random() > 0.8 ? cabinNames["Business"][locale] : cabinNames["Economy"][locale],
      tags,
    });
  }

  results.sort((a, b) => {
    if (a.tags.includes("Cheapest") && !b.tags.includes("Cheapest")) return -1;
    if (b.tags.includes("Cheapest") && !a.tags.includes("Cheapest")) return 1;
    return a.price - b.price;
  });

  return results;
}

export const AIRPORT_HINTS: Record<string, Omit<Airport, 'code'>> = {
  TAS: {
    city: "Ташкент",
    name: "Islam Karimov Tashkent International Airport",
    country: "Узбекистан",
    popularRank: 1,
  },
  DXB: {
    city: "Дубай",
    name: "Dubai International Airport",
    country: "ОАЭ",
    popularRank: 2,
  },
  IST: {
    city: "Стамбул",
    name: "Istanbul Airport",
    country: "Турция",
    popularRank: 3,
  },
  SAW: {
    city: "Стамбул",
    name: "Sabiha Gokcen International Airport",
    country: "Турция",
    popularRank: 4,
  },
};

export function getFallbackAirports(): Airport[] {
  return Object.entries(AIRPORT_HINTS).map(([code, value]) => ({
    code,
    ...value,
  }));
}

export function getFallbackRoutes(): FlightRoute[] {
  return [
    {
      id: "TAS-DXB",
      fromCode: "TAS",
      fromCity: "Ташкент",
      toCode: "DXB",
      toCity: "Дубай",
      toCountry: "ОАЭ",
      routeLabel: "Ташкент → Дубай",
      teaser: "Прямые рейсы и варианты с разными авиакомпаниями",
      samplePrice: 5374124,
      isFeatured: true,
      sortOrder: 1,
    },
    {
      id: "TAS-IST",
      fromCode: "TAS",
      fromCity: "Ташкент",
      toCode: "IST",
      toCity: "Стамбул",
      toCountry: "Турция",
      routeLabel: "Ташкент → Стамбул",
      teaser: "Популярные прямые и стыковочные варианты",
      samplePrice: 7200000,
      isFeatured: true,
      sortOrder: 2,
    },
  ];
}
