import BaseApi from "./base.api";
export class CommonApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/`);
  }

  fetchLocationsProperty(params) {
    return this.api.$get(`fetch/location-property`, { params });
  }

  fetchAllLocation() {
    return this.api.$get(`fetch/all-location`);
  }

  fetchHomeData() {
    return this.api.$get(`fetch/home-data`);
  }

  fetchAllAccommodationTypeOnce() {
    return this.api.$get(`fetch/all-accommodation-type`);
  }

  fetchAllFacilitiesOnce() {
    return this.api.$get(`fetch/all-facilities`);
  }

  fetchAllBedsOnce() {
    return this.api.$get(`fetch/all-beds`);
  }

  fetchSearchHotels(body) {
    return this.api.$post(`fetch/search-hotels`, body);
  }

  fetchHotelRoomTypes(body) {
    return this.api.$post(`fetch/hotel-room-types`, body);
  }

  fetchReview(body) {
    return this.api.$post(`fetch/review`, body);
  }

  fetchReviewSummary(body) {
    return this.api.$post(`fetch/review-summary`, body);
  }

  fetchDemoPost(body) {
    return this.api.$post(`fetch/demo-post`, body);
  }
}
