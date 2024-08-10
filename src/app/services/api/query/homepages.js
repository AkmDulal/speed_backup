import endpoints from "../../../services/api/constants/endpoints";
import { axios } from "../../../services/api/request/axiosConfig";

// Country List
export const getCountry = async (params) => {
  const data = await axios.get(endpoints?.COUNTRIES_LIST, {
    params,
  });
  return data.data?.data;
};

// City List
export const getCity = async (params) => {
  const data = await axios.get(`${endpoints?.CITIYS_LIST}/${params}`);
  return data.data?.data;
};

// Get Categories
export const getCategories = async (params) => {
  const data = await axios.get(
    `${endpoints?.RESTAURANTS_PAGES_CATEGORIES_LIST}/${params}`
  );
  return data.data?.data;
};

// Otp Send
export const otpSend = async (params) => {
  console.log(params, "params 99999999999999");
  const data = await axios.post(`${endpoints?.PHONE_OTP_SEND}`, {
    phone: params.phone,
    phone_code: params.phone_code,
  });
  return data.data?.data;
};

// Address Me
export const addressMe = async (params) => {
  console.log(params, "paramsparamsparamsparams");
  const data = await axios.post(`${endpoints?.ADDRESS_ME}`, {
    address: params?.address,
    floor: params?.floor,
    apartment: params?.apartment,
    entrance_staircase: params?.entrance_staircase,
    city: params?.city,
    state: params?.state,
    country: params?.country,
    landmark: "",
    latitude: params?.latitude,
    longitude: params?.longitude,
    location_type: params?.location_type,
    we_get_in: params?.we_get_in,
    address_type_label: params?.address_type_label,
    other_instractions: params?.other_instractions,
    is_default: params?.is_default,
  });
  return data.data?.data;
};
export const addressMeDefaultSave = async (params) => {
  const data = await axios.post(
    `${endpoints?.ADDRESS_ME}/${params?.address_id}/default`
  );
  return data.data?.data;
};
export const addressMeGet = async (params) => {
  console.log(params, "paramsparamsparamsparams");
  const data = await axios.get(`${endpoints?.ADDRESS_ME}`);
  return data.data?.data;
};

// Login
export const login = async (params) => {
  const data = await axios.post(`${endpoints?.LOGIN}`, {
    email: params.email,
  });
  return data.data?.data;
};
export const register = async (formData) => {
  console.log(
    formData,
    "formDataformDataformDataformDataformDataformDataformDataformDataformData"
  );
  const data = await axios.post(`${endpoints?.REGISTER}`, {
    first_name: formData?.first_name,
    last_name: formData?.last_name,
    email: formData?.email,
    phone: formData?.phone,
    phone_code: formData?.phone_code,
    email_verified: formData?.email_verified,
    country_id: formData?.country_id,
    email_verified_at: 1,
    phone_verified: 1,
    phone_verified_at: 1,
  });
  return data.data?.data;
};
export const registerGet = async (formData) => {
  const data = await axios.get(`${endpoints?.RESTAURANTS}/${formData}`);
  return data.data?.data;
};
export const foodsGet = async (formData) => {
  const data = await axios.get(`${endpoints?.FOODS}/${formData}`);
  return data.data?.data;
};

// Logout
export const logout = async (params) => {
  const data = await axios.post(`${endpoints?.LOGOUT}`, { params });
  return data.data?.data;
};

// phone verify
export const phone_verify = async (params) => {
  const paramslist = params;
  console.log(
    paramslist,
    "paramslist paramslist paramslistparamslistparamslist"
  );
  const data = await axios.post(`${endpoints?.PHONE_VERIFY}`, {
    phone: params.phone,
    otp: params.otp,
    phone_code: params.phone_code,
  });
  return data.data?.data;
};
// phone verify
export const restaurants = async (params) => {
  const data = await axios.get(
    `${endpoints?.RESTAURANTS}/${params?.countryCode}/${params?.city}?per_page=500&items=10&page=1${params?.lat_lng}`
  );
  return data.data?.data;
};
// phone verify
export const order_fees = async (params) => {
  console.log(params, "paramsparamsparamsparamsparamsparamsparamsparamsparams");
  const data = await axios.post(`${endpoints?.ORDER_FEES}`, {
    address_id: params.address_id,
    city_id: params.city_id,
    country_id: params.country_id,
    restaurant_id: params.restaurant_id,
  });
  return data.data?.data;
};
export const order_create = async (params) => {
  const data = await axios.post(`${endpoints?.ORDER_CREATE}`, {
    restaurant_id: params.restaurant_id,
    city_id: params.city_id,
    country_id: params.country_id,
    address_id: params.address_id,
    payment_id: "",
    promo_code: "",
    note: "",
    item_amount: params?.item_amount,
    delivery_fee: params?.delivery_fee,
    service_fee: params?.service_fee,
    small_order_fee: params?.small_order_fee,
    discount_type: params?.delivery_offer_type,
    discount_amount: params?.delivery_offer_amount,
    tips: "",
    total_amount: params?.total_amount,
    total_delivery_charge: params?.delivery_fee,
    grand_total: params?.grand_total,
    delivery_method: params?.delivery_fee,
    delivery_time: params?.delivery_time,
    items: params?.items,
  });
  return data.data?.data;
};
