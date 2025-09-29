export default async function handler(req, res) {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=20&lang=es");
        const data = await response.json();

        // Aquí forzamos CORS abierto
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching words" });
    }
}