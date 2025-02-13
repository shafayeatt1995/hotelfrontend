import BaseApi from "./base.api";
export class AMApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/am/`);
  }
}
