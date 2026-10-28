import { ViewTransition } from "react";

// Re-mounts on every navigation, so each page fades out and rises in.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
