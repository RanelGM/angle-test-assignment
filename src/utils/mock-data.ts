import { ProductType } from 'types/product';

const jsonData = '[{"id":"904.989.72","name":"VINTER GARLAND 2021","type":"Украшение, венок, красный/золотой38 см","img":"https://www.ikea.com/ru/ru/images/products/vinter-2021-vinte…krashenie-venok-krasnyy-zolotoy__0986113_pe817049_s5.jpg?f=s","price":1699,"amount":1},{"id":"304.949.53","name":"ENRUM","type":"Фонарь для греющей свечи, д/дома/улицы красный22 см","img":"https://www.ikea.com/ru/ru/images/products/enrum-fonar-dlya-…hey-svechi-d-doma-ulicy-krasnyy__0888812_pe782189_s5.jpg?f=s","price":299,"amount":3},{"id":"704.955.21","name":"VINTER SOCK 2021","type":"Рождественский чулок, орнамент «рождественский подарок» красный49 см","img":"https://www.ikea.com/ru/ru/images/products/vinter-2021-vinte…rozhdestvenskiy-podarok-krasnyy__0986126_pe817058_s5.jpg?f=s","price":599,"amount":2}]';

export const getMockData = () => {
  const data = JSON.parse(jsonData) as ProductType[];
  return data;
};

export const getPixelStaticMockData = (): ProductType[] => [
  {
    id: '1',
    name: 'Товар 1',
    type: 'Описание товара, которое может быть длинным',
    img: 'assets/img/product-card.png',
    price: 1090,
    amount: 1,
  },
  {
    id: '2',
    name: 'Товар 2',
    type: 'Описание товара, которое может быть очень-очень длинным',
    img: 'assets/img/product-card.png',
    price: 700,
    amount: 1,
  },
  {
    id: '3',
    name: 'Товар 3',
    type: 'Короткое описание товара',
    img: 'assets/img/product-card.png',
    price: 2000,
    amount: 2,
  },
];
