"use client";

import { Component, type ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };
type State = { hasError: boolean };

// Catches any React Three Fiber / WebGL runtime error (unsupported browser,
// disabled GPU acceleration, etc.) so it never crashes the page — it just
// swaps to the SVG globe fallback.
export default class GlobeErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("3D globe failed to render, using fallback:", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
