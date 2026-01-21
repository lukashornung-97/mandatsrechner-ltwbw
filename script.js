// Party configuration with colors
const PARTY_CONFIG = {
    'CDU': { color: 'party-cdu', name: 'CDU' },
    'Grüne': { color: 'party-gruene', name: 'Grüne' },
    'SPD': { color: 'party-spd', name: 'SPD' },
    'AfD': { color: 'party-afd', name: 'AfD' },
    'FDP': { color: 'party-fdp', name: 'FDP' },
    'Linke': { color: 'party-linke', name: 'Linke' }
};

const MIN_PARLIAMENT_SIZE = 120;
const DIRECT_MANDATES_TOTAL = 70;
const THRESHOLD_PERCENT = 5;

// ==========================================
// WAHLERGEBNISSE 2021 - ALLE 70 WAHLKREISE
// ==========================================

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

let parties = [];
let currentMode = 'manual'; // 'manual' oder 'auto'
let hasCalculated = false; // Wurde im Auto-Modus schon berechnet?

// Initialize default parties with current polling values
function initParties() {
    parties = [
        { name: 'CDU', percentage: 28, directMandates: 0 },
        { name: 'AfD', percentage: 24, directMandates: 0 },
        { name: 'Grüne', percentage: 20, directMandates: 0 },
        { name: 'SPD', percentage: 10, directMandates: 0 },
        { name: 'FDP', percentage: 5, directMandates: 0 },
        { name: 'Linke', percentage: 5, directMandates: 0 }
    ];
    renderPartyTable();
}

// Wechsle zwischen Manuell und Auto-Modus
function setMode(mode) {
    currentMode = mode;
    
    // Bei Moduswechsel: hasCalculated zurücksetzen
    if (mode === 'auto') {
        hasCalculated = false;
    }
    
    // Update Button-Styling
    document.getElementById('mode-manual').classList.toggle('active', mode === 'manual');
    document.getElementById('mode-auto').classList.toggle('active', mode === 'auto');
    
    // Update Info-Text
    const modeInfo = document.getElementById('mode-info');
    if (mode === 'manual') {
        modeInfo.innerHTML = '<strong>Landtag:</strong> Mindestgröße 120 Sitze | <strong>Direktmandate:</strong> 70 (manuelle Eingabe)';
    } else {
        modeInfo.innerHTML = '<strong>Landtag:</strong> Mindestgröße 120 Sitze | <strong>Direktmandate:</strong> 70 (automatisch aus Wahlergebnis 2021 hochgerechnet)';
    }
    
    // Prognose-Section nur im Auto-Modus anzeigen
    const prognoseSection = document.querySelector('.prognose-section');
    if (prognoseSection) {
        prognoseSection.style.display = mode === 'auto' ? 'block' : 'none';
    }
    
    // Swing-Methode Selector anzeigen/verstecken
    const swingSelector = document.getElementById('swing-method-container');
    if (swingSelector) {
        swingSelector.style.display = mode === 'auto' ? 'flex' : 'none';
    }
    
    // "Sitzverteilung berechnen" Button im Auto-Modus ausblenden
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.style.display = mode === 'auto' ? 'none' : 'inline-block';
    }
    
    // Tabelle neu rendern
    renderPartyTable();
}

