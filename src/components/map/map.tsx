// Логика catch уже зашита в кастомный хук
/* eslint-disable @typescript-eslint/no-floating-promises */
import LoadError from 'components/load-error/load-error';
import useAsync from 'hooks/useAsync';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map as YMap, Placemark, YMapsApi } from 'react-yandex-maps';
import { setAddress, setIsMarkUpdateRequired } from 'store/action';
import { getAddress, getIsMarkUpdateRequired } from 'store/selectors';
import { ThunkActionDispatch } from 'types/store';
import { MapEvent, MapApi, MapControl } from 'types/yandex-maps';

const DEFAULT_COORDS = [55.7257, 37.6471];

function Map() {
  const [mapApi, setApi] = useState<MapApi | null>(null);
  const [coords, setCoords] = useState<null | number[]>(null);
  const isMarkUpdateRequired = useSelector(getIsMarkUpdateRequired);
  const address = useSelector(getAddress);
  const prevAddress = useRef<string | null>(null);
  const mapRef = useRef<MapControl | null>(null);
  const dispatch = useDispatch<ThunkActionDispatch>();
  const isAddressChanged = address && address !== prevAddress.current;

  const updateMapPositionByCoords = async (newCoords: number[] | undefined) => {
    if (!mapRef.current || !newCoords) {
      return;
    }

    await mapRef.current.panTo(newCoords);
  };

  const [updateMapPosition, mapPositionStatus] = useAsync(updateMapPositionByCoords);

  const updateCoordsByAddress = async () => {
    if (!mapApi || !address || !isAddressChanged) {
      return;
    }

    const response = await mapApi.geocode(address);
    const geoObject = response.geoObjects.get(0);
    const newCoords = geoObject.geometry.getCoordinates();

    if (!newCoords) {
      return;
    }

    setCoords(newCoords);

    updateMapPosition(newCoords);
  };

  const [updateCoords, coordsStatus, discardCoordsError] = useAsync(updateCoordsByAddress);

  const updateAddressByCoords = async (newCoords: number[] | undefined) => {
    if (!mapApi || !newCoords) {
      return;
    }

    const response = await mapApi.geocode(newCoords);
    const geoObject = response.geoObjects.get(0);
    const newAddress = [
      geoObject.getLocalities().length ? geoObject.getLocalities().join(', ') : geoObject.getAdministrativeAreas().join(', '),
      geoObject.getThoroughfare(),
      geoObject.getPremiseNumber(),
    ]
      .filter(Boolean)
      .join(', ');

    prevAddress.current = newAddress;
    dispatch(setAddress(newAddress));
    setCoords(newCoords);
    discardCoordsError();

    updateMapPosition(newCoords);
  };

  const [updateAddress, addressStatus] = useAsync(updateAddressByCoords);

  const isApiError = addressStatus.isError || coordsStatus.isError || mapPositionStatus.isError;

  useEffect(() => {
    if (!isMarkUpdateRequired || coordsStatus.isLoading) {
      return;
    }

    updateCoords();
    dispatch(setIsMarkUpdateRequired(false));
  });

  const handleMapClick = (evt: MapEvent) => {
    const newCoords = evt.get('coords');

    updateAddress(newCoords);
  };

  const handleMapLoad = (yMapsApi : YMapsApi) => {
    const yandexApi = yMapsApi as MapApi;
    setApi(yandexApi);
  };

  return (
    <>
      <YMap
        className="map"
        defaultState={{ center: DEFAULT_COORDS, zoom: 15 }}
        modules={['geocode']}
        width={500}
        height={700}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
        options={{
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        }}
        instanceRef={(instance) => {
          if (!instance) {
            return;
          }

          const ref = instance as unknown as MapControl;
          mapRef.current = ref;
        }}
      >
        {coords && (
        <Placemark geometry={coords} />
        )}

        {isApiError && (
        <LoadError message="Возникла ошибка при поиске адреса. Измените запрос или попробуйте позднее" mod="map" />
        )}

      </YMap>

      <input className="visually-hidden" name="coords" value={coords ? coords.toString() : ''} readOnly />
    </>
  );
}

export default memo(Map);
