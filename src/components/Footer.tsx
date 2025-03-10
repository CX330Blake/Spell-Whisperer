import CircularText from "./reactbits/CircularText";

export default function Footer() {
    return (
        <div>
            <CircularText
                text="Made*By*CX330*With*Love*"
                onHover="slowDown"
                spinDuration={20}
                className="text-primary font-playwrite"
            />
        </div>
    );
}
