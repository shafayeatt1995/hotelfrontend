import BaseApi from "./base.api";
export class OMApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/om/`);
  }

  fetchRoom(params) {
    return this.api.$get(`room`, { params });
  }

  toggleRoomStatus(params) {
    return this.api.$get(`room/toggle-status`, { params });
  }

  updateRoom(body) {
    return this.api.$patch(`room`, body);
  }

  fetchComplement(params) {
    return this.api.$get(`complement`, { params });
  }

  createComplement(body) {
    return this.api.$post(`complement`, body);
  }

  updateComplement(body) {
    return this.api.$patch(`complement`, body);
  }

  deleteComplement(params) {
    return this.api.$delete(`complement`, { params });
  }

  getSalesLog(body) {
    return this.api.$post(`sales-log`, body);
  }

  fetchBooking(body) {
    return this.api.$post(`fetch-booking`, body);
  }
}
