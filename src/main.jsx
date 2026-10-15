import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LibraryApp from "./library/LibraryApp.jsx";
import { ContentProvider } from "./data/cms.js";

// The library is served on its own subdomain (library.acu.edu.ng) from the same
// build. When the host starts with "library." the app renders the library shell
// instead of the university site; on the main domain it stays reachable at
// /library for previews and deep links.
const isLibraryHost = /^library\./i.test(window.location.hostname);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContentProvider>
        {isLibraryHost ? <LibraryApp /> : <App />}
      </ContentProvider>
    </BrowserRouter>
  </StrictMode>
);
