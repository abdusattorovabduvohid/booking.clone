export interface Destination {
  id: number;
  name: string;
  country: string;
  flag: string;
  variants: number;
  avg_price: number;
  image_url: string;
  is_trending: boolean;
  region?: string;
}

export function getMockDestinations(): Destination[] {
  return [
    {
      id: 1,
      name: "Ташкент",
      country: "Узбекистан",
      flag: "🇺🇿",
      variants: 1408,
      avg_price: 950000,
      image_url:
        "https://cf.bstatic.com/xdata/images/city/max1280x900/686023.jpg?k=315b82bac9991c71d6f14f8618e68a9b6d3f45b61b9ceb335523918d0e086dbf&o=",
      is_trending: true,
    },
    {
      id: 2,
      name: "Самарканд",
      country: "Узбекистан",
      flag: "🇺🇿",
      variants: 864,
      avg_price: 759000,
      image_url:
        "https://cf.bstatic.com/xdata/images/city/max1280x900/916707.jpg?k=92d3c6a6f59fe96b7044218defba0d9e1b9b376b424121dbb29db63a45c62d24&o=",
      is_trending: true,
    },
    {
      id: 3,
      name: "Бухара",
      country: "Узбекистан",
      flag: "🇺🇿",
      variants: 570,
      avg_price: 641000,
      image_url:
        "https://cf.bstatic.com/xdata/images/city/max1280x900/948982.jpg?k=df876b79aa087808adf33387dfdad56350813a328ca436dbad74fb9fa597bc16&o=",
      is_trending: true,
    },
    {
      id: 4,
      name: "Хива",
      country: "Узбекистан",
      flag: "🇺🇿",
      variants: 154,
      avg_price: 520000,
      image_url:
        "https://cf.bstatic.com/xdata/images/city/max1280x900/685491.jpg?k=c01e7a88b1b08c54bb3f282ec0ddc28e0ef82e8c3cb48a2b37baa0e91e9cac38&o=",
      is_trending: true,
    },
    {
      id: 5,
      name: "Стамбул",
      country: "Турция",
      flag: "🇹🇷",
      variants: 4863,
      avg_price: 2138000,
      image_url:
        "https://cf.bstatic.com/xdata/images/city/max1280x900/999839.jpg?k=0c48abf88150a98bc1ec9280347e9ea97f41265ebfc439c53a5b8fec61ab4fa5&o=",
      is_trending: true,
    },
    {
      id: 6,
      name: "Дубай",
      country: "ОАЭ",
      flag: "🇦🇪",
      variants: 28003,
      avg_price: 3557000,
      image_url:
        "https://cf.bstatic.com/xdata/images/city/max1280x900/1000203.jpg?k=207c20a3559b06975deaac8d2e5721e7bb33797dcc064c386533101d12281a39&o=",
      is_trending: true,
    },
  ];
}
