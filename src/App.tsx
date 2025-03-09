import "./App.css";
import SplashCursor from "./reactbits/SplashCursor";
import Title from "./components/Title";
import Chat from "./components/Chat";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import Options from "./components/Options";
import Footer from "./components/Footer";

function App() {
    return (
        <ThemeProvider
            defaultTheme="light"
            attribute="class"
            enableSystem={false}
            storageKey="theme"
            disableTransitionOnChange
        >
            <SplashCursor />
            <p className=" align-middle justify-center">
                <Title />
                <br />
                <Options />
                <br />
                <Chat />
                <br />
                <br />
            </p>
            <p>
                <Footer />
            </p>
        </ThemeProvider>
    );
}

export default App;
