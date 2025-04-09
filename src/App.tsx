
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LogPage from "./pages/LogPage";
import ViewPage from "./pages/ViewPage";
import SearchPage from "./pages/SearchPage";
import StatsPage from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background">
          <NavBar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/log" element={<LogPage />} />
              <Route path="/view" element={<ViewPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