// Render the input table
function renderPartyTable() {
    const tbody = document.getElementById('party-tbody');
    tbody.innerHTML = '';
    
    // Update Tabellen-Header je nach Modus
    const headerRow = document.querySelector('#party-table thead tr');
    if (headerRow) {
        const headers = headerRow.querySelectorAll('th');
        if (headers.length >= 3) {
            headers[1].textContent = currentMode === 'auto' ? 'Umfragewert (%)' : 'Zweitstimmen (%)';
            headers[2].textContent = currentMode === 'auto' ? 'Direktmandate (berechnet)' : 'Direktmandate';
        }
    }
    
    parties.forEach((party, index) => {
        const row = document.createElement('tr');
        
        // Direktmandate-Zelle je nach Modus
        let direktmandateCell;
        if (currentMode === 'manual') {
            direktmandateCell = `
                <td>
                    <input type="number" 
                           step="1" 
                           min="0" 
                           max="70"
                           value="${party.directMandates}" 
                           data-index="${index}" 
                           data-field="directMandates"
                           placeholder="0"
                           oninput="validateDirectMandateInput(this)">
                </td>
            `;
        } else {
            // Im Auto-Modus: Zeige Platzhalter bis berechnet wurde
            const displayValue = hasCalculated ? party.directMandates : '–';
            const cellClass = hasCalculated ? 'direktmandate-value' : 'direktmandate-placeholder';
            direktmandateCell = `
                <td class="direktmandate-cell">
                    <span class="${cellClass}" id="direktmandate-${index}">${displayValue}</span>
                </td>
            `;
        }
        
        row.innerHTML = `
            <td class="party-name">${party.name}</td>
            <td>
                <input type="number" 
                       step="0.1" 
                       min="0" 
                       max="100" 
                       value="${party.percentage}" 
                       data-index="${index}" 
                       data-field="percentage"
                       placeholder="0.0"
                       oninput="validatePercentageInput(this)">
            </td>
            ${direktmandateCell}
            <td>
                <button class="btn-secondary" onclick="removeParty(${index})" style="padding: 6px 12px; font-size: 0.9em;">Entfernen</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners
    document.querySelectorAll('#party-table input').forEach(input => {
        input.addEventListener('input', handleInputChange);
    });
}

// Handle input changes
function handleInputChange(e) {
    const index = parseInt(e.target.dataset.index);
    const field = e.target.dataset.field;
    const value = parseFloat(e.target.value) || 0;
    
    if (field === 'percentage') {
        // Limit to 100% maximum
        parties[index].percentage = Math.min(100, Math.max(0, value));
    } else if (field === 'directMandates') {
        // Limit to 70 maximum
        parties[index].directMandates = Math.min(70, Math.max(0, Math.floor(value)));
    }
}

// Validate percentage input in real-time
function validatePercentageInput(input) {
    const index = parseInt(input.dataset.index);
    let value = parseFloat(input.value) || 0;
    
    // Get current total of all other parties
    const currentTotal = parties.reduce((sum, p, i) => {
        if (i === index) return sum;
        return sum + (p.percentage || 0);
    }, 0);
    
    // Calculate maximum allowed for this party
    const maxAllowed = 100 - currentTotal;
    
    // Limit the input value
    if (value > maxAllowed) {
        value = maxAllowed;
        input.value = value.toFixed(1);
    }
    
    // Also limit to absolute max of 100
    if (value > 100) {
        value = 100;
        input.value = value.toFixed(1);
    }
    
    parties[index].percentage = Math.max(0, value);
    updateValidationMessage();
    
    // Im Auto-Modus: Berechnung zurücksetzen wenn Werte geändert werden
    if (currentMode === 'auto' && hasCalculated) {
        hasCalculated = false;
        renderPartyTable();
    }
}

// Validate direct mandate input in real-time (nur im manuellen Modus)
function validateDirectMandateInput(input) {
    if (currentMode !== 'manual') return;
    
    const index = parseInt(input.dataset.index);
    let value = parseInt(input.value) || 0;
    
    // Get current total of all other parties
    const currentTotal = parties.reduce((sum, p, i) => {
        if (i === index) return sum;
        return sum + (p.directMandates || 0);
    }, 0);
    
    // Calculate maximum allowed for this party
    const maxAllowed = DIRECT_MANDATES_TOTAL - currentTotal;
    
    // Limit the input value
    if (value > maxAllowed) {
        value = maxAllowed;
        input.value = value;
    }
    
    // Also limit to absolute max of 70
    if (value > 70) {
        value = 70;
        input.value = value;
    }
    
    parties[index].directMandates = Math.max(0, value);
    updateValidationMessage();
}

// Update validation message in real-time
function updateValidationMessage() {
    const totalPercentage = parties.reduce((sum, p) => sum + (p.percentage || 0), 0);
    const totalDirectMandates = parties.reduce((sum, p) => sum + (p.directMandates || 0), 0);
    
    const messageEl = document.getElementById('validation-message');
    
    // Reset classes and content
    messageEl.className = 'validation-message';
    messageEl.textContent = '';
    
    if (totalPercentage > 100) {
        messageEl.textContent = `Warnung: Die Summe der Prozente (${totalPercentage.toFixed(1)}%) überschreitet 100%.`;
        messageEl.classList.add('error');
    } else if (totalDirectMandates > DIRECT_MANDATES_TOTAL) {
        messageEl.textContent = `Warnung: Die Summe der Direktmandate (${totalDirectMandates}) überschreitet ${DIRECT_MANDATES_TOTAL}.`;
        messageEl.classList.add('error');
    } else if (totalPercentage === 100 && totalDirectMandates === DIRECT_MANDATES_TOTAL) {
        messageEl.textContent = '✓ Eingaben sind korrekt.';
        messageEl.classList.add('success');
    }
    // If no condition matches, message stays empty and hidden
}

// Add new party
function addParty() {
    const name = prompt('Parteiname eingeben:');
    if (name && name.trim()) {
        parties.push({
            name: name.trim(),
            percentage: 0,
            directMandates: 0
        });
        renderPartyTable();
    }
}

// Remove party
function removeParty(index) {
    if (parties.length > 1) {
        parties.splice(index, 1);
        renderPartyTable();
    } else {
        alert('Mindestens eine Partei muss vorhanden sein.');
    }
}

// Validate input
function validateInput() {
    const totalPercentage = parties.reduce((sum, p) => sum + (p.percentage || 0), 0);
    const totalDirectMandates = parties.reduce((sum, p) => sum + (p.directMandates || 0), 0);
    
    const messageEl = document.getElementById('validation-message');
    messageEl.className = 'validation-message';
    
    if (totalPercentage > 100) {
        messageEl.textContent = `Fehler: Die Summe der Prozente (${totalPercentage.toFixed(1)}%) überschreitet 100%.`;
        messageEl.classList.add('error');
        return false;
    }
    
    if (totalDirectMandates > DIRECT_MANDATES_TOTAL) {
        messageEl.textContent = `Fehler: Die Summe der Direktmandate (${totalDirectMandates}) überschreitet das Maximum von ${DIRECT_MANDATES_TOTAL}.`;
        messageEl.classList.add('error');
        return false;
    }
    
    if (totalDirectMandates < DIRECT_MANDATES_TOTAL) {
        messageEl.textContent = `Warnung: Die Summe der Direktmandate (${totalDirectMandates}) ist kleiner als ${DIRECT_MANDATES_TOTAL}. Die Berechnung kann trotzdem durchgeführt werden.`;
        messageEl.classList.add('error');
        // Allow calculation to proceed with warning
    }
    
    const partiesAboveThreshold = parties.filter(p => p.percentage >= THRESHOLD_PERCENT);
    if (partiesAboveThreshold.length === 0) {
        messageEl.textContent = `Fehler: Mindestens eine Partei muss über ${THRESHOLD_PERCENT}% liegen.`;
        messageEl.classList.add('error');
        return false;
    }
    
    messageEl.textContent = '';
    return true;
}

// Sainte-Laguë/Schepers algorithm
function sainteLagueDistribution(votes, totalSeats) {
    const parties = votes.map((v, i) => ({ votes: v, index: i, seats: 0 }));
    const quotients = [];
    
    // Generate quotients for all parties
    for (let i = 0; i < parties.length; i++) {
        for (let d = 0.5; d <= totalSeats + 0.5; d += 1) {
            quotients.push({
                value: parties[i].votes / d,
                partyIndex: i
            });
        }
    }
    
    // Sort quotients descending
    quotients.sort((a, b) => b.value - a.value);
    
    // Assign seats to top quotients
    for (let i = 0; i < totalSeats; i++) {
        parties[quotients[i].partyIndex].seats++;
    }
    
    return parties.map(p => p.seats);
}

// Calculate seat distribution
function calculateSeats() {
    if (!validateInput()) {
        return;
    }
    
    // Filter parties above threshold
    const eligibleParties = parties.filter(p => p.percentage >= THRESHOLD_PERCENT);
    
    if (eligibleParties.length === 0) {
        return;
    }
    
    // Get votes as percentages
    const votes = eligibleParties.map(p => p.percentage);
    
    // Step 1: Initial distribution using Sainte-Laguë
    let initialListSeats = sainteLagueDistribution(votes, MIN_PARLIAMENT_SIZE);
    let listSeats = [...initialListSeats]; // Copy for later modification
    
    // Step 2: Check for overhang mandates
    let overhangMandates = [];
    let hasOverhang = false;
    
    eligibleParties.forEach((party, index) => {
        const listSeatsForParty = initialListSeats[index];
        const directMandates = party.directMandates || 0;
        
        if (directMandates > listSeatsForParty) {
            overhangMandates[index] = directMandates - listSeatsForParty;
            hasOverhang = true;
        } else {
            overhangMandates[index] = 0;
        }
    });
    
    // Step 3: Calculate compensation mandates if needed
    let totalSeats = MIN_PARLIAMENT_SIZE;
    let compensationSeats = new Array(eligibleParties.length).fill(0);
    const totalVotes = votes.reduce((sum, v) => sum + v, 0);
    
    if (hasOverhang) {
        // Find the required parliament size
        // For each party with overhang, calculate minimum parliament size needed
        let requiredParliamentSize = MIN_PARLIAMENT_SIZE;
        
        eligibleParties.forEach((party, index) => {
            const direct = party.directMandates || 0;
            const voteShare = votes[index] / totalVotes;
            
            if (direct > 0 && voteShare > 0) {
                // Minimum size so direct mandates don't exceed proportional share
                const minSizeForParty = Math.ceil(direct / voteShare);
                if (minSizeForParty > requiredParliamentSize) {
                    requiredParliamentSize = minSizeForParty;
                }
            }
        });
        
        // Verify with Sainte-Laguë and increase if necessary
        let parliamentSize = requiredParliamentSize;
        let maxIterations = 100;
        let iteration = 0;
        
        while (iteration < maxIterations) {
            const currentListSeats = sainteLagueDistribution(votes, parliamentSize);
            
            let allSatisfied = true;
            eligibleParties.forEach((party, index) => {
                const direct = party.directMandates || 0;
                if (currentListSeats[index] < direct) {
                    allSatisfied = false;
                }
            });
            
            if (allSatisfied) {
                break;
            }
            
            parliamentSize++;
            iteration++;
        }
        
        totalSeats = parliamentSize;
    }
    
    // Calculate final distribution at the (possibly enlarged) parliament size
    const finalDistribution = sainteLagueDistribution(votes, totalSeats);
    
    // Calculate seats for each party
    eligibleParties.forEach((party, index) => {
        const direct = party.directMandates || 0;
        const proportionalSeats = finalDistribution[index];
        const originalListSeats = initialListSeats[index];
        
        // Überhangmandate: Mehr Direktmandate als theoretisch Listensitze zustehen
        // Berechnet bei der ursprünglichen Verteilung (120 Sitze)
        // = Direktmandate - ursprüngliche Listensitze
        if (direct > originalListSeats) {
            overhangMandates[index] = direct - originalListSeats;
        } else {
            overhangMandates[index] = 0;
        }
        
        // Final seats: Party gets at least their direct mandates, otherwise proportional seats
        const finalTotal = Math.max(proportionalSeats, direct);
        
        // Ausgleichsmandate: Zusätzliche Sitze durch Vergrößerung des Landtags
        // = finale Gesamtsitze - ursprüngliche Listensitze
        // Nur für Parteien OHNE Überhangmandate
        if (overhangMandates[index] === 0) {
            compensationSeats[index] = Math.max(0, finalTotal - originalListSeats);
        } else {
            // Parteien mit Überhang bekommen keine Ausgleichsmandate
            compensationSeats[index] = 0;
        }
        
        // Speichere ursprüngliche Listensitze (wird nicht mehr in Tabelle angezeigt)
        listSeats[index] = originalListSeats;
    });
    
    // Calculate final seat totals
    const finalSeats = eligibleParties.map((party, index) => {
        const proportionalSeats = finalDistribution[index];
        const direct = party.directMandates || 0;
        // Party gets the maximum of proportional seats or direct mandates
        return Math.max(proportionalSeats, direct);
    });
    
    // Display results
    displayResults(eligibleParties, listSeats, overhangMandates, compensationSeats, finalSeats);
}

// Display calculation results
function displayResults(eligibleParties, listSeats, overhangMandates, compensationSeats, finalSeats) {
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.remove('hidden');
    
    // Calculate totals
    const totalOverhang = overhangMandates.reduce((sum, val) => sum + val, 0);
    const totalCompensation = compensationSeats.reduce((sum, val) => sum + val, 0);
    const totalFinalSeats = finalSeats.reduce((sum, val) => sum + val, 0);
    
    // Update summary
    document.getElementById('total-seats').textContent = totalFinalSeats;
    document.getElementById('overhang-seats').textContent = totalOverhang;
    document.getElementById('compensation-seats').textContent = totalCompensation;
    
    // Render results table
    const tbody = document.getElementById('results-tbody');
    tbody.innerHTML = '';
    
    eligibleParties.forEach((party, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="party-name">${party.name}</td>
            <td>${party.percentage.toFixed(1)}%</td>
            <td>${party.directMandates || 0}</td>
            <td><strong>${finalSeats[index]}</strong></td>
            <td>${overhangMandates[index] || 0}</td>
            <td>${compensationSeats[index] || 0}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Setup coalition calculator
    setupCoalitionCalculator(eligibleParties, finalSeats, totalFinalSeats);
}

// Party order for parliament visualization (left to right: AfD, FDP, CDU, Grüne, SPD, Linke)
const PARTY_ORDER = ['AfD', 'FDP', 'CDU', 'Grüne', 'SPD', 'Linke'];

// Get party color from CSS
function getPartyColor(partyName) {
    const config = PARTY_CONFIG[partyName];
    if (!config) return '#888888';
    
    // Map CSS class to actual color
    const colorMap = {
        'party-cdu': '#000000',
        'party-gruene': '#64a12d',
        'party-spd': '#e3000f',
        'party-afd': '#009ee0',
        'party-fdp': '#ffed00',
        'party-linke': '#be3075',
        'party-other': '#888888'
    };
    return colorMap[config.color] || '#888888';
}

// Render parliament visualization as horseshoe with grid layout
function renderParliamentVisualization(eligibleParties, finalSeats) {
    const container = document.getElementById('parliament-visualization');
    container.innerHTML = '<h3>Parlamentsvisualisierung</h3>';
    
    // Create canvas with responsive sizing
    const canvas = document.createElement('canvas');
    canvas.id = 'parliament-canvas';
    canvas.width = 900;
    canvas.height = 600;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Prepare party data sorted by position (left to right: AfD, FDP, CDU, Grüne, SPD, Linke)
    const partyData = eligibleParties
        .map((party, index) => ({
            name: party.name,
            seats: finalSeats[index],
            index: index
        }))
        .filter(p => p.seats > 0)
        .sort((a, b) => {
            const aPos = PARTY_ORDER.indexOf(a.name);
            const bPos = PARTY_ORDER.indexOf(b.name);
            const aPosFinal = aPos === -1 ? 999 : aPos;
            const bPosFinal = bPos === -1 ? 999 : bPos;
            return aPosFinal - bPosFinal;
        });
    
    const totalSeats = partyData.reduce((sum, p) => sum + p.seats, 0);
    if (totalSeats === 0) return;
    
    // Canvas dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height - 80;
    const innerRadius = 120;
    const outerRadius = 350;
    const startAngle = Math.PI; // 180 degrees (left)
    const endAngle = 0; // 0 degrees (right)
    
    // Grid parameters
    const numRows = 10; // Number of concentric arcs
    const angleRange = Math.PI; // 180 degrees
    const seatSize = 14; // Size of each seat square
    
    // Calculate seats per row (more seats in outer rows)
    const seatsPerRow = [];
    for (let row = 0; row < numRows; row++) {
        const rowRadius = innerRadius + (outerRadius - innerRadius) * (row / (numRows - 1));
        const circumference = Math.PI * rowRadius;
        const seatsInRow = Math.floor(circumference / (seatSize + 2));
        seatsPerRow.push(Math.max(1, seatsInRow));
    }
    
    // Draw grid structure (light gray lines)
    ctx.strokeStyle = '#e8e8e8';
    ctx.lineWidth = 0.5;
    
    // Draw radial lines (from center to outer edge)
    const numRadialLines = 25;
    for (let i = 0; i <= numRadialLines; i++) {
        const angle = startAngle - (angleRange * i / numRadialLines);
        const x1 = centerX + innerRadius * Math.cos(angle);
        const y1 = centerY + innerRadius * Math.sin(angle);
        const x2 = centerX + outerRadius * Math.cos(angle);
        const y2 = centerY + outerRadius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    // Draw concentric arcs
    for (let row = 0; row < numRows; row++) {
        const radius = innerRadius + (outerRadius - innerRadius) * (row / (numRows - 1));
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();
    }
    
    // Distribute seats across the grid, filling by party segments
    // Calculate total seats and party segments
    let totalSeatsUsed = 0;
    const partySegments = partyData.map(party => {
        const start = totalSeatsUsed;
        totalSeatsUsed += party.seats;
        return {
            party: party,
            startSeat: start,
            endSeat: totalSeatsUsed,
            color: getPartyColor(party.name)
        };
    });
    
    // Calculate total available seats in grid
    const totalAvailableSeats = seatsPerRow.reduce((sum, s) => sum + s, 0);
    
    // Draw seats filling the grid from left to right, top to bottom
    let globalSeatIndex = 0;
    
    for (let row = 0; row < numRows; row++) {
        const seatsInRow = seatsPerRow[row];
        const rowRadius = innerRadius + (outerRadius - innerRadius) * (row / (numRows - 1));
        const angleStep = angleRange / seatsInRow;
        
        for (let col = 0; col < seatsInRow && globalSeatIndex < totalSeats; col++) {
            // Find which party this seat belongs to
            const partySegment = partySegments.find(seg => 
                globalSeatIndex >= seg.startSeat && globalSeatIndex < seg.endSeat
            );
            
            if (partySegment) {
                const angle = startAngle - (col * angleStep) - (angleStep / 2);
                const x = centerX + rowRadius * Math.cos(angle);
                const y = centerY + rowRadius * Math.sin(angle);
                
                // Draw seat as filled rectangle (like in the image)
                ctx.fillStyle = partySegment.color;
                ctx.fillRect(x - seatSize/2, y - seatSize/2, seatSize, seatSize);
                
                // Draw border
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.strokeRect(x - seatSize/2, y - seatSize/2, seatSize, seatSize);
            }
            
            globalSeatIndex++;
        }
    }
    
    // Draw center text with total seats
    ctx.fillStyle = '#333';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${totalSeats} Sitze`, centerX, centerY - 50);
    
    // Create legend on the right side
    const legend = document.createElement('div');
    legend.id = 'parliament-legend';
    legend.className = 'parliament-legend';
    
    partyData.forEach(party => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        const partyConfig = PARTY_CONFIG[party.name] || { color: 'party-other', name: party.name };
        legendItem.innerHTML = `
            <span class="legend-color ${partyConfig.color}"></span>
            <span class="legend-text">${party.name}: ${party.seats} Sitze</span>
        `;
        legend.appendChild(legendItem);
    });
    
    container.appendChild(legend);
}

// Setup coalition calculator with checkboxes
function setupCoalitionCalculator(eligibleParties, finalSeats, totalSeats) {
    const checkboxesContainer = document.getElementById('coalition-checkboxes');
    const resultsContainer = document.getElementById('coalition-results');
    
    checkboxesContainer.innerHTML = '';
    resultsContainer.innerHTML = '';
    
    // Create checkboxes for each party
    const partyData = eligibleParties.map((party, index) => ({
        name: party.name,
        seats: finalSeats[index]
    })).filter(p => p.seats > 0);
    
    partyData.forEach((party, index) => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'coalition-checkbox-wrapper';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `coalition-party-${index}`;
        checkbox.value = index;
        checkbox.className = 'coalition-checkbox';
        
        const label = document.createElement('label');
        label.htmlFor = `coalition-party-${index}`;
        label.className = 'coalition-label';
        
        const partyConfig = PARTY_CONFIG[party.name] || { color: 'party-other', name: party.name };
        label.innerHTML = `
            <span class="legend-color ${partyConfig.color}"></span>
            <span>${party.name} (${party.seats} Sitze)</span>
        `;
        
        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);
        checkboxesContainer.appendChild(checkboxWrapper);
    });
    
    // Add event listener to calculate button
    const calculateBtn = document.getElementById('calculate-coalition-btn');
    calculateBtn.onclick = () => {
        calculateSelectedCoalition(partyData, totalSeats);
    };
}

