import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AnimatedRoutes from "./components/layout/AnimatedRoutes";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const CreateMatch = lazy(() => import("./pages/CreateMatch"));
const LiveMatch = lazy(() => import("./pages/LiveMatch"));
const Matches = lazy(() => import("./pages/Matches"));
const MatchDetail = lazy(() => import("./pages/MatchDetail"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      {/* Top Navigation */}
      <Navbar />

      {/* Suspense for Lazy Loading */}
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AnimatedRoutes
          Home={Home}
          CreateMatch={CreateMatch}
          LiveMatch={LiveMatch}
          Matches={Matches}
          MatchDetail={MatchDetail}
          Leaderboard={Leaderboard}
        />
      </Suspense>

      {/* Footer Navigation */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;