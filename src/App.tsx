import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router-dom";
import { EmailSidebarProvider } from "./context/EmailSidebarContext";
import { LoadingProvider } from "./context/LoadingContext";
import { IsSubmittingContextProvider } from "./context/isSubmittingContext";
import { router } from "./routes/AppRoutes";
import React from 'react';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("CRITICAL CRASH:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-20 text-center">
          <h1 className="text-2xl font-bold text-red-600">Global Application Error</h1>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-left overflow-auto max-h-96">
            {this.state.error?.stack || this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-primary text-white rounded-xl">Reload App</button>
        </div>
      );
    }
    return this.props.children;
  }
}


function App() {
  console.log("App Rendering...");
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LoadingProvider>
        <IsSubmittingContextProvider>
          <EmailSidebarProvider>
            <RouterProvider router={router} />
          </EmailSidebarProvider>
        </IsSubmittingContextProvider>
      </LoadingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
