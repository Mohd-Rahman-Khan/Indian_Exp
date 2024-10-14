import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function readToken() {
  const token = await AsyncStorage.getItem('InExToken');
  return token;
}

const DOC_URL = client.BASE_URL + '/print/download-file/img-file?fileurl=';

const login = (
  login_id,
  password,
  platform,
  deviceToken,
  deviceId,
  deviceName,
) =>
  client.apiClient.post('/auth/login', {
    login_id,
    password,
    platform,
    deviceToken,
    deviceId,
    deviceName,
  });

const publications = token =>
  client.getApiRequest.get(
    '/masters/publications',
    {},
    {headers: {Authorization: token}},
  );

const editions = (publicationId, token) =>
  client.getApiRequest.get(
    '/masters/editions?',
    {publicationId},
    {headers: {Authorization: token}},
  );

const depots = (userId, token) =>
  client.getApiRequest.get(
    '/masters/parcel-depot?',
    {userId},
    {headers: {Authorization: token}},
  );

const collectionList = (data, token, id) =>
  client.getApiRequest.get(
    `/transaction/collection?${data}`,
    {id},
    {headers: {Authorization: token}},
  );

const collectionListVendor = (id, token) =>
  client.getApiRequest.get(
    `/transaction/get-vendor_payment-list/${id}`,
    {id},
    {headers: {Authorization: token}},
  );
const unsoldReturnList = (userId, token) =>
  client.getApiRequest.get(
    `/transaction/get-vendor-unsold-return/${userId}`,
    {userId},
    {headers: {Authorization: token}},
  );

const supply = (ship_to_code, publication_start_date, publication_id, token) =>
  client.apiClient.post(
    '/transaction/supply',
    {ship_to_code, publication_start_date, publication_id},
    {headers: {Authorization: token}},
  );

