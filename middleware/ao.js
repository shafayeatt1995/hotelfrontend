export default function ({ store, redirect }) {
  if (!(store.getters.superAdmin || store.getters.owner)) {
    return redirect("/");
  }
}
