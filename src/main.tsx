import ReactDOM from "react-dom/client";
import App from "./app";
import { ThemeProvider } from "./context/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider themes={["dark", "light"]} defaultTheme="dark">
    <App />
  </ThemeProvider>,
);
