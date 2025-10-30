import { ThemeContextProvider } from "@/contexts/ThemeContext";
// import other providers here, ToastProvider, QueryClientProvider


export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContextProvider>
      {/* Add more providers here as your app grows */}
      {children}
    </ThemeContextProvider>
  );
};
