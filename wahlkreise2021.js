// Wahlergebnisse der Landtagswahl Baden-Württemberg 2021
// Quelle: Statistisches Landesamt Baden-Württemberg / Wikipedia
// Erststimmen (Direktmandate) in Prozent

const WAHLKREISE_2021 = [
    // Regierungsbezirk Stuttgart
    { id: 1, name: "Stuttgart I", erststimmen: { "Grüne": 44.8, "CDU": 17.9, "SPD": 9.4, "AfD": 3.3, "FDP": 10.1, "Linke": 7.5 }, gewinner2021: "Grüne" },
    { id: 2, name: "Stuttgart II", erststimmen: { "Grüne": 39.8, "CDU": 21.7, "SPD": 10.0, "AfD": 4.9, "FDP": 12.9, "Linke": 4.4 }, gewinner2021: "Grüne" },
    { id: 3, name: "Stuttgart III", erststimmen: { "Grüne": 33.9, "CDU": 24.3, "SPD": 12.2, "AfD": 8.0, "FDP": 10.6, "Linke": 4.8 }, gewinner2021: "Grüne" },
    { id: 4, name: "Stuttgart IV", erststimmen: { "Grüne": 35.6, "CDU": 21.5, "SPD": 13.2, "AfD": 5.8, "FDP": 9.7, "Linke": 7.0 }, gewinner2021: "Grüne" },
    { id: 5, name: "Böblingen", erststimmen: { "Grüne": 32.1, "CDU": 26.8, "SPD": 10.5, "AfD": 9.2, "FDP": 12.4, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 6, name: "Leonberg", erststimmen: { "Grüne": 33.5, "CDU": 25.2, "SPD": 10.8, "AfD": 8.5, "FDP": 13.1, "Linke": 2.9 }, gewinner2021: "Grüne" },
    { id: 7, name: "Esslingen", erststimmen: { "Grüne": 35.2, "CDU": 22.4, "SPD": 12.1, "AfD": 7.8, "FDP": 11.3, "Linke": 4.2 }, gewinner2021: "Grüne" },
    { id: 8, name: "Kirchheim", erststimmen: { "Grüne": 33.8, "CDU": 24.9, "SPD": 11.2, "AfD": 8.9, "FDP": 11.8, "Linke": 3.1 }, gewinner2021: "Grüne" },
    { id: 9, name: "Nürtingen", erststimmen: { "Grüne": 34.6, "CDU": 25.3, "SPD": 10.4, "AfD": 8.7, "FDP": 12.2, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 10, name: "Göppingen", erststimmen: { "Grüne": 29.8, "CDU": 26.5, "SPD": 13.2, "AfD": 10.8, "FDP": 10.1, "Linke": 3.2 }, gewinner2021: "Grüne" },
    { id: 11, name: "Geislingen", erststimmen: { "Grüne": 28.4, "CDU": 27.8, "SPD": 12.1, "AfD": 12.5, "FDP": 10.2, "Linke": 2.6 }, gewinner2021: "Grüne" },
    { id: 12, name: "Ludwigsburg", erststimmen: { "Grüne": 35.8, "CDU": 22.9, "SPD": 11.5, "AfD": 7.2, "FDP": 12.8, "Linke": 3.5 }, gewinner2021: "Grüne" },
    { id: 13, name: "Vaihingen", erststimmen: { "Grüne": 30.2, "CDU": 28.5, "SPD": 10.8, "AfD": 10.1, "FDP": 11.9, "Linke": 2.4 }, gewinner2021: "Grüne" },
    { id: 14, name: "Bietigheim-Bissingen", erststimmen: { "Grüne": 32.4, "CDU": 26.1, "SPD": 11.9, "AfD": 9.3, "FDP": 11.5, "Linke": 2.7 }, gewinner2021: "Grüne" },
    { id: 15, name: "Waiblingen", erststimmen: { "Grüne": 33.1, "CDU": 24.8, "SPD": 11.4, "AfD": 9.1, "FDP": 12.4, "Linke": 3.0 }, gewinner2021: "Grüne" },
    { id: 16, name: "Schorndorf", erststimmen: { "Grüne": 31.5, "CDU": 26.2, "SPD": 12.3, "AfD": 10.2, "FDP": 10.8, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 17, name: "Backnang", erststimmen: { "Grüne": 29.8, "CDU": 28.1, "SPD": 11.8, "AfD": 11.2, "FDP": 10.5, "Linke": 2.5 }, gewinner2021: "Grüne" },
    { id: 18, name: "Schwäbisch Hall", erststimmen: { "Grüne": 28.5, "CDU": 30.2, "SPD": 10.8, "AfD": 11.8, "FDP": 10.1, "Linke": 2.3 }, gewinner2021: "CDU" },
    { id: 19, name: "Hohenlohe", erststimmen: { "Grüne": 26.8, "CDU": 32.5, "SPD": 10.2, "AfD": 12.1, "FDP": 10.4, "Linke": 2.1 }, gewinner2021: "CDU" },
    { id: 20, name: "Main-Tauber", erststimmen: { "Grüne": 24.2, "CDU": 35.8, "SPD": 11.5, "AfD": 11.2, "FDP": 9.8, "Linke": 2.0 }, gewinner2021: "CDU" },
    { id: 21, name: "Heidenheim", erststimmen: { "Grüne": 29.5, "CDU": 28.2, "SPD": 14.2, "AfD": 11.5, "FDP": 9.2, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 22, name: "Aalen", erststimmen: { "Grüne": 30.2, "CDU": 28.5, "SPD": 12.8, "AfD": 10.8, "FDP": 9.8, "Linke": 2.5 }, gewinner2021: "Grüne" },
    { id: 23, name: "Schwäbisch Gmünd", erststimmen: { "Grüne": 27.2, "CDU": 31.5, "SPD": 11.5, "AfD": 11.2, "FDP": 10.2, "Linke": 2.4 }, gewinner2021: "CDU" },
    { id: 24, name: "Heilbronn", erststimmen: { "Grüne": 30.5, "CDU": 24.8, "SPD": 14.2, "AfD": 10.5, "FDP": 10.8, "Linke": 3.2 }, gewinner2021: "Grüne" },
    { id: 25, name: "Eppingen", erststimmen: { "Grüne": 28.2, "CDU": 29.8, "SPD": 11.8, "AfD": 11.5, "FDP": 10.5, "Linke": 2.3 }, gewinner2021: "CDU" },
    { id: 26, name: "Neckarsulm", erststimmen: { "Grüne": 29.5, "CDU": 27.2, "SPD": 13.5, "AfD": 10.8, "FDP": 10.2, "Linke": 2.8 }, gewinner2021: "Grüne" },
    
    // Regierungsbezirk Karlsruhe
    { id: 27, name: "Karlsruhe I", erststimmen: { "Grüne": 39.1, "CDU": 17.5, "SPD": 11.8, "AfD": 6.7, "FDP": 8.2, "Linke": 6.9 }, gewinner2021: "Grüne" },
    { id: 28, name: "Karlsruhe II", erststimmen: { "Grüne": 35.8, "CDU": 22.5, "SPD": 12.2, "AfD": 8.5, "FDP": 10.8, "Linke": 4.2 }, gewinner2021: "Grüne" },
    { id: 29, name: "Bruchsal", erststimmen: { "Grüne": 30.2, "CDU": 28.5, "SPD": 11.5, "AfD": 10.8, "FDP": 10.5, "Linke": 2.5 }, gewinner2021: "Grüne" },
    { id: 30, name: "Bretten", erststimmen: { "Grüne": 29.5, "CDU": 29.2, "SPD": 11.2, "AfD": 11.2, "FDP": 10.8, "Linke": 2.3 }, gewinner2021: "Grüne" },
    { id: 31, name: "Ettlingen", erststimmen: { "Grüne": 34.2, "CDU": 24.8, "SPD": 11.5, "AfD": 9.2, "FDP": 11.2, "Linke": 3.1 }, gewinner2021: "Grüne" },
    { id: 32, name: "Rastatt", erststimmen: { "Grüne": 31.5, "CDU": 26.8, "SPD": 12.5, "AfD": 10.5, "FDP": 9.8, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 33, name: "Baden-Baden", erststimmen: { "Grüne": 32.8, "CDU": 27.2, "SPD": 10.8, "AfD": 9.8, "FDP": 11.2, "Linke": 2.5 }, gewinner2021: "Grüne" },
    { id: 34, name: "Heidelberg", erststimmen: { "Grüne": 41.7, "CDU": 15.3, "SPD": 12.7, "AfD": 5.2, "FDP": 7.0, "Linke": 8.4 }, gewinner2021: "Grüne" },
    { id: 35, name: "Mannheim I", erststimmen: { "Grüne": 27.8, "CDU": 15.2, "SPD": 21.7, "AfD": 12.7, "FDP": 6.7, "Linke": 6.2 }, gewinner2021: "Grüne" },
    { id: 36, name: "Mannheim II", erststimmen: { "Grüne": 35.9, "CDU": 16.7, "SPD": 15.9, "AfD": 7.9, "FDP": 9.3, "Linke": 5.5 }, gewinner2021: "Grüne" },
    { id: 37, name: "Weinheim", erststimmen: { "Grüne": 33.5, "CDU": 24.2, "SPD": 12.8, "AfD": 9.5, "FDP": 10.5, "Linke": 3.2 }, gewinner2021: "Grüne" },
    { id: 38, name: "Schwetzingen", erststimmen: { "Grüne": 32.8, "CDU": 23.5, "SPD": 14.2, "AfD": 9.8, "FDP": 10.2, "Linke": 3.5 }, gewinner2021: "Grüne" },
    { id: 39, name: "Wiesloch", erststimmen: { "Grüne": 34.5, "CDU": 24.8, "SPD": 12.5, "AfD": 9.2, "FDP": 10.8, "Linke": 3.0 }, gewinner2021: "Grüne" },
    { id: 40, name: "Sinsheim", erststimmen: { "Grüne": 29.3, "CDU": 28.5, "SPD": 12.2, "AfD": 11.5, "FDP": 10.2, "Linke": 2.5 }, gewinner2021: "Grüne" },
    { id: 41, name: "Neckar-Odenwald", erststimmen: { "Grüne": 23.7, "CDU": 31.6, "SPD": 12.2, "AfD": 12.3, "FDP": 7.9, "Linke": 2.4 }, gewinner2021: "CDU" },
    { id: 42, name: "Pforzheim", erststimmen: { "Grüne": 26.5, "CDU": 22.8, "SPD": 14.5, "AfD": 14.2, "FDP": 9.8, "Linke": 4.2 }, gewinner2021: "Grüne" },
    { id: 43, name: "Calw", erststimmen: { "Grüne": 27.1, "CDU": 28.8, "SPD": 10.5, "AfD": 13.2, "FDP": 11.5, "Linke": 2.5 }, gewinner2021: "CDU" },
    { id: 44, name: "Freudenstadt", erststimmen: { "Grüne": 24.7, "CDU": 27.3, "SPD": 10.8, "AfD": 13.2, "FDP": 11.2, "Linke": 2.4 }, gewinner2021: "CDU" },
    { id: 45, name: "Enzkreis", erststimmen: { "Grüne": 30.5, "CDU": 27.8, "SPD": 11.2, "AfD": 11.5, "FDP": 10.8, "Linke": 2.5 }, gewinner2021: "Grüne" },
    
    // Regierungsbezirk Freiburg
    { id: 46, name: "Freiburg I", erststimmen: { "Grüne": 40.2, "CDU": 19.4, "SPD": 11.2, "AfD": 5.1, "FDP": 7.5, "Linke": 6.8 }, gewinner2021: "Grüne" },
    { id: 47, name: "Freiburg II", erststimmen: { "Grüne": 38.5, "CDU": 20.8, "SPD": 12.5, "AfD": 6.2, "FDP": 8.2, "Linke": 5.5 }, gewinner2021: "Grüne" },
    { id: 48, name: "Breisgau", erststimmen: { "Grüne": 37.7, "CDU": 22.5, "SPD": 10.8, "AfD": 7.5, "FDP": 9.2, "Linke": 4.2 }, gewinner2021: "Grüne" },
    { id: 49, name: "Emmendingen", erststimmen: { "Grüne": 35.2, "CDU": 24.5, "SPD": 11.2, "AfD": 8.8, "FDP": 9.8, "Linke": 3.5 }, gewinner2021: "Grüne" },
    { id: 50, name: "Lahr", erststimmen: { "Grüne": 30.8, "CDU": 27.2, "SPD": 11.8, "AfD": 11.2, "FDP": 9.5, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 51, name: "Offenburg", erststimmen: { "Grüne": 32.5, "CDU": 26.8, "SPD": 11.5, "AfD": 10.2, "FDP": 9.8, "Linke": 3.0 }, gewinner2021: "Grüne" },
    { id: 52, name: "Kehl", erststimmen: { "Grüne": 31.4, "CDU": 27.5, "SPD": 11.2, "AfD": 11.5, "FDP": 9.5, "Linke": 2.5 }, gewinner2021: "Grüne" },
    { id: 53, name: "Rottweil", erststimmen: { "Grüne": 28.5, "CDU": 30.8, "SPD": 10.5, "AfD": 12.2, "FDP": 9.8, "Linke": 2.2 }, gewinner2021: "CDU" },
    { id: 54, name: "Villingen-Schwenningen", erststimmen: { "Grüne": 29.2, "CDU": 28.5, "SPD": 11.8, "AfD": 11.5, "FDP": 10.2, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 55, name: "Tuttlingen-Donaueschingen", erststimmen: { "Grüne": 27.8, "CDU": 29.5, "SPD": 11.2, "AfD": 12.5, "FDP": 10.5, "Linke": 2.4 }, gewinner2021: "CDU" },
    { id: 56, name: "Konstanz", erststimmen: { "Grüne": 36.8, "CDU": 22.5, "SPD": 12.2, "AfD": 7.8, "FDP": 9.5, "Linke": 4.5 }, gewinner2021: "Grüne" },
    { id: 57, name: "Singen", erststimmen: { "Grüne": 33.5, "CDU": 25.2, "SPD": 12.8, "AfD": 9.5, "FDP": 9.2, "Linke": 3.5 }, gewinner2021: "Grüne" },
    { id: 58, name: "Stockach", erststimmen: { "Grüne": 32.2, "CDU": 26.8, "SPD": 11.5, "AfD": 10.2, "FDP": 10.5, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 59, name: "Lörrach", erststimmen: { "Grüne": 35.8, "CDU": 23.2, "SPD": 12.5, "AfD": 8.5, "FDP": 9.8, "Linke": 4.0 }, gewinner2021: "Grüne" },
    { id: 60, name: "Waldshut", erststimmen: { "Grüne": 37.1, "CDU": 22.9, "SPD": 10.5, "AfD": 9.2, "FDP": 10.2, "Linke": 3.5 }, gewinner2021: "Grüne" },
    
    // Regierungsbezirk Tübingen
    { id: 61, name: "Reutlingen", erststimmen: { "Grüne": 33.2, "CDU": 25.5, "SPD": 12.2, "AfD": 9.5, "FDP": 10.5, "Linke": 3.2 }, gewinner2021: "Grüne" },
    { id: 62, name: "Hechingen-Münsingen", erststimmen: { "Grüne": 30.5, "CDU": 28.2, "SPD": 10.8, "AfD": 11.2, "FDP": 10.8, "Linke": 2.5 }, gewinner2021: "Grüne" },
    { id: 63, name: "Tübingen", erststimmen: { "Grüne": 42.5, "CDU": 18.2, "SPD": 11.5, "AfD": 6.2, "FDP": 8.5, "Linke": 6.2 }, gewinner2021: "Grüne" },
    { id: 64, name: "Balingen", erststimmen: { "Grüne": 28.2, "CDU": 29.8, "SPD": 10.5, "AfD": 12.5, "FDP": 10.5, "Linke": 2.3 }, gewinner2021: "CDU" },
    { id: 65, name: "Ulm", erststimmen: { "Grüne": 34.5, "CDU": 24.2, "SPD": 13.5, "AfD": 8.2, "FDP": 10.2, "Linke": 3.5 }, gewinner2021: "Grüne" },
    { id: 66, name: "Ehingen", erststimmen: { "Grüne": 29.8, "CDU": 30.5, "SPD": 11.2, "AfD": 11.5, "FDP": 9.5, "Linke": 2.2 }, gewinner2021: "CDU" },
    { id: 67, name: "Biberach", erststimmen: { "Grüne": 31.2, "CDU": 29.8, "SPD": 10.5, "AfD": 10.2, "FDP": 10.5, "Linke": 2.2 }, gewinner2021: "Grüne" },
    { id: 68, name: "Wangen", erststimmen: { "Grüne": 31.3, "CDU": 30.6, "SPD": 9.8, "AfD": 10.5, "FDP": 10.2, "Linke": 2.0 }, gewinner2021: "Grüne" },
    { id: 69, name: "Ravensburg", erststimmen: { "Grüne": 34.8, "CDU": 26.5, "SPD": 10.8, "AfD": 9.2, "FDP": 10.5, "Linke": 2.8 }, gewinner2021: "Grüne" },
    { id: 70, name: "Sigmaringen", erststimmen: { "Grüne": 32.6, "CDU": 27.8, "SPD": 6.2, "AfD": 11.2, "FDP": 12.1, "Linke": 2.4 }, gewinner2021: "Grüne" }
];

// Landesergebnis 2021 (Erststimmen in Prozent)
const LANDESERGEBNIS_2021 = {
    "Grüne": 32.6,
    "CDU": 24.1,
    "SPD": 11.0,
    "AfD": 9.7,
    "FDP": 10.5,
    "Linke": 3.6
};

// Direktmandate 2021: Grüne 58, CDU 12
const DIREKTMANDATE_2021 = {
    "Grüne": 58,
    "CDU": 12,
    "SPD": 0,
    "AfD": 0,
    "FDP": 0,
    "Linke": 0
};

// Hilfsfunktion: Finde Gewinner eines Wahlkreises
function findWahlkreisGewinner(erststimmen) {
    let maxParty = null;
    let maxValue = 0;
    for (const [party, value] of Object.entries(erststimmen)) {
        if (value > maxValue) {
            maxValue = value;
            maxParty = party;
        }
    }
    return maxParty;
}

// Exportiere für Verwendung in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WAHLKREISE_2021, LANDESERGEBNIS_2021, DIREKTMANDATE_2021, findWahlkreisGewinner };
}
