export default function ({ store, redirect }) {
  if (!store.getters.superAdmin) {
    return redirect("/");
  }
}
