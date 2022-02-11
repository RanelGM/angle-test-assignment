import Breadcrumbs from "components/breadcrumbs/breadcrumbs";
import Header from "components/header/header";
import ShipmentInfo from "components/shipment-info/shipment-info";

function App(): JSX.Element {
  return (
    <>
      <Header />

      <main className="page-main">
        <Breadcrumbs />
        <ShipmentInfo />
      </main>
    </>
  );
}

export default App;
