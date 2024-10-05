import BaseApi from "./base.api";
export class AdminApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/admin/`);
  }

  fetchHotel(params) {
    return this.api.$get(`hotel`, { params });
  }

  fetchHotelOM(params) {
    return this.api.$get(`hotel/om`, { params });
  }

  fetchLocations() {
    return this.api.$get(`hotel/location`);
  }

  fetchOMUsers(params) {
    return this.api.$get(`hotel/users/om`, { params });
  }

  updateOmUser(body) {
    return this.api.$post(`hotel/users/om`, body);
  }

  fetchRoomHotels(body) {
    return this.api.$post(`room/hotel`, body);
  }

  createHotel(body) {
    return this.api.$post(`hotel`, body);
  }

  updateHotel(body) {
    return this.api.$patch(`hotel`, body);
  }

  deleteHotel(params) {
    return this.api.$delete(`hotel`, { params });
  }

  suspendHotel(body) {
    return this.api.$put(`hotel`, body);
  }

  fetchUser(params) {
    return this.api.$get(`user`, { params });
  }

  createUser(body) {
    return this.api.$post(`user`, body);
  }

  updateUser(body) {
    return this.api.$patch(`user`, body);
  }

  deleteUser(params) {
    return this.api.$delete(`user`, { params });
  }

  suspendUser(body) {
    return this.api.$put(`user`, body);
  }

  fetchLocation(params) {
    return this.api.$get(`location`, { params });
  }

  toggleLocationStatus(params) {
    return this.api.$get(`location/toggle-status`, { params });
  }

  createLocation(body) {
    return this.api.$post(`location`, body);
  }

  updateLocation(body) {
    return this.api.$patch(`location`, body);
  }

  fetchRoom(params) {
    return this.api.$get(`room`, { params });
  }

  createRoom(body) {
    return this.api.$post(`room`, body);
  }

  updateRoom(body) {
    return this.api.$patch(`room`, body);
  }

  toggleRoomStatus(params) {
    return this.api.$get(`room/toggle-status`, { params });
  }

  fetchFacility(params) {
    return this.api.$get(`facility`, { params });
  }

  createFacility(body) {
    return this.api.$post(`facility`, body);
  }

  updateFacility(body) {
    return this.api.$patch(`facility`, body);
  }

  deleteFacility(params) {
    return this.api.$delete(`facility`, { params });
  }

  toggleFacilityStatus(params) {
    return this.api.$get(`facility/toggle-status`, { params });
  }

  toggleApprovedRoomType(params) {
    return this.api.$get(`room-type/toggle-approve`, { params });
  }

  fetchAccommodationType(params) {
    return this.api.$get(`accommodation-type`, { params });
  }

  createAccommodationType(body) {
    return this.api.$post(`accommodation-type`, body);
  }

  updateAccommodationType(body) {
    return this.api.$patch(`accommodation-type`, body);
  }

  deleteAccommodationType(params) {
    return this.api.$delete(`accommodation-type`, { params });
  }

  fetchBedType(params) {
    return this.api.$get(`bed-type`, { params });
  }

  createBedType(body) {
    return this.api.$post(`bed-type`, body);
  }

  updateBedType(body) {
    return this.api.$patch(`bed-type`, body);
  }

  deleteBedType(params) {
    return this.api.$delete(`bed-type`, { params });
  }

  fetchNotApproveRoomType(params) {
    return this.api.$get(`room-type/not-approved`, { params });
  }

  deleteRoomType(params) {
    return this.api.$delete(`room-type`, { params });
  }

  fetchActiveUsers() {
    return this.api.$get(`user/active-user`);
  }
}