// Calculate selected coalition
function calculateSelectedCoalition(partyData, totalSeats) {
    const resultsContainer = document.getElementById('coalition-results');
    resultsContainer.innerHTML = '';
    
    const checkboxes = document.querySelectorAll('.coalition-checkbox');
    const selectedParties = [];
    let totalCoalitionSeats = 0;
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedParties.push(partyData[index]);
            totalCoalitionSeats += partyData[index].seats;
        }
    });
    
    if (selectedParties.length === 0) {
        resultsContainer.innerHTML = '<p class="coalition-message">Bitte wählen Sie mindestens eine Partei aus.</p>';
        return;
    }
    
    const majorityThreshold = Math.floor(totalSeats / 2) + 1;
    const hasMajority = totalCoalitionSeats >= majorityThreshold;
    
    // Create result card
    const card = document.createElement('div');
    card.className = `coalition-card ${hasMajority ? 'majority' : 'minority'}`;
    
    const partyNames = selectedParties.map(p => p.name).join(' + ');
    const partyDetails = selectedParties.map(p => `${p.name} (${p.seats})`).join('<br>');
    
    card.innerHTML = `
        <div class="coalition-title">${partyNames}</div>
        <div class="coalition-parties">${selectedParties.length} ${selectedParties.length === 1 ? 'Partei' : 'Parteien'}</div>
        <div class="coalition-details">${partyDetails}</div>
        <div class="coalition-seats">${totalCoalitionSeats} Sitze</div>
        <div class="coalition-status">${hasMajority ? '✓ Mehrheitsfähig' : '✗ Keine Mehrheit'} (Mehrheit: ${majorityThreshold} Sitze)</div>
    `;
    
    resultsContainer.appendChild(card);
}

