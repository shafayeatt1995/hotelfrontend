import BaseApi from "./base.api";
export class OwnerApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/owner/`);
  }

  fetchDashboard(body) {
    return this.api.$post(`dashboard`, body);
  }

  fetchExtraService(params) {
    return this.api.$get(`extra-service`, { params });
  }

  createExtraService(body) {
    return this.api.$post(`extra-service`, body);
  }

  updateExtraService(body) {
    return this.api.$patch(`extra-service`, body);
  }

  deleteExtraService(params) {
    return this.api.$delete(`extra-service`, { params });
  }

  fetchHotelInformation() {
    return this.api.$get(`room/information`);
  }

  createRoomType(body) {
    return this.api.$post(`room-type`, body);
  }

  updateRoomType(body) {
    return this.api.$patch(`room-type`, body);
  }

  fetchRoomType(params) {
    return this.api.$get(`room-type`, { params });
  }

  deleteRoomType(params) {
    return this.api.$delete(`room-type`, { params });
  }

  fetchApproveRoomType() {
    return this.api.$get(`room-type/approved`);
  }

  toggleRoomTypeStatus(params) {
    return this.api.$get(`room-type/toggle-status`, { params });
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

  deleteRoom(params) {
    return this.api.$delete(`room`, { params });
  }

  toggleRoomStatus(params) {
    return this.api.$get(`room/status`, { params });
  }
}
