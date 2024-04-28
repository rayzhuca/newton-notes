interface BoldedTextProps {
    text: string;
}

const BoldedText: React.FC<BoldedTextProps> = ({ text }) => {
    const separated = text.split(/(\*\*.+?\*\*)/);
    return separated.map((v, i) => {
        if (v.startsWith("**") && v.endsWith("**")) {
            return (
                <div className="font-semibold" key={i}>
                    <p className="whitespace-pre-line">{v.slice(2, -2)}</p>
                </div>
            );
        }
        if (v.trim() === "") {
            return null;
        }
        return (
            <div className="text-sm font-normal" key={i}>
                <p className="leading-6 whitespace-pre-line">{v}</p>
            </div>
        );
    });
};

export default BoldedText;
