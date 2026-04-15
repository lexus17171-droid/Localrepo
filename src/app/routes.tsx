import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./components/SplashScreen";
import { LoginSignup } from "./components/LoginSignup";
import { HomeDashboard } from "./components/HomeDashboard";
import { SmartBinStatus } from "./components/SmartBinStatus";
import { LiveTruckTracking } from "./components/LiveTruckTracking";
import { AISegregationAssistant } from "./components/AISegregationAssistant";
import { ReportIssue } from "./components/ReportIssue";
import { RewardsGamification } from "./components/RewardsGamification";
import { UserProfile } from "./components/UserProfile";
import { AdminDashboard } from "./components/AdminDashboard";
import { MobileLayout } from "./components/MobileLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginSignup,
  },
  {
    path: "/app",
    Component: MobileLayout,
    children: [
      { index: true, Component: HomeDashboard },
      { path: "bin-status", Component: SmartBinStatus },
      { path: "truck-tracking", Component: LiveTruckTracking },
      { path: "ai-assistant", Component: AISegregationAssistant },
      { path: "report-issue", Component: ReportIssue },
      { path: "rewards", Component: RewardsGamification },
      { path: "profile", Component: UserProfile },
    ],
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
