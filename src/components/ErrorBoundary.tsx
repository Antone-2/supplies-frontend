import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Always log error to the console for debugging
        // eslint-disable-next-line no-console
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            const message = this.state.error?.message || 'Unknown error (error object is undefined)';
            const stack = this.state.error?.stack || '';
            return (
                <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
                    <p className="text-sm text-gray-600 mb-4 max-w-prose">An unexpected error occurred while rendering this section. You can retry or go back home.</p>
                    <div className="flex gap-3 mb-4">
                        <button onClick={this.handleRetry} className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition">Retry</button>
                        <a href="/" className="px-4 py-2 rounded border text-sm hover:bg-gray-100 transition">Home</a>
                    </div>
                    {process.env.NODE_ENV === 'development' && (
                        <pre className="text-left text-xs bg-gray-100 p-3 rounded border max-w-full overflow-auto whitespace-pre-wrap">
                            {message + (stack ? '\n' + stack : '')}
                        </pre>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}
