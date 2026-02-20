import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedRoutes = ({
  Home,
  CreateMatch,
  LiveMatch,
  Matches,
  MatchDetail,
  Leaderboard,
}) => {
  const location = useLocation();
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [location]);

  return (
    <div ref={containerRef}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateMatch />} />
        <Route path="/match/live" element={<LiveMatch />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/:id" element={<MatchDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
};

export default AnimatedRoutes;