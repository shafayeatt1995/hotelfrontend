class BaseApi {
  constructor($axios) {
    this.api = $axios.create({ withCredentials: true });
  }
}

export default BaseApi;