const unsoldReturnSubmit = (dataObj, token) =>
  client.apiClient.post(
    '/transaction/unsold-return',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const depotCollection = (userId, token) =>
  client.getApiRequest.get(
    '/masters/parcel-depot/collection-executive?',
    {userId},
    {headers: {Authorization: token}},
  );

const supplyCollection = (dataObj, token) =>
  client.apiClient.post(
    '/transaction/unsold-return/details',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const outstandingAmountCollection = (dataObj, token) =>
  client.apiClient.post(
    '/transaction/customer-outstanding',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const collectionSubmit = (dataObj, token) =>
  client.apiClient.post(
    '/transaction/collection',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const unsoldReturnApproval = (dataObj, token) =>
  client.getApiRequest.get('/transaction/unsold-return?', dataObj, {
    headers: {Authorization: token},
  }); //

const b = (userId, token) =>
  client.getApiRequest.get(
    '/transaction/unsold-return?',
    {userId},
    {headers: {Authorization: token}},
  );

const collectionApproval = (dataObj, token) =>
  client.getApiRequest.get('/transaction/collection?', dataObj, {
    headers: {Authorization: token},
  }); //

const getAttendance = (userId, token) =>
  client.getApiRequest.get(
    '/transaction/attendance?',
    {userId},
    {headers: {Authorization: token}},
  ); //

const approveRejectCommon = (dataObj, token) =>
  client.apiClient.post(
    '/transaction/approval-status',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const securityDepositAmount = (userId, token) =>
  client.getApiRequest.get(
    '/transaction/security-deposit-amount?',
    {userId},
    {headers: {Authorization: token}},
  );

const checkInCheckOut = (dataObj, token) =>
  client.apiClient.post(
    '/transaction/attendance',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const paymentRazorpay = (dataObj, token) =>
  client.apiClient.post(
    '/transaction/create-order',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const collectionRegion = (userId, token) =>
  client.getApiRequest.get(
    '/masters/regions?',
    {userId},
    {headers: {Authorization: token}},
  );

const sendNotification = (dataObj, token) =>
  client.apiClient.post(
    '/notification/push',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const collectionCentersRegion = (regionId, token) => {
  console.log('regionId: ', regionId);
  return client.getApiRequest.get(
    '/masters/centers?',
    {regionId},
    {headers: {Authorization: token}},
  );
};
const collectionCentersRegionUserId = (userId, token) => {
  console.log('userId: ', userId);
  return client.getApiRequest.get(
    '/masters/centers?',
    {userId},
    {headers: {Authorization: token}},
  );
};

const collectionDepotRegion = (centerId, token) => {
  console.log('centerId', centerId);
  return client.getApiRequest.get(
    '/masters/parcel-depot?',
    {centerId},
    {headers: {Authorization: token}},
  );
};

const paymentTransanction = (formData, token) =>
  client.apiClient.post('/transaction/cheque-collection', formData, {
    headers: {
      Accept: 'application/vnd.tiedn.ie.api.v1+json',
      //Authorization: devToken,
      Authorization: token,
    },
  });

const fetchQrData = (dataObj, token) =>
  client.apiClient.post(
    '/transaction/scan-coupon',
    {...dataObj},
    {headers: {Authorization: token}},
  );

// const fetchQrData = (qrId, token, id) =>
//   client.getApiRequest.get(
//     `/transaction/${qrId}/${id}`,
//     {qrId},
//     {headers: {Authorization: token}},
//   );
const savePrintOrder = (dataObj, token) =>
  client.apiClient.post(
    '/print/save-print-order',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const getPrintOrder = (dataObj, token) =>
  client.apiClient.post(
    '/print/get-print-order-of-mapped-user-mob',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const getAttendenceRadius = token =>
  client.getApiRequest.get(
    `/masters/get-radius`,
    {},
    {headers: {Authorization: token}},
  );

const logoutApi = (data, token) =>
  client.getApiRequest.get(
    `/auth/logout/${data}`,
    {},
    {headers: {Authorization: token}},
  );

const deleteCoupon = (couponId, token, userId) =>
  client.apiClient.post(
    `/transaction/delete-coupon/${couponId}/${userId}`,
    {},
    {headers: {Authorization: token}},
  );
const verifyRejectPayment = (dataObj, token) =>
  client.apiClient.post(
    'transaction/approval-status',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const updatePrintOrder = (dataObj, token) =>
  client.apiClient.post(
    '/print/update-print-order-trade',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const verifyRejectPrintOrder = (dataObj, token) =>
  client.apiClient.post(
    '/print/update-print-order-status',
    {...dataObj},
    {headers: {Authorization: token}},
  );

const regionWiseParcelAndDepot = (dataObj, token) =>
  client.apiClient.post(
    'reports/region-wise-parcel-depot',
    {...dataObj},
    {headers: {Authorization: token}},
  );
const getRigionList = (userId, token) =>
  client.getApiRequest.get(
    `masters/regions?userId=${userId}`,
    {},
    {headers: {Authorization: token}},
  );

const getDashboardDetail = (dataObj, token) =>
  client.apiClient.post(
    'transaction/customer-outstanding-data-weekly',
    {...dataObj},
    {headers: {Authorization: token}},
  );
const getDashboardOfPrintOrder = (data, token) =>
  client.getApiRequest.get(`${data}`, {}, {headers: {Authorization: token}});

const getDashboardDetailForCollectionExe = (data, token) =>
  client.getApiRequest.get(
    `transaction/collection-mobile?${data}`,
    {},
    {headers: {Authorization: token}},
  );

const generateReceipt = (data, token) =>
  client.getApiRequest.get(
    `print/generate-pdf/${data}`,
    {},
    {headers: {Authorization: token}},
  );
const getTodayTradeSupply = (data, token) =>
  client.getApiRequest.get(
    `supply/view-trade/${data}`,
    {},
    {headers: {Authorization: token}},
  );

export default {
  login,
  publications,
  editions,
  depots,
  supply,
  unsoldReturnSubmit,
  depotCollection,
  supplyCollection,
  outstandingAmountCollection,
  collectionSubmit,
  unsoldReturnApproval,
  collectionApproval,
  approveRejectCommon,
  securityDepositAmount,
  checkInCheckOut,
  paymentRazorpay,
  collectionRegion,
  collectionCentersRegion,
  collectionDepotRegion,
  collectionCentersRegionUserId,
  sendNotification,
  getAttendance,
  paymentTransanction,
  collectionList,
  unsoldReturnList,
  fetchQrData,
  savePrintOrder,
  getPrintOrder,
  deleteCoupon,
  verifyRejectPayment,
  collectionListVendor,
  regionWiseParcelAndDepot,
  getRigionList,
  getDashboardDetail,
  getDashboardDetailForCollectionExe,
  generateReceipt,
  DOC_URL,
  getTodayTradeSupply,
  verifyRejectPrintOrder,
  logoutApi,
  updatePrintOrder,
  getDashboardOfPrintOrder,
  getAttendenceRadius,
};
