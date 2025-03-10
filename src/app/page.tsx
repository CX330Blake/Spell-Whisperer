import Title from "@/components/Title";
import Chat from "@/components/Chat";
import Options from "@/components/Options";
import Footer from "@/components/Footer";
import SplashCursor from "@/components/reactbits/SplashCursor";

function App() {
    return (
        <>
            <span className="w-3/4">
                <SplashCursor />
                <span className=" align-middle justify-center">
                    <Title />
                    <br />
                    <Options />
                    <br />
                    <Chat />
                    <br />
                    <br />
                </span>
                <span>
                    <Footer />
                </span>
            </span>
        </>
    );
}

export default App;
