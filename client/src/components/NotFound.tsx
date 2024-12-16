import { Link } from "react-router";
import { paths } from "../constants";

export const NotFound = () => {
  return (
    <section className="card">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link style={{ alignSelf: "center" }} to={paths.home}>
        Go to Home
      </Link>
    </section>
  );
};
