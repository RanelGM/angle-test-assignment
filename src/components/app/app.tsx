import { YMaps as MapProvider } from 'react-yandex-maps';
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import Header from 'components/header/header';
import ShipmentInfo from 'components/shipment-info/shipment-info';

const yandexMapsQueryConfig = {
  lang: 'ru_RU' as const,
  apikey: '52f7ab96-b281-460b-aa2e-24c9f4e171dc',
};

function App(): JSX.Element {
  return (
    <MapProvider query={yandexMapsQueryConfig}>
      <Header />

      <main className="page-main">
        <Breadcrumbs />
        <ShipmentInfo />
      </main>
    </MapProvider>
  );
}

export default App;
