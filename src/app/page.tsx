import Title from "@/components/Title";
import Chat from "@/components/Chat";
import Options from "@/components/Options";
import Footer from "@/components/Footer";
import SplashCursor from "@/components/reactbits/SplashCursor";

function App() {
    return (
        <div className="flex flex-col items-center justify-between h-screen">
            <SplashCursor />
            <div className="mt-12">
                {/* Main Content */}
                <div className="h-auto">
                    <Title />
                    <br />
                    <Options />
                    <br />
                    <Chat />
                    <br />
                    <br />
                </div>
                {/* Footer */}
                <br />
                <br />
                <div className="flex justify-center w-full">
                    <Footer />
                </div>
                {/* <div className="bg-primary">TEST</div> */}
            </div>
        </div>
    );
}

export default App;
