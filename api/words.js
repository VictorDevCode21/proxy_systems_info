// api/words.js
export default async function handler(req, res) {
    try {
        const apiUrl = "https://random-words-api.kushcreates.com/api?language=es&words=20";
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Upstream error " + response.status);
        }

        const data = await response.json(); // probablemente un array de objetos

        // Mapea a solo palabra si viene con estructura
        const words = data.map(item => {
            // si el objeto es { word: "casa", definition: ... }
            return item.word ? item.word : item;
        });

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        return res.status(200).json(words);
    } catch (error) {
        console.error("proxy error:", error);
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(500).json({ error: "Error fetching words", details: String(error) });
    }
}