import RestaurantTabComponentsWrapper from "./ProductComponents/RestaurantsTabsComponents/RestaurantTabComponentsWrapper";
import StoreTabComponentsWrapper from "./ProductComponents/StoreTabComponents/StoreTabComponentsWrapper";
import DiscoveryTabComponentsWrapper from "./ProductComponents/discoveryTabComponents/DiscoveryTabComponentsWrapper";
import ProductsTabs from "./ProductsTabs";

const ProductPages = ({ params }) => {
  const tabs = [
    {
      id: "discovery",
      label: "Discovery",
      component: <DiscoveryTabComponentsWrapper />,
    },
    {
      id: "restaurants",
      label: "Restaurants",
      component: <RestaurantTabComponentsWrapper params={params} />,
    },
    {
      id: "stores",
      label: "Stores",
      component: <StoreTabComponentsWrapper />,
    },
  ];

  return <ProductsTabs tabs={tabs} />;
};

export default ProductPages;
