// src/App.jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!number.trim()) return;
    setLoading(true);
    setResults([]);
    setError(null);

    try {
      const res = await fetch("https://your-heroku-api.com/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plate: number }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Помилка при перевірці номеру. Спробуйте пізніше.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Перевірка доступності номеру для авто</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Введіть номер (наприклад, 1337)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition"
          >
            {loading ? "Перевіряю..." : "Перевірити"}
          </button>
        </form>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <ul className="mt-6 space-y-2">
          {results.map((res, index) => (
            <li
              key={index}
              className={`p-3 rounded-xl shadow text-white ${res.status === "available" ? "bg-green-600" : "bg-red-600"}`}
            >
              {res.region}: {res.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
