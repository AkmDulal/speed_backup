import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      if (typeof action.payload !== "object" || action.payload === null) {
        return;
      }

      const { food_id, totalPrice, restaurant_id, quantity, variations } =
        action.payload;

      // const hasDifferentRestaurantItems = state.items.some(item => item.restaurant_id !== restaurant_id);

      // if (hasDifferentRestaurantItems) {
      //   state.items = [];
      // }

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.food_id === food_id &&
          JSON.stringify(item.variations) === JSON.stringify(variations)
      );

      if (existingItemIndex !== -1) {
        toast.error(`Item with the same variant already exists in the cart!`);
        return;
      }
      state.items.push({ ...action.payload, quantity });
      toast.success(`Item added to cart!`);
      state.totalPrice = state.items
        .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
        .toFixed(2);

      // if (state.items.length > 0) {
      //   const firstItemRestaurantId = state.items[0].restaurant_id;
      //   if (firstItemRestaurantId !== restaurant_id) {
      //     state.items = [{ ...action.payload, quantity, totalPrice }];
      //     state.totalPrice = totalPrice.toFixed(2);
      //   }
      // }
    },

    incrementQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.food_id === action.payload.food_id
      );
      if (index !== -1) {
        state.items[index].quantity += 1;
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.food_id === action.payload.food_id
      );
      if (index !== -1 && state.items[index].quantity > 0) {
        state.items[index].quantity -= 1;
        state.totalPrice = calculateTotalPrice(state.items);
        if (state.items[index].quantity === 0) {
          state.items.splice(index, 1);
        }
      }
    },

    removeItem: (state, action) => {
      const itemToRemove = action.payload;
      const index = state.items.findIndex(
        (item) => item.id === itemToRemove.id
      );
      if (index !== -1) {
        state.totalPrice -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },

    singleDataRemove: (state, action) => {
      state.items = state.items.filter(
        (item) => item.food_id !== action.payload
      );
    },
  },
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const countryCitySlice = createSlice({
  name: "countryCity",
  initialState: {
    country: "",
    city: "",
    address: "",
    lable: "",
    lat: "",
    lng: "",
  },
  reducers: {
    setCountryCity: (state, action) => {
      console.log(action, "action action");
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.address = action.payload.address;
      state.lable = action.payload.lable;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    clearCountryCity: (state) => {
      state.country = "";
      state.city = "";
    },
  },
});

export const addressLatLngSlice = createSlice({
  name: "addressLatLngSlice",
  initialState: {
    lat: "",
    lng: "",
  },
  reducers: {
    setLatLng: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const customerInformation = createSlice({
  name: "customerInformation",
  initialState: {
    all_data: "",
  },
  reducers: {
    setCustomerInfo: (state, action) => {
      state.all_data = action.payload;
    },
  },
});

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    documents: [],
  },
  reducers: {
    setDocuments(state, action) {
      console.log(
        action,
        "action action action actionactionactionactionactionaction"
      );
      state.documents = action.payload;
    },
  },
});
export const foodListStore = createSlice({
  name: "foodlist",
  initialState: {
    foods: [],
  },
  reducers: {
    setFoodListStore(state, action) {
      state.foods = action.payload;
    },
  },
});

export const restaurantsLatLngSlice = createSlice({
  name: "restaurantsLatLngSlice",
  initialState: {
    lat: "",
    lng: "",
  },
  reducers: {
    setRestaurantsLatLng: (state, action) => {
      state.lat = action?.payload?.restaurant?.restaurant_latitute;
      state.lng = action?.payload?.restaurant?.restaurant_longitude;
    },
  },
});

export const countryCityLatLngSlice = createSlice({
  name: "countryCityLatLngSlice",
  initialState: {
    lat: "",
    lng: "",
  },
  reducers: {
    setcountryCityLatLngSlice: (state, action) => {
      // state.lat = action?.payload?.lat;
      // state.lng = action?.payload?.lng;
    },
  },
});

// Total Count
const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.food_price;
  }, 0);
};

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  singleDataRemove,
} = cartSlice.actions;

export const { setLatLng } = addressLatLngSlice.actions;
export const { setCustomerInfo } = customerInformation.actions;
export const { setProducts } = productsSlice.actions;
// Address Data Set Function
export const { setDocuments } = addressSlice.actions;
export const { setRestaurantsLatLng } = restaurantsLatLngSlice.actions;
export const { setcountryCityLatLngSlice } = countryCityLatLngSlice.actions;
export const { setCountryCity, clearCountryCity } = countryCitySlice.actions;
export const { setFoodListStore } = foodListStore.actions;
