export default function ({ error, redirect }) {
  if (error && error.statusCode === 404) {
    redirect("/not-found");
  }
}