// ==========================================
// WAHLKREIS-PROGNOSE FUNKTIONEN
// ==========================================

let prognoseResults = null;

// Berechnung der Direktmandate basierend auf Wahlkreis-Ergebnissen
function autoCalculateDirektmandate() {
    if (currentMode !== 'auto') return;
    
    // Hole die aktuell gewählte Methode
    const methodSelect = document.getElementById('swing-method');
    if (!methodSelect) return;
    
    const method = document.getElementById('swing-method')?.value || 'uniform';
    
    // Hole aktuelle Umfragewerte
    const umfrageWerte = {};
    parties.forEach(party => {
        umfrageWerte[party.name] = party.percentage || 0;
    });
    
    // Initialisiere Mandatezähler
    const mandateCount = {};
    parties.forEach(party => {
        mandateCount[party.name] = 0;
    });
    
    // Berechne für jeden Wahlkreis den Gewinner
    WAHLKREISE_2021.forEach(wahlkreis => {
        let gewinner = null;
        let maxWert = 0;
        
        Object.keys(wahlkreis.erststimmen).forEach(party => {
            const ergebnis2021 = wahlkreis.erststimmen[party];
            const umfrage = umfrageWerte[party] || 0;
            const landesergebnis = LANDESERGEBNIS_2021[party] || 0;
            
            let prognose;
            if (method === 'uniform') {
                prognose = Math.max(0, ergebnis2021 + (umfrage - landesergebnis));
            } else {
                prognose = landesergebnis > 0 ? Math.max(0, ergebnis2021 * (umfrage / landesergebnis)) : ergebnis2021;
            }
            
            if (prognose > maxWert) {
                maxWert = prognose;
                gewinner = party;
            }
        });
        
        if (gewinner && mandateCount.hasOwnProperty(gewinner)) {
            mandateCount[gewinner]++;
        }
    });
    
    // Update parties array und Anzeige
    parties.forEach((party, index) => {
        party.directMandates = mandateCount[party.name] || 0;
        const cell = document.getElementById(`direktmandate-${index}`);
        if (cell) {
            cell.textContent = party.directMandates;
            cell.className = 'direktmandate-value';
        }
    });
    
    hasCalculated = true;
    updateValidationMessage();
    
    // Im Auto-Modus auch direkt die Sitzverteilung berechnen
    calculateSeats();
}

