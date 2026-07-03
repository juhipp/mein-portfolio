import { renderToString } from "react-dom/server";
import Portfolio from "./portfolio";

export function render() {
  return renderToString(<Portfolio />);
}
