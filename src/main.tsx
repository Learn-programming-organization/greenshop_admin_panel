import { createRoot } from "react-dom/client";
import "./index.css";
import 'antd/dist/reset.css';
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/Context.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      // @ts-ignore
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <App />
      </AuthContext>
    </QueryClientProvider>
  </BrowserRouter>
);
