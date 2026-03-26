import { createBrowserRouter, Navigate } from "react-router";
import { Welcome } from "./components/onboarding/Welcome";
import { Agreement } from "./components/onboarding/Agreement";
import { InstallPath } from "./components/onboarding/InstallPath";
import { Installing } from "./components/onboarding/Installing";
import { Complete } from "./components/onboarding/Complete";
import { Splash } from "./components/onboarding/Splash";
import { EditorMain } from "./components/editor/EditorMain";
import { RedirectToHome } from "./components/Redirect";
import { ErrorBoundary } from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/agreement",
    Component: Agreement,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/install-path",
    Component: InstallPath,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/installing",
    Component: Installing,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/complete",
    Component: Complete,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/splash",
    Component: Splash,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/editor",
    Component: EditorMain,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "*",
    Component: RedirectToHome,
    ErrorBoundary: ErrorBoundary,
  },
]);