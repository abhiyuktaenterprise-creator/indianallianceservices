import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught React Error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleResetStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    } catch (e) {
      window.location.reload();
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-6 shadow-2xl">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-heading font-extrabold text-white">
                Something went wrong
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                An unexpected error occurred while loading this page. You can reload the page or reset local data to restore defaults.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-950 p-3 rounded-xl border border-red-500/20 text-left text-xs font-mono text-red-400 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={this.handleReload}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 text-xs py-5 rounded-xl"
              >
                <RefreshCw className="h-4 w-4" /> Reload Page
              </Button>
              <Button
                onClick={this.handleResetStorage}
                variant="outline"
                className="flex-1 border-slate-700 hover:bg-slate-800 text-slate-300 font-bold gap-2 text-xs py-5 rounded-xl"
              >
                <RotateCcw className="h-4 w-4 text-amber-400" /> Reset & Clear Cache
              </Button>
            </div>

            <div>
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors"
              >
                <Home className="h-3.5 w-3.5" /> Return to Homepage
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
