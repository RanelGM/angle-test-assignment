import { memo, useState } from 'react';
import { Map as YMap, Placemark, YMapsApi } from 'react-yandex-maps';
import { MapEvent, MapApi } from 'types/yandex-maps';

const DEFAULT_COORDS = [55.7257, 37.6471];

function Map() {
  const [mapApi, setMapApi] = useState<MapApi | null>(null);
  const [coords, setCoords] = useState<null | number[]>(null);

  const handleMapClick = (evt: MapEvent) => {
    const newCoords = evt.get('coords');

    if (!mapApi) {
      return;
    }

    mapApi.geocode(newCoords).then((res) => {
      const geoObject = res.geoObjects.get(0);
      const address = [
        geoObject.getLocalities().length ? geoObject.getLocalities().join(', ') : geoObject.getAdministrativeAreas().join(', '),
        geoObject.getThoroughfare(),
        geoObject.getPremiseNumber(),
      ]
        .filter(Boolean)
        .join(', ');

      setCoords(newCoords);
    }).catch(() => {});
  };

  const handleMapLoad = (yMapsApi : YMapsApi) => {
    const api = yMapsApi as MapApi;
    setMapApi(api);
  };

  return (
    <YMap
      className="map"
      defaultState={{ center: DEFAULT_COORDS, zoom: 15 }}
      modules={['geocode']}
      width={500}
      height={700}
      onClick={handleMapClick}
      onLoad={handleMapLoad}
    >

      {coords && (
        <Placemark geometry={coords} />
      )}

    </YMap>
  );
}

export default memo(Map);