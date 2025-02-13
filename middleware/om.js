export default function ({ store, redirect }) {
  if (!(store.getters.manager || store.getters.owner)) {
    return redirect("/");
  }
}
