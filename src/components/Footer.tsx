import CircularText from "./reactbits/CircularText";

export default function Footer() {
    return (
        <div className="flex justify-center">
            <div>Test</div>
            <CircularText
                text="Made*By*CX330*With*Love*"
                onHover="slowDown"
                spinDuration={20}
                className="text-primary font-victor-mono"
            />
            <div>Test</div>
        </div>
    );
}