// Uniform Swing: Prognose = Ergebnis2021 + (Umfrage - Landesergebnis2021)
function calculateUniformSwing(wahlkreisErgebnis, umfrageWert, landesergebnis2021) {
    const swing = umfrageWert - landesergebnis2021;
    return Math.max(0, wahlkreisErgebnis + swing);
}

// Proportionaler Swing: Prognose = Ergebnis2021 * (Umfrage / Landesergebnis2021)
function calculateProportionalSwing(wahlkreisErgebnis, umfrageWert, landesergebnis2021) {
    if (landesergebnis2021 === 0) return wahlkreisErgebnis;
    const factor = umfrageWert / landesergebnis2021;
    return Math.max(0, wahlkreisErgebnis * factor);
}

// Berechne Prognose für alle Wahlkreise
function calculateWahlkreisPrognose() {
    const method = document.getElementById('swing-method').value;
    
    // Hole aktuelle Umfragewerte aus der Eingabe
    const umfrageWerte = {};
    parties.forEach(party => {
        umfrageWerte[party.name] = party.percentage || 0;
    });
    
    const results = [];
    const mandateCount = {};
    let changedWahlkreise = 0;
    
    // Initialisiere Mandatezähler
    Object.keys(PARTY_CONFIG).forEach(party => {
        mandateCount[party] = 0;
    });
    
    // Berechne für jeden Wahlkreis
    WAHLKREISE_2021.forEach(wahlkreis => {
        const prognoseErgebnisse = {};
        
        // Berechne Prognose für jede Partei
        Object.keys(wahlkreis.erststimmen).forEach(party => {
            const ergebnis2021 = wahlkreis.erststimmen[party];
            const umfrage = umfrageWerte[party] || 0;
            const landesergebnis = LANDESERGEBNIS_2021[party] || 0;
            
            if (method === 'uniform') {
                prognoseErgebnisse[party] = calculateUniformSwing(ergebnis2021, umfrage, landesergebnis);
            } else {
                prognoseErgebnisse[party] = calculateProportionalSwing(ergebnis2021, umfrage, landesergebnis);
            }
        });
        
        // Finde Gewinner
        let gewinner = null;
        let maxWert = 0;
        let zweitbester = 0;
        
        Object.entries(prognoseErgebnisse).forEach(([party, wert]) => {
            if (wert > maxWert) {
                zweitbester = maxWert;
                maxWert = wert;
                gewinner = party;
            } else if (wert > zweitbester) {
                zweitbester = wert;
            }
        });
        
        const vorsprung = maxWert - zweitbester;
        const hasChanged = gewinner !== wahlkreis.gewinner2021;
        
        if (hasChanged) changedWahlkreise++;
        
        // Zähle Mandate
        if (gewinner && mandateCount.hasOwnProperty(gewinner)) {
            mandateCount[gewinner]++;
        }
        
        results.push({
            id: wahlkreis.id,
            name: wahlkreis.name,
            gewinner2021: wahlkreis.gewinner2021,
            gewinnerPrognose: gewinner,
            vorsprung: vorsprung,
            hasChanged: hasChanged,
            prognoseErgebnisse: prognoseErgebnisse
        });
    });
    
    prognoseResults = {
        wahlkreise: results,
        mandateCount: mandateCount,
        changedWahlkreise: changedWahlkreise
    };
    
    displayPrognoseResults();
}

