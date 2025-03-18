"use client";

import { useState } from "react";

export default function Home() {
  const [bilgi, setBilgi] = useState("Burada rastgele bir bilgi görünecek!");
  const [dil, setDil] = useState("tr"); // Varsayılan dil: Türkçe

  // API'den bilgi çeken fonksiyon
  const fetchBilgi = async () => {
    try {
      // API'den İngilizce bilgi çek
      const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
      const data = await response.json();

      let cevrilenBilgi = data.text; // Varsayılan olarak gelen metni kullan

      // Eğer seçilen dil İngilizce değilse, bilgiyi çevir
      if (dil !== "en") {
        const translateResponse = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(data.text)}&langpair=en|${dil}`
        );
        const translateData = await translateResponse.json();
        cevrilenBilgi = translateData.responseData.translatedText;
      }

      setBilgi(cevrilenBilgi);
    } catch (error) {
      console.error("Bilgi çekilirken hata oluştu:", error);
      setBilgi("Bilgi alınırken bir hata oluştu. Tekrar deneyin.");
    }
  };

  return (
    <div className="container">
      {/* Dil Seçme Alanı */}
      <div className="dil-secici">
        <label htmlFor="dil">Dil Seç:</label>
        <select id="dil" value={dil} onChange={(e) => setDil(e.target.value)}>
          <option value="tr">Türkçe</option>
          <option value="en">İngilizce</option>
          <option value="es">İspanyolca</option>
        </select>
      </div>

      {/* Bilginin Gözükeceği Alan */}
      <div className="bilgi-box">
        <p>{bilgi}</p>
      </div>

      {/* Rastgele Bilgi Butonu */}
      <button className="fact-button" onClick={fetchBilgi}>
        <div className="button-outer">
          <div className="button-inner">
            <span>Rastgele Bilgi!</span>
          </div>
        </div>
      </button>
    </div>
  );
}
