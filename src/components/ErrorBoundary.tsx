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

    render() {
        if (this.state.hasError) {
            const message = this.state.error?.message || 'Unknown error (error object is undefined)';
            const stack = this.state.error?.stack || '';
            return (
                <div style={{ padding: 32, color: 'red', background: '#fff0f0', borderRadius: 8, fontFamily: 'monospace' }}>
                    <h2>Something went wrong.</h2>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{message + (stack ? '\n' + stack : '')}</pre>
                    <p>If this message is not helpful, check the browser console for more details.</p>
                </div>
            );
        }
        return this.props.children;
    }
}
