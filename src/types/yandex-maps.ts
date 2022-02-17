// Дополнительное описание типов, которые не описаны в react-yandex-maps

type GeoObject = {
  getLocalities(): string[],
  getAdministrativeAreas(): string[],
  getThoroughfare(): string | null,
  getPremiseNumber(): string | null,
  geometry: {
    getCoordinates(): number[] | null,
  }
};

type GeocodeResponse = {
  geoObjects: {
    get(index: number): GeoObject
  }
};

export type MapEvent = {
  get(name:'coords'):number[];
};

export type MapApi = {
  geocode(request: string | number[]): Promise<GeocodeResponse>;
};

export type MapControl = {
  panTo(
    coords: string | number[],
    options?: {
      duration: number
    }
  ): Promise<void>,
};