// Zeige Prognose-Ergebnisse an
function displayPrognoseResults() {
    if (!prognoseResults) return;
    
    const summarySection = document.getElementById('prognose-summary');
    const mandateOverview = document.getElementById('prognose-mandate-overview');
    const changesText = document.getElementById('prognose-changes-text');
    const wahlkreisDetails = document.getElementById('wahlkreis-details');
    const wahlkreisList = document.getElementById('wahlkreis-list');
    
    summarySection.classList.remove('hidden');
    wahlkreisDetails.classList.remove('hidden');
    
    // Mandate-Übersicht
    mandateOverview.innerHTML = '';
    
    // Sortiere Parteien nach Mandatezahl
    const sortedParties = Object.entries(prognoseResults.mandateCount)
        .filter(([party, count]) => count > 0 || DIREKTMANDATE_2021[party] > 0)
        .sort((a, b) => b[1] - a[1]);
    
    sortedParties.forEach(([party, count]) => {
        const diff = count - (DIREKTMANDATE_2021[party] || 0);
        const partyConfig = PARTY_CONFIG[party] || { color: 'party-other' };
        
        let changeClass = 'neutral';
        let changeText = '±0';
        if (diff > 0) {
            changeClass = 'positive';
            changeText = `+${diff}`;
        } else if (diff < 0) {
            changeClass = 'negative';
            changeText = `${diff}`;
        }
        
        const card = document.createElement('div');
        card.className = `mandate-card ${partyConfig.color}`;
        card.innerHTML = `
            <div class="party-name">${party}</div>
            <div class="mandate-count">${count}</div>
            <div class="mandate-change ${changeClass}">${changeText} zu 2021</div>
        `;
        mandateOverview.appendChild(card);
    });
    
    // Änderungen-Text
    if (prognoseResults.changedWahlkreise > 0) {
        changesText.textContent = `${prognoseResults.changedWahlkreise} Wahlkreis${prognoseResults.changedWahlkreise > 1 ? 'e' : ''} mit verändertem Gewinner gegenüber 2021`;
    } else {
        changesText.textContent = 'Keine Veränderungen gegenüber 2021';
    }
    
    // Wahlkreis-Liste
    wahlkreisList.innerHTML = '';
    
    prognoseResults.wahlkreise.forEach(wk => {
        const partyConfig = PARTY_CONFIG[wk.gewinnerPrognose] || { color: 'party-other' };
        
        const item = document.createElement('div');
        item.className = `wahlkreis-item ${wk.hasChanged ? 'changed' : ''}`;
        item.onclick = () => openWahlkreisModal(wk.id);
        
        let changeHtml = '';
        if (wk.hasChanged) {
            changeHtml = `<span class="wahlkreis-change">Wechsel von ${wk.gewinner2021}</span>`;
        }
        
        item.innerHTML = `
            <div class="wahlkreis-info">
                <span class="wahlkreis-name">${wk.name}</span>
                <span class="wahlkreis-id">WK ${wk.id}</span>
            </div>
            <div class="wahlkreis-result">
                <span class="wahlkreis-winner ${partyConfig.color}">${wk.gewinnerPrognose}</span>
                <span class="wahlkreis-margin">+${wk.vorsprung.toFixed(1)}%</span>
                ${changeHtml}
            </div>
        `;
        wahlkreisList.appendChild(item);
    });
}

// Toggle Wahlkreis-Details
function toggleWahlkreisDetails() {
    const list = document.getElementById('wahlkreis-list');
    const btn = document.getElementById('toggle-wahlkreise-btn');
    
    if (list.classList.contains('hidden')) {
        list.classList.remove('hidden');
        btn.textContent = 'Details verbergen ▲';
    } else {
        list.classList.add('hidden');
        btn.textContent = 'Details anzeigen ▼';
    }
}

