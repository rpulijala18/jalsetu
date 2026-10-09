import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('JalSetu Runtime Uncaught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-[#030712] p-6 text-white font-mono">
          <div className="max-w-md w-full bg-[#071324] border border-red-500/40 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-200">System Telemetry Interruption</h2>
              <p className="text-xs text-slate-400 mt-1">
                A canvas or rendering thread exception occurred. Safe failover mode activated.
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 bg-black/40 rounded-lg text-left text-[11px] text-red-300/80 font-mono overflow-auto max-h-32 border border-red-900/30">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-cyan flex items-center justify-center gap-2 mx-auto active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RELOAD COMMAND CENTER</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
