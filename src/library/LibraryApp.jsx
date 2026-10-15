import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop.jsx";
import NotFound from "../pages/NotFound.jsx";
import LibraryShell from "./LibraryShell.jsx";
import LibraryHome from "./pages/LibraryHome.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import CatalogueItem from "./pages/CatalogueItem.jsx";
import EResources from "./pages/EResources.jsx";
import Services from "./pages/Services.jsx";
import LibraryAbout from "./pages/LibraryAbout.jsx";
import Repository from "./pages/Repository.jsx";
import RepositoryRecord from "./pages/RepositoryRecord.jsx";
import AskLibrarian from "./pages/AskLibrarian.jsx";

// The library app renders at "/" on library.acu.edu.ng and under "/library" when
// previewed from the main site. Routes are relative so the same component works
// both as a top-level router and nested under "/library/*".
export default function LibraryApp({ base = "" }) {
  return (
    <LibraryShell base={base}>
      <ScrollToTop />
      <Routes>
        <Route index element={<LibraryHome base={base} />} />
        <Route path="catalogue" element={<Catalogue base={base} />} />
        <Route path="catalogue/:slug" element={<CatalogueItem base={base} />} />
        <Route path="e-resources" element={<EResources />} />
        <Route path="services" element={<Services base={base} />} />
        <Route path="about" element={<LibraryAbout base={base} />} />
        <Route path="repository" element={<Repository base={base} />} />
        <Route path="repository/:slug" element={<RepositoryRecord base={base} />} />
        <Route path="contact" element={<AskLibrarian />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LibraryShell>
  );
}
