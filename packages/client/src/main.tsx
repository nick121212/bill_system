// react-query
import { Suspense } from "react";
// vercel analytics
import ReactDOM from "react-dom/client";
// react
import { HelmetProvider } from "react-helmet-async";
import "virtual:svg-icons-register";
// helmet
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// svg icons
import { Analytics } from "@vercel/analytics/react";

// mock api
import worker from "./_mock";
// i18n
import App from "./App";
// css
import ProgressBar from "./components/progress-bar";
import "./locales/i18n";

// root component
import "./global.css";
import "./theme/theme.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<HelmetProvider>
		<QueryClientProvider client={new QueryClient()}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<Suspense>
				<ProgressBar />
				<Analytics />
				<App />
			</Suspense>
		</QueryClientProvider>
	</HelmetProvider>,
);

// 🥵 start service worker mock in development mode
worker.start({ onUnhandledRequest: "bypass" });
