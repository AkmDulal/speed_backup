// "use client";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setLatLng } from "../../services/redux/slice/globalDataSlice";

// const initialPosition = {
//   lat: 60.2047672,
//   lng: 24.6568435,
// };

// const LocationCreate = ({ height, addressLatLngSlice, disabledFun }) => {
//   // console.log(addressLatLngSlice, "addressLatLngSlice addressLatLngSlice");
//   const [markerPosition, setMarkerPosition] = useState(addressLatLngSlice);
//   const dispatch = useDispatch();
//   console.log(addressLatLngSlice, "latitudeLocationlist");

//   const mapStyles = {
//     height: height ? height : "400px",
//     width: "100%",
//   };
//   // const addressLatLngSlice00000000000000000000 = useSelector((state) => state.addressLatLngSlice);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyAn9hdgGsFJ2pGRLjICHFF_sWywPjjPAWg",
//   });

//   const onMarkerDragEnd = (event) => {
//     const newPosition = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };
//     disabledFun(false);
//     setMarkerPosition(newPosition);
//     dispatch(setLatLng(newPosition));
//   };

//   return (
//     isLoaded && (
//       <GoogleMap
//         mapContainerStyle={mapStyles}
//         zoom={17}
//         center={addressLatLngSlice}
//       >
//         <Marker
//           position={markerPosition}
//           draggable={true}
//           onDragEnd={onMarkerDragEnd}
//           icon={{
//             url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//             scaledSize: new window.google.maps.Size(50, 50),
//           }}
//         />
//       </GoogleMap>
//     )
//   );
// };

// export default LocationCreate;

"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLatLng } from "../../services/redux/slice/globalDataSlice";

const LocationCreate = ({ height, addressLatLngSlice, disabledFun }) => {
  const [mapCenter, setMapCenter] = useState(addressLatLngSlice);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const mapStyles = {
    height: height ? height : "400px",
    width: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAn9hdgGsFJ2pGRLjICHFF_sWywPjjPAWg",
  });

  const onIdle = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const newCenter = {
        lat: center.lat(),
        lng: center.lng(),
      };
      console.log(newCenter, "newCenter newCenter newCenter");
      setMapCenter(newCenter);
      dispatch(setLatLng(newCenter));
      disabledFun(false);
    }
  }, [dispatch, disabledFun]);

  // Prevent reloading by using an empty dependency array for useEffect to only set up the map reference once
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      google.maps.event.addListenerOnce(map, "idle", onIdle);
    }
  }, [isLoaded, onIdle]);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={17}
        center={mapCenter}
        onIdle={onIdle}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        <Marker
          position={mapCenter}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      </GoogleMap>
    )
  );
};

export default LocationCreate;
