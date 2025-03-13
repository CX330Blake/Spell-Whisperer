import PixelCard from "@/components/reactbits/PixelCard";

export default async function Page() {
    const getData = async () => {
        const data = await fetch(
            "https://localhost/api/challenge/get-info",
        ).then((res) => res.json());
        return data;
    };

    const challengeNames: string[] = [];
    const challengeLevels: string[] = [];
    const challengeInfo = await getData();

    if (challengeInfo) {
        for (const level in challengeInfo) {
            challengeLevels.push(level);
            challengeNames.push(challengeInfo[level][0]["name"]);
        }
    }

    return (
        <div className="flex gap-4">
            {challengeNames.map((name) => (
                <PixelCard variant="default" className="border border-primary">
                    {name}
                </PixelCard>
            ))}
        </div>
    );
}
