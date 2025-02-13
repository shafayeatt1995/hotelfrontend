import BaseApi from "./base.api";
export class AOApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/ao/`);
  }
}
