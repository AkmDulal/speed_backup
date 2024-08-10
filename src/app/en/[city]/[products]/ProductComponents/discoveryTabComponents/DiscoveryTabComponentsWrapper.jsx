import BrowseStoreCategories from "./BrowseStoreCategories.jsx";
import ByUpToGetDiscount from "./ByUpToGetDiscount.jsx";
import CashOnDelivery from "./CashOnDelivery.jsx";
import DeliveryDiscount from "./DeliveryDiscount.jsx";
import DinnerNearYou from "./DinnerNearYou.jsx";
import DiscoverySlider from "./DiscoverySlider.jsx";
import DrinkFree from "./DrinkFree.jsx";
import FreeDelivery from "./FreeDelivery.jsx";
import HalaRestaurants from "./HalaRestaurants.jsx";
import HalalStore from "./HalalStore.jsx";
import LunchNearYou from "./LunchNearYou.jsx";
import PercentageOfDiscount from "./PercentageOfDiscount.jsx";
import PopularRestaurants from "./PopularRestaurants.jsx";
import RestaurantCategories from "./RestaurantCategories.jsx";
import RestaurantsNearYou from "./RestaurantsNearYou.jsx";
import StoreComponent from "./StoreComponent.jsx";
import TopRated from "./TopRated.jsx";

function DiscoveryTabComponentsWrapper() {
  return (
    <div>
      <DiscoverySlider />
      <FreeDelivery />
      <PopularRestaurants />
      <RestaurantCategories />
      <PercentageOfDiscount />
      <LunchNearYou />
      <StoreComponent />
      <ByUpToGetDiscount />
      <DeliveryDiscount />
      <CashOnDelivery />
      <DrinkFree />
      <TopRated />
      <DinnerNearYou />
      <BrowseStoreCategories />
      <HalaRestaurants />
      <HalalStore />
      <RestaurantsNearYou />
    </div>
  );
}

export default DiscoveryTabComponentsWrapper;
