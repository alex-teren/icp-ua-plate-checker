// src/App.jsx
import { useState } from "react";
import "./App.css";

const regionsDict = {
  1: "АР Крим",
  2: "Вінницька",
  3: "Волинська",
  4: "Дніпропетровська",
  5: "Донецька",
  6: "Житомирська",
  7: "Закарпатська",
  8: "Запорізька",
  9: "Івано-Франківська",
  10: "Київська",
  11: "Кіровоградська",
  12: "Луганська",
  13: "Львівська",
  14: "Миколаївська",
  15: "Одеська",
  16: "Полтавська",
  17: "Рівненська",
  18: "Сумська",
  19: "Тернопільська",
  20: "Харківська",
  21: "Херсонська",
  22: "Хмельницька",
  23: "Черкаська",
  24: "Чернівецька",
  25: "Чернігівська",
  26: "м. Київ",
};

function App() {
  const [plate, setPlate] = useState("");
  const [results, setResults] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");

  const checkRegion = async (regionId) => {
    const response = await fetch(
      "https://ua-plate-checker-api-237f2e397c5e.herokuapp.com/check",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate, region: regionId }),
      }
    );

    if (!response.ok) {
      return { regionId, error: "Error checking region" };
    }

    const data = await response.json();
    return data;
  };

  const handleCheck = async () => {
    if (!/^\d{4}$/.test(plate)) {
      setError("Будь ласка, введіть рівно 4 цифри");
      return;
    }

    setError("");
    setIsChecking(true);
    setResults([]);

    for (let regionId = 1; regionId <= 26; regionId++) {
      const result = await checkRegion(regionId);
      setResults((prev) => [...prev, result]);

      await new Promise((r) => setTimeout(r, 1000));
    }

    setIsChecking(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^\d{0,4}$/.test(value)) {
      setPlate(value);
      setError("");
    } else {
      setError("Дозволено вводити тільки цифри (макс. 4)");
    }
  };

  return (
    <div className="flex w-full h-full justify-center">
      <div className="flex flex-col gap-5 w-[500px] max-w-full py-10 px-6">
        <div className="flex gap-4">
          <input
            value={plate}
            onChange={handleChange}
            className={`border rounded p-2 px-4 grow ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Введіть 4 цифри номера"
            maxLength={4}
          />

          <button
            onClick={handleCheck}
            disabled={isChecking || plate.length !== 4}
            className="bg-blue-500 shrink text-white py-2 px-6 whitespace-nowrap rounded disabled:bg-gray-300"
          >
            {isChecking ? "Перевірка..." : "Перевірити"}
          </button>
        </div>

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <div className="mt-4">
          {results.map((r, idx) => (
            <div key={idx}>
              {regionsDict[r.region]}:{" "}
              <span
                className={
                  r.result.includes(plate) ? "text-green-500" : "text-red-500"
                }
              >
                {r.result.includes(plate) ? "Доступний ✅" : "НЕ доступний ❌"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
