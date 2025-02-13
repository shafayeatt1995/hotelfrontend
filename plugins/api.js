import {
  CommonApi,
  AdminApi,
  UserApi,
  OMApi,
  OwnerApi,
  ManagerApi,
  AMApi,
  AOApi,
} from "@/api";
export default function ({ $axios, store }, inject) {
  const { apiUrl } = store.getters;
  inject("adminApi", new AdminApi($axios, apiUrl));
  inject("userApi", new UserApi($axios, apiUrl));
  inject("omApi", new OMApi($axios, apiUrl));
  inject("commonApi", new CommonApi($axios, apiUrl));
  inject("ownerApi", new OwnerApi($axios, apiUrl));
  inject("managerApi", new ManagerApi($axios, apiUrl));
  inject("amApi", new AMApi($axios, apiUrl));
  inject("aoApi", new AOApi($axios, apiUrl));
}
