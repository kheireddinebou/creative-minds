import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { ThemeProvider } from "../context/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
export default MyApp;
