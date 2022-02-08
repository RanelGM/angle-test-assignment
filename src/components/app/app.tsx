import Breadcrumbs from "components/breadcrumbs/breadcrumbs";
import Header from "components/header/header";
import ShipmentInfo from "components/shipment-info/shipment-info";

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Breadcrumbs />

      <h1 className="heading">Корзина</h1>

      <ShipmentInfo />
    </>
  );
}

export default App;
