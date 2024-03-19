import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        if (window) window.location.replace("https://mngo.in");
    }, []);

    return (
        <main>
            MNgo Profile
        </main>
    );
}
