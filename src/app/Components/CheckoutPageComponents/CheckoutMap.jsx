"use client";
import {
  GoogleMap,
  Marker,
  OverlayView,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosGet from "../../customHooks/useAxiosGet";
import "./style.css";

const CheckoutMap = () => {
  // const selectedAddress = useSelector(
  //   (state) => state?.reducer?.restaurantsLatLngSlice
  // );
  // const addressLatLngSlice = useSelector(
  //   (state) => state?.reducer?.address.documents
  // );
  // const address = useSelector(
  //   (state) => state?.reducer?.addressSlice?.documents
  // );

  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState(null);
  const [polylinePath, setPolylinePath] = useState([]);

  const [address, setaddress] = useState({});
  const [, getAddressData] = useAxiosGet();

  const memoizedGetAddressData = useCallback(getAddressData, [dataAddressData]);

  useEffect(() => {
    memoizedGetAddressData("/me/addresses", (res) => {
      const addreslist = res?.data?.find(
        (item) => Number(item?.is_default) === 1
      );
      setaddress(addreslist);
    });
  }, [memoizedGetAddressData]);

  // Memoize the homeAddress to avoid unnecessary recalculations
  const homeAddress = useMemo(() => {
    return {
      lat: Number(address?.latitude),
      lng: Number(address?.longitude),
    };
  }, [address]);

  const restaurantAddress = useSelector(
    (state) => state?.reducer?.restaurantsLatLngSlice
  );

  // Memoize `calculateDistance` to prevent unnecessary recalculations
  const calculateDistance = useCallback(() => {
    const { lat: lat1, lng: lng1 } = homeAddress;
    const { lat: lat2, lng: lng2 } = restaurantAddress;
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in meters
    const distanceInKm = (d / 1000).toFixed(2); // Convert to kilometers and round to 2 decimal places
    // Calculate the path for the polyline
    const path = [
      { lat: parseFloat(lat1), lng: parseFloat(lng1) },
      { lat: parseFloat(lat2), lng: parseFloat(lng2) },
    ];
    setDistance(distanceInKm);
    setPolylinePath(path);
  }, [homeAddress, restaurantAddress]);

  useEffect(() => {
    calculateDistance();
  }, [calculateDistance]);

  // const getaddressData = async () => {
  //   const addressdata = await addressMeGet();

  //   const addreslist = addressdata?.find(
  //     (item) => Number(item?.is_default) === 1
  //   );
  //   setaddress(addreslist);
  // };

  // const homeAddress = {
  //   lat: Number(address?.latitude),
  //   lng: Number(address?.longitude),
  // };
  // const restaurantAddress = useSelector(
  //   (state) => state?.reducer?.restaurantsLatLngSlice
  // );

  console.log(
    restaurantAddress,
    "restaurantAddress restaurantAddress restaurantAddress"
  );

  // const calculateDistance = () => {
  //   const { lat: lat1, lng: lng1 } = homeAddress;
  //   const { lat: lat2, lng: lng2 } = restaurantAddress;
  //   const R = 6371e3; // Earth radius in meters
  //   const φ1 = (lat1 * Math.PI) / 180;
  //   const φ2 = (lat2 * Math.PI) / 180;
  //   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  //   const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  //   const a =
  //     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
  //     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const d = R * c; // Distance in meters
  //   const distanceInKm = (d / 1000).toFixed(2); // Convert to kilometers and round to 2 decimal places
  //   // Calculate the path for the polyline
  //   const path = [
  //     { lat: parseFloat(lat1), lng: parseFloat(lng1) },
  //     { lat: parseFloat(lat2), lng: parseFloat(lng2) },
  //   ];
  //   setDistance(distanceInKm);
  //   setPolylinePath(path);
  // };

  useEffect(() => {
    calculateDistance();
  }, [calculateDistance]);

  const DistanceOverlay = () => (
    <OverlayView
      position={restaurantAddress}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: width / 2,
        y: -height,
      })}
    >
      <div style={{ color: "red", fontWeight: "bold" }}>{distance} km</div>
    </OverlayView>
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAn9hdgGsFJ2pGRLjICHFF_sWywPjjPAWg",
  });

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      {isLoaded && (
        <GoogleMap
          center={homeAddress}
          zoom={17}
          mapContainerStyle={{ height: "400px", width: "100%" }}
        >
          {/* Marker for home address */}
          <Marker position={homeAddress} />

          {/* Marker for restaurant address */}
          <Marker position={restaurantAddress} />

          {/* Polyline representing the distance between the two locations */}
          {polylinePath.length > 0 && (
            <Polyline
              path={polylinePath}
              options={{
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 3,
              }}
            />
          )}

          {/* Display distance on map */}
          {distance && <DistanceOverlay />}
        </GoogleMap>
      )}
    </div>
  );
};

export default CheckoutMap;
