import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.jsx';
import ErrorFallback from './ui/ErrorFallback.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
			<App />
		</ErrorBoundary>
	</StrictMode>
);
