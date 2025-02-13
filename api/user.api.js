import BaseApi from "./base.api";
export class UserApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/user/`);
  }

  updateProfile(params) {
    return this.api.$get(`update-profile`, { params });
  }

  updatePassword(params) {
    return this.api.$get(`update-password`, { params });
  }

  fetchImage(params) {
    return this.api.$get(`image`, { params });
  }

  deleteImage(params) {
    return this.api.$delete(`image`, { params });
  }

  updateHotelProfile(body) {
    return this.api.$post(`update-hotel`, body);
  }

  bookingInitiate(body) {
    return this.api.$post(`booking/initiate`, body);
  }

  bookingVerify(body) {
    return this.api.$post(`booking/verify`, body);
  }

  fetchBookingDetails(body) {
    return this.api.$post(`booking/details`, body);
  }

  fetchBooking(body) {
    return this.api.$post(`booking/fetch`, body);
  }

  makePayment(body) {
    return this.api.$post(`booking/make-payment`, body);
  }

  toggleWishlist(body) {
    return this.api.$post(`wishlist`, body);
  }

  fetchWishlist() {
    return this.api.$get(`wishlist`);
  }

  fetchWishlists(body) {
    return this.api.$post(`wishlist/all`, body);
  }

  submitReview(body) {
    return this.api.$post(`review/submit`, body);
  }

  updateToken(body) {
    return this.api.$post(`update-token`, body);
  }
}
