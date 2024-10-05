import BaseApi from "./base.api";
export class ManagerApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/manager/`);
  }

  fetchDashboard(body) {
    return this.api.$post(`dashboard`, body);
  }
}