// Öffne Wahlkreis-Detail Modal
function openWahlkreisModal(wahlkreisId) {
    const wahlkreis = WAHLKREISE_2021.find(wk => wk.id === wahlkreisId);
    if (!wahlkreis) return;
    
    const prognoseData = prognoseResults?.wahlkreise.find(wk => wk.id === wahlkreisId);
    
    const modal = document.getElementById('wahlkreis-modal');
    const nameEl = document.getElementById('modal-wahlkreis-name');
    const ergebnis2021El = document.getElementById('modal-ergebnis-2021');
    const ergebnis2026El = document.getElementById('modal-ergebnis-2026');
    const gewinner2021El = document.getElementById('modal-gewinner-2021');
    const gewinner2026El = document.getElementById('modal-gewinner-2026');
    
    // Setze Wahlkreis-Name
    nameEl.textContent = `${wahlkreis.name} (WK ${wahlkreis.id})`;
    
    // Sortiere Parteien nach Ergebnis 2021
    const parteien2021 = Object.entries(wahlkreis.erststimmen)
        .sort((a, b) => b[1] - a[1]);
    
    // Erstelle 2021 Balken
    ergebnis2021El.innerHTML = parteien2021.map(([party, value]) => {
        const partyConfig = PARTY_CONFIG[party] || { color: 'party-other' };
        return `
            <div class="ergebnis-row">
                <span class="ergebnis-party">${party}</span>
                <div class="ergebnis-bar-container">
                    <div class="ergebnis-bar ${partyConfig.color}" style="width: ${value}%"></div>
                </div>
                <span class="ergebnis-value">${value.toFixed(1)}%</span>
            </div>
        `;
    }).join('');
    
    // Setze Gewinner 2021
    const partyConfig2021 = PARTY_CONFIG[wahlkreis.gewinner2021] || { color: 'party-other' };
    gewinner2021El.className = partyConfig2021.color;
    gewinner2021El.textContent = wahlkreis.gewinner2021;
    
    // Erstelle 2026 Prognose Balken
    if (prognoseData && prognoseData.prognoseErgebnisse) {
        const parteien2026 = Object.entries(prognoseData.prognoseErgebnisse)
            .sort((a, b) => b[1] - a[1]);
        
        ergebnis2026El.innerHTML = parteien2026.map(([party, value]) => {
            const partyConfig = PARTY_CONFIG[party] || { color: 'party-other' };
            return `
                <div class="ergebnis-row">
                    <span class="ergebnis-party">${party}</span>
                    <div class="ergebnis-bar-container">
                        <div class="ergebnis-bar ${partyConfig.color}" style="width: ${Math.min(value, 100)}%"></div>
                    </div>
                    <span class="ergebnis-value">${value.toFixed(1)}%</span>
                </div>
            `;
        }).join('');
        
        // Setze Gewinner 2026
        const partyConfig2026 = PARTY_CONFIG[prognoseData.gewinnerPrognose] || { color: 'party-other' };
        gewinner2026El.className = partyConfig2026.color;
        gewinner2026El.textContent = prognoseData.gewinnerPrognose;
    } else {
        ergebnis2026El.innerHTML = '<p style="text-align: center; color: #666;">Bitte zuerst "Berechnen" klicken</p>';
        gewinner2026El.className = '';
        gewinner2026El.textContent = '–';
    }
    
    // Zeige Modal
    modal.classList.remove('hidden');
}

// Schließe Modal
function closeWahlkreisModal() {
    const modal = document.getElementById('wahlkreis-modal');
    modal.classList.add('hidden');
}

// Schließe Modal bei Klick außerhalb
document.addEventListener('click', (e) => {
    const modal = document.getElementById('wahlkreis-modal');
    if (e.target === modal) {
        closeWahlkreisModal();
    }
});

// Schließe Modal bei Escape-Taste
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWahlkreisModal();
    }
});

// Update Methoden-Beschreibung
function updateMethodDescription() {
    const method = document.getElementById('swing-method').value;
    const description = document.getElementById('method-description');
    
    if (description) {
        if (method === 'uniform') {
            description.innerHTML = `
                <p><strong>Uniform Swing:</strong> Die landesweite Veränderung wird gleichmäßig auf alle Wahlkreise angewendet.<br>
                <em>Prognose = Ergebnis 2021 + (Umfrage - Landesergebnis 2021)</em></p>
            `;
        } else {
            description.innerHTML = `
                <p><strong>Proportionaler Swing:</strong> Die Veränderung wird verhältnismäßig zum bisherigen Ergebnis angewendet.<br>
                <em>Prognose = Ergebnis 2021 × (Umfrage / Landesergebnis 2021)</em></p>
            `;
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initParties();
    
    document.getElementById('add-party-btn').addEventListener('click', addParty);
    document.getElementById('calculate-btn').addEventListener('click', calculateSeats);
    
    // Prognose Event Listeners
    document.getElementById('calculate-prognose-btn').addEventListener('click', calculateWahlkreisPrognose);
    document.getElementById('toggle-wahlkreise-btn').addEventListener('click', toggleWahlkreisDetails);
    document.getElementById('swing-method').addEventListener('change', updateMethodDescription);
    
    // Make functions globally available for inline onclick handlers
    window.removeParty = removeParty;
    window.validatePercentageInput = validatePercentageInput;
    window.validateDirectMandateInput = validateDirectMandateInput;
    window.setMode = setMode;
    window.closeWahlkreisModal = closeWahlkreisModal;
    window.openWahlkreisModal = openWahlkreisModal;
    
    // Initial validation message update
    updateValidationMessage();
    
    // Prognose-Section initial verstecken (startet im manuellen Modus)
    const prognoseSection = document.querySelector('.prognose-section');
    if (prognoseSection) {
        prognoseSection.style.display = 'none';
    }
});
