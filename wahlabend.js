'use strict';

// ============================================================
// KONFIGURATION
// ============================================================

// Parteifarben – erweitert um alle relevanten Parteien der LTW 2026
const PARTY_CONFIG = {
    'GRÜNE':                    { color: '#64a12d', textColor: 'white' },
    'CDU':                      { color: '#000000', textColor: 'white' },
    'SPD':                      { color: '#e3000f', textColor: 'white' },
    'FDP':                      { color: '#ffed00', textColor: '#333'  },
    'AfD':                      { color: '#009ee0', textColor: 'white' },
    'Die Linke':                { color: '#be3075', textColor: 'white' },
    'BSW':                      { color: '#8B0000', textColor: 'white' },
    'FREIE WÄHLER':             { color: '#F06400', textColor: 'white' },
    'Die PARTEI':               { color: '#c41e3a', textColor: 'white' },
    'dieBasis':                 { color: '#005b99', textColor: 'white' },
    'KlimalisteBW':             { color: '#00a651', textColor: 'white' },
    'ÖDP':                      { color: '#eb7e00', textColor: 'white' },
    'Volt':                     { color: '#562883', textColor: 'white' },
    'Bündnis C':                { color: '#003087', textColor: 'white' },
    'PDH':                      { color: '#888888', textColor: 'white' },
    'Verjüngungsforschung':     { color: '#888888', textColor: 'white' },
    'Die Gerechtigkeitspartei': { color: '#888888', textColor: 'white' },
    'PDR':                      { color: '#888888', textColor: 'white' },
    'PdF':                      { color: '#888888', textColor: 'white' },
    'Tierschutzpartei':         { color: '#3c763d', textColor: 'white' },
    'Werteunion':               { color: '#555555', textColor: 'white' },
};

// Erststimmen-Mapping (D-Spalten → Parteien)
// Quelle: 2026021_LTW26-Hinweise-DSB.pdf, Stand 4.2.2026
// Reihenfolge nach Stärke bei der letzten Wahl: D1 = GRÜNE (stärkste 2021)
const ERSTSTIMMEN_MAPPING = {
    'D1':  'GRÜNE',
    'D2':  'CDU',
    'D3':  'SPD',
    'D4':  'FDP',
    'D5':  'AfD',
    'D6':  'Die Linke',
    'D7':  'FREIE WÄHLER',
    'D8':  'Die PARTEI',
    'D9':  'dieBasis',
    'D11': 'ÖDP',
    'D12': 'Volt',
    'D13': 'Bündnis C',
    'D16': 'BSW',
    'D17': 'Die Gerechtigkeitspartei',
    'D20': 'Tierschutzpartei',
    'D21': 'Werteunion',
    // D22 = Anderer Kreiswahlvorschlag – wird laut Datensatzbeschreibung
    // NICHT auf Landesebene summiert; wird für die Gewinnermittlung ignoriert
};

// Zweitstimmen-Mapping (F-Spalten → Parteien)
const ZWEITSTIMMEN_MAPPING = {
    'F1':  'GRÜNE',
    'F2':  'CDU',
    'F3':  'SPD',
    'F4':  'FDP',
    'F5':  'AfD',
    'F6':  'Die Linke',
    'F7':  'FREIE WÄHLER',
    'F8':  'Die PARTEI',
    'F9':  'dieBasis',
    'F10': 'KlimalisteBW',
    'F11': 'ÖDP',
    'F12': 'Volt',
    'F13': 'Bündnis C',
    'F14': 'PDH',
    'F15': 'Verjüngungsforschung',
    'F16': 'BSW',
    'F17': 'Die Gerechtigkeitspartei',
    'F18': 'PDR',
    'F19': 'PdF',
    'F20': 'Tierschutzpartei',
    'F21': 'Werteunion',
};

const MIN_PARLIAMENT_SIZE = 120;
const THRESHOLD_PERCENT   = 5;


// Wahlkreisnamen (70 Wahlkreise)
const WK_NAMEN = {
    1:  'Stuttgart I',            2:  'Stuttgart II',           3:  'Stuttgart III',
    4:  'Stuttgart IV',           5:  'Böblingen',              6:  'Leonberg',
    7:  'Esslingen',              8:  'Kirchheim',              9:  'Nürtingen',
    10: 'Göppingen',             11:  'Geislingen',            12:  'Ludwigsburg',
    13: 'Vaihingen',             14:  'Bietigheim-Bissingen',  15:  'Waiblingen',
    16: 'Schorndorf',            17:  'Backnang',              18:  'Heilbronn',
    19: 'Eppingen',              20:  'Neckarsulm',            21:  'Hohenlohe',
    22: 'Schwäbisch Hall',       23:  'Main-Tauber',           24:  'Heidenheim',
    25: 'Schwäbisch Gmünd',      26:  'Aalen',                 27:  'Karlsruhe I',
    28: 'Karlsruhe II',          29:  'Bruchsal',              30:  'Bretten',
    31: 'Ettlingen',             32:  'Rastatt',               33:  'Baden-Baden',
    34: 'Heidelberg',            35:  'Mannheim I',            36:  'Mannheim II',
    37: 'Wiesloch',              38:  'Neckar-Odenwald',       39:  'Weinheim',
    40: 'Schwetzingen',          41:  'Sinsheim',              42:  'Pforzheim',
    43: 'Calw',                  44:  'Enz',                   45:  'Freudenstadt',
    46: 'Freiburg I',            47:  'Freiburg II',           48:  'Breisgau',
    49: 'Emmendingen',           50:  'Lahr',                  51:  'Offenburg',
    52: 'Kehl',                  53:  'Rottweil',              54:  'Villingen-Schwenningen',
    55: 'Tuttlingen-Donaueschingen', 56: 'Konstanz',           57:  'Singen',
    58: 'Lörrach',               59:  'Waldshut',              60:  'Reutlingen',
    61: 'Hechingen-Münsingen',   62:  'Tübingen',              63:  'Balingen',
    64: 'Ulm',                   65:  'Ehingen',               66:  'Biberach',
    67: 'Bodensee',              68:  'Wangen',                69:  'Ravensburg',
    70: 'Sigmaringen',
};

// Standard-URL der Statistik BW (LTW 2026)
const DEFAULT_CSV_URL = 'https://wahlen.statistik-bw.de/ltw26/ltw26-ergebnisse.csv';

// App-Zustand
let currentSitzverteilung = null;
let autoRefreshTimer      = null;
let countdownTimer        = null;

// ============================================================
// CSV-PARSING
// ============================================================

function parseCSV(text) {
    const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    const nonEmpty = lines.filter(l => l.trim());
    if (nonEmpty.length === 0) return [];

    const headers = nonEmpty[0].split(';').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];

    for (let i = 1; i < nonEmpty.length; i++) {
        const values = nonEmpty[i].split(';').map(v => v.trim().replace(/^"|"$/g, ''));
        const row = {};
        headers.forEach((h, idx) => { row[h] = values[idx] !== undefined ? values[idx] : ''; });
        rows.push(row);
    }

    return rows;
}

// ============================================================
// DATENVERARBEITUNG
// ============================================================

function processData(rows) {
    // Nur LAND- und WAHLKREIS-Zeilen werden benötigt
    const landRow       = rows.find(r => r['Gebietsart'] === 'LAND');
    const wahlkreisRows = rows.filter(r => r['Gebietsart'] === 'WAHLKREIS');

    if (!landRow && wahlkreisRows.length === 0) {
        throw new Error('Keine gültigen Daten: Weder LAND- noch WAHLKREIS-Zeilen in der Datei gefunden.');
    }

    const direktmandate = berechneDirectmandate(wahlkreisRows);

    // Sitzverteilung nur wenn LAND-Zeile vorhanden (Zweitstimmen-Aggregat)
    const sitzverteilung = landRow
        ? berechneSitzverteilung(landRow, direktmandate.perPartei)
        : null;

    // Auszählungsstand vom LAND-Aggregat (bevorzugt) oder Summe der WK-Zeilen
    let gemeldet = 0;
    let gesamt   = 0;
    if (landRow) {
        gemeldet = parseInt(landRow['gemeldete Wahlbezirke'] || '0') || 0;
        gesamt   = parseInt(landRow['Anzahl Wahlbezirke']    || '0') || 0;
    } else {
        wahlkreisRows.forEach(r => {
            gemeldet += parseInt(r['gemeldete Wahlbezirke'] || '0') || 0;
            gesamt   += parseInt(r['Anzahl Wahlbezirke']    || '0') || 0;
        });
    }

    const prognose = berechnePrognose(direktmandate, landRow || null);

    return { direktmandate, sitzverteilung, gemeldet, gesamt, prognose };
}

// ============================================================
// DIREKTMANDATE – Erststimmen pro Wahlkreis
// ============================================================

function berechneDirectmandate(wahlkreisRows) {
    const ergebnisse = {};
    const perPartei  = {};

    wahlkreisRows.forEach(row => {
        const wkNr = parseInt(row['Wahlkreisnummer']);
        if (isNaN(wkNr) || wkNr < 1 || wkNr > 70) return;

        const stimmen = {};
        let maxStimmen    = 0;
        let winner        = null;
        let gesamtStimmen = 0;

        Object.entries(ERSTSTIMMEN_MAPPING).forEach(([col, partei]) => {
            const v = parseInt(row[col] || '0') || 0;
            stimmen[partei] = v;
            gesamtStimmen  += v;
            if (v > maxStimmen) {
                maxStimmen = v;
                winner = partei;
            }
        });

        // Kein Gewinner wenn alle Stimmen 0 (noch nicht ausgezählt)
        if (maxStimmen === 0) winner = null;

        const gemeldet        = parseInt(row['gemeldete Wahlbezirke'] || '0') || 0;
        const gesamt          = parseInt(row['Anzahl Wahlbezirke']    || '0') || 0;
        const auszaehlungsgrad = gesamt > 0 ? gemeldet / gesamt : 0;

        // Vorsprung = prozentualer Abstand zum Zweitplatzierten
        const sorted    = Object.values(stimmen).sort((a, b) => b - a);
        const vorsprung = gesamtStimmen > 0 && sorted.length >= 2
            ? (sorted[0] - sorted[1]) / gesamtStimmen * 100
            : 0;

        ergebnisse[wkNr] = {
            wkNr,
            wkName: row['Wahlkreisname'] || WK_NAMEN[wkNr] || `WK ${wkNr}`,
            winner,
            stimmen,
            gesamtStimmen,
            vorsprung,
            auszaehlungsgrad,
            gemeldet,
            gesamt,
        };

        if (winner && auszaehlungsgrad >= 1.0) {
            perPartei[winner] = (perPartei[winner] || 0) + 1;
        }
    });

    return { ergebnisse, perPartei };
}

// ============================================================
// SAINTE-LAGUË / SCHEPERS-ALGORITHMUS
// ============================================================

function sainteLagueDistribution(votes, totalSeats) {
    const parties   = votes.map((v, i) => ({ votes: v, index: i, seats: 0 }));
    const quotients = [];

    for (let i = 0; i < parties.length; i++) {
        for (let d = 0.5; d <= totalSeats + 0.5; d += 1) {
            quotients.push({ value: parties[i].votes / d, partyIndex: i });
        }
    }

    quotients.sort((a, b) => b.value - a.value);

    for (let i = 0; i < totalSeats; i++) {
        if (quotients[i]) parties[quotients[i].partyIndex].seats++;
    }

    return parties.map(p => p.seats);
}

// ============================================================
// SITZVERTEILUNG (Zweitstimmen + Überhang + Ausgleich)
// ============================================================

function berechneSitzverteilung(landRow, direktPerPartei) {
    // Zweitstimmen aus der LAND-Zeile auslesen
    const zweitstimmen    = {};
    let totalZweitstimmen = 0;

    Object.entries(ZWEITSTIMMEN_MAPPING).forEach(([col, partei]) => {
        const v = parseInt(landRow[col] || '0') || 0;
        zweitstimmen[partei]  = v;
        totalZweitstimmen    += v;
    });

    if (totalZweitstimmen === 0) return null;

    // 5%-Hürde
    const threshold  = totalZweitstimmen * (THRESHOLD_PERCENT / 100);
    const unterHuerde = [];

    const eligibleParties = Object.entries(zweitstimmen)
        .filter(([partei, stimmen]) => {
            if (stimmen >= threshold) return true;
            if (stimmen > 0) unterHuerde.push(partei);
            return false;
        })
        .map(([partei, stimmen]) => ({
            partei,
            stimmen,
            prozent:       stimmen / totalZweitstimmen * 100,
            direktmandate: direktPerPartei[partei] || 0,
        }));

    if (eligibleParties.length === 0) {
        return { parties: [], totalSeats: 0, totalOverhang: 0, totalCompensation: 0, totalZweitstimmen, unterHuerde };
    }

    const votes = eligibleParties.map(p => p.stimmen);

    // Ausgangszuteilung bei 120 Mindestsitzen
    const initialDistribution = sainteLagueDistribution(votes, MIN_PARLIAMENT_SIZE);

    // Überhangmandate prüfen
    let hasOverhang = false;
    eligibleParties.forEach((party, i) => {
        if (party.direktmandate > initialDistribution[i]) hasOverhang = true;
    });

    // Mindestgröße des Landtags bestimmen (iterativ)
    let parliamentSize = MIN_PARLIAMENT_SIZE;
    if (hasOverhang) {
        for (let iter = 0; iter < 300; iter++) {
            const dist         = sainteLagueDistribution(votes, parliamentSize);
            const allSatisfied = eligibleParties.every((p, i) => dist[i] >= p.direktmandate);
            if (allSatisfied) break;
            parliamentSize++;
        }
    }

    const finalDistribution = sainteLagueDistribution(votes, parliamentSize);

    // Sitze berechnen
    let totalOverhang      = 0;
    let totalCompensation  = 0;

    const parties = eligibleParties.map((party, i) => {
        const proportional        = finalDistribution[i];
        const initialProportional = initialDistribution[i];
        const direkt              = party.direktmandate;
        const total               = Math.max(proportional, direkt);

        // Überhang: Direktmandate übersteigen ursprüngliche Listensitze
        const ueberhang = direkt > initialProportional ? direkt - initialProportional : 0;
        // Ausgleich: für Parteien OHNE Überhang, die durch Parlamentsvergrößerung mehr Sitze bekommen
        const ausgleich = ueberhang === 0 ? Math.max(0, total - initialProportional) : 0;

        totalOverhang     += ueberhang;
        totalCompensation += ausgleich;

        return { ...party, proportional, total, ueberhang, ausgleich };
    });

    const totalSeats = parties.reduce((s, p) => s + p.total, 0);

    return { parties, totalSeats, totalOverhang, totalCompensation, totalZweitstimmen, parliamentSize, unterHuerde };
}

// ============================================================
// PROGNOSE-MODELL (Swing-Modell / Normalverteilung)
// ============================================================

// Repräsentiert die typische Stimmen-Schwankung zwischen Wahlbezirken in %-Punkten.
// Höherer Wert → mehr Unsicherheit bei frühem Auszählungsstand.
const BASE_VOLATILITY = 8;

// Normalverteilungs-CDF (Abramowitz & Stegun, Fehler < 7.5e-8)
function normalCDF(x) {
    if (x < -8) return 0;
    if (x >  8) return 1;
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989422820 * Math.exp(-x * x / 2);
    const p = d * t * (0.3193815301 + t * (-0.3565637813 + t * (1.7814779372 + t * (-1.8212559978 + t * 1.3302744929))));
    return x >= 0 ? 1 - p : p;
}

// Berechnet fuer einen Wahlkreis die hochgerechneten Stimmen und die Gewinnwahrscheinlichkeit.
function prognostiziereWahlkreis(wk) {
    // Vollstaendig ausgezaehlt: 100% Sicherheit
    if (wk.auszaehlungsgrad >= 1.0 || wk.gesamt === 0) {
        return { winner: wk.winner, winProb: 1.0, projectedStimmen: { ...wk.stimmen }, isPrognose: false };
    }

    const f = wk.auszaehlungsgrad;

    // Noch kein Ergebnis vorhanden
    if (f === 0) {
        return { winner: null, winProb: 0, projectedStimmen: {}, isPrognose: true };
    }

    // Lineare Hochrechnung: aktuelle Stimmen / Auszaehlungsgrad
    const projectedStimmen = {};
    let totalProjected = 0;
    Object.entries(wk.stimmen).forEach(([partei, v]) => {
        const proj = v / f;
        projectedStimmen[partei] = proj;
        totalProjected += proj;
    });

    if (totalProjected === 0) {
        return { winner: null, winProb: 0, projectedStimmen: {}, isPrognose: true };
    }

    // Platz 1 und 2 bestimmen
    const sorted  = Object.entries(projectedStimmen).sort((a, b) => b[1] - a[1]);
    const first   = sorted[0];
    const second  = sorted.length >= 2 ? sorted[1] : [null, 0];

    // Vorsprung in %-Punkten
    const marginPct = (first[1] - second[1]) / totalProjected * 100;

    // Unsicherheit: nimmt mit steigendem Auszaehlungsgrad stark ab
    const sigma   = BASE_VOLATILITY * Math.sqrt((1 - f) / f);
    const winProb = sigma > 0 ? normalCDF(marginPct / sigma) : (marginPct > 0 ? 1.0 : 0.5);

    return { winner: first[0], winProb, projectedStimmen, isPrognose: true };
}

// Berechnet die vollstaendige Prognose: pro WK Gewinner + Wahrscheinlichkeit,
// hochgerechnete Zweitstimmen und eine hypothetische Sitzverteilung.
function berechnePrognose(direktmandate, landRow) {
    const { ergebnisse } = direktmandate;
    const progPerWK     = {};
    const progPerPartei = {}; // hypothetische Direktmandate

    for (let wkNr = 1; wkNr <= 70; wkNr++) {
        const wk = ergebnisse[wkNr];
        if (!wk) continue;

        const prog = prognostiziereWahlkreis(wk);
        progPerWK[wkNr] = { ...wk, prognoseWinner: prog.winner, winProb: prog.winProb, isPrognose: prog.isPrognose };

        if (prog.winner) {
            progPerPartei[prog.winner] = (progPerPartei[prog.winner] || 0) + 1;
        }
    }

    // Zweitstimmen hochrechnen und Sitzverteilung berechnen
    let prognoseSitzverteilung = null;

    if (landRow) {
        const gemeldet = parseInt(landRow['gemeldete Wahlbezirke'] || '0') || 0;
        const gesamt   = parseInt(landRow['Anzahl Wahlbezirke']    || '0') || 0;
        const f        = gesamt > 0 ? gemeldet / gesamt : 0;

        if (f > 0) {
            // Synthetische LAND-Zeile mit hochgerechneten Zweitstimmen
            const projLandRow = { ...landRow };
            Object.keys(ZWEITSTIMMEN_MAPPING).forEach(col => {
                const v = parseInt(landRow[col] || '0') || 0;
                projLandRow[col] = String(Math.round(v / f));
            });
            prognoseSitzverteilung = berechneSitzverteilung(projLandRow, progPerPartei);
        }
    }

    return { progPerWK, progPerPartei, prognoseSitzverteilung };
}

// ============================================================
// DARSTELLUNG
// ============================================================

function partyBadgeStyle(partei) {
    const cfg = PARTY_CONFIG[partei];
    return cfg
        ? `background:${cfg.color}; color:${cfg.textColor || 'white'}`
        : 'background:#888888; color:white';
}

function displayResults(data) {
    const { direktmandate, sitzverteilung, gemeldet, gesamt, prognose } = data;

    updateAuszaehlungsstand(gemeldet, gesamt);
    displaySitzverteilungUnified(sitzverteilung, prognose);

    // Koalitionsrechner basiert auf dem besten verfügbaren Datensatz
    const bestSV = (prognose && prognose.prognoseSitzverteilung) || sitzverteilung;
    if (bestSV) {
        currentSitzverteilung = bestSV;
        setupKoalitionsrechner(bestSV);
    } else {
        document.getElementById('wa-koalition-section').classList.add('hidden');
    }

    displayWahlkreise(direktmandate, prognose);
}

function updateAuszaehlungsstand(gemeldet, gesamt) {
    document.getElementById('wa-auszaehlungsstand').classList.remove('hidden');
    document.getElementById('wa-gemeldet').textContent = gemeldet.toLocaleString('de-DE');
    document.getElementById('wa-gesamt').textContent   = gesamt.toLocaleString('de-DE');

    const pct = gesamt > 0 ? gemeldet / gesamt * 100 : 0;
    document.getElementById('wa-pct').textContent          = pct.toFixed(1).replace('.', ',');
    document.getElementById('wa-progress-fill').style.width = Math.min(100, pct) + '%';
    document.getElementById('wa-last-update').textContent  = new Date().toLocaleTimeString('de-DE');
}

// Konfidenz-CSS-Klasse basierend auf Wahrscheinlichkeit
function konfidenzClass(prob) {
    if (prob >= 0.90) return 'konfidenz-hoch';
    if (prob >= 0.70) return 'konfidenz-mittel';
    return 'konfidenz-niedrig';
}

// Kombinierte Darstellung: aktueller Stand + Hochrechnung in einer Grafik
function displaySitzverteilungUnified(sitzverteilung, prognose) {
    const section   = document.getElementById('wa-sitzverteilung-section');
    const infoBox   = document.getElementById('wa-sv-info');
    const summary   = document.getElementById('wa-sv-summary');
    const chart     = document.getElementById('wa-sv-chart');
    const legend    = document.getElementById('wa-sv-legend');
    const badge     = document.getElementById('wa-sv-badge');

    const sv   = sitzverteilung;
    const prog = prognose && prognose.prognoseSitzverteilung ? prognose.prognoseSitzverteilung : null;

    if (!sv && !prog) { section.classList.add('hidden'); return; }
    section.classList.remove('hidden');

    const isComplete = sv && (!prog || sv.totalSeats === prog.totalSeats);
    const hasBoth    = sv && prog && !isComplete;

    badge.classList.toggle('hidden', !hasBoth);
    legend.classList.toggle('hidden', !hasBoth);

    // Info-Text
    if (isComplete) {
        infoBox.innerHTML = '<p>Berechnet nach Sainte-Laguë/Schepers auf Basis der Zweitstimmen.</p>';
    } else if (hasBoth) {
        infoBox.innerHTML = '<p>Solider Balken = aktueller Stand. Schraffierter Balken = Hochrechnung auf 100% (linear). Die Hochrechnung wird genauer, je mehr Wahlbezirke ausgezählt sind.</p>';
    } else {
        infoBox.innerHTML = '<p>Hochrechnung auf Basis der bisherigen Teilergebnisse (linear auf 100% skaliert). Noch vorläufig.</p>';
    }

    // Zusammenfassung
    const best = prog || sv;
    const label = hasBoth ? ' (hochgerechnet)' : '';
    const unterHuerde = best.unterHuerde || [];
    summary.innerHTML = `
        <span><strong>${best.totalSeats}</strong> Sitze${label}</span>
        <span>Überhang: <strong>${best.totalOverhang}</strong></span>
        <span>Ausgleich: <strong>${best.totalCompensation}</strong></span>
        <span>Mehrheit: <strong>${Math.floor(best.totalSeats / 2) + 1}</strong></span>
        <span class="wa-sv-huerde">${unterHuerde.length > 0 ? `Unter 5%: ${unterHuerde.join(', ')}` : 'Alle über 5%'}</span>
    `;

    // Balkendiagramm
    chart.innerHTML = '';

    // Parteinamen vereinigen (alle aus sv und prog)
    const partyMap = new Map();
    if (sv) sv.parties.forEach(p  => partyMap.set(p.partei, { actual: p, proj: null }));
    if (prog) prog.parties.forEach(p => {
        const entry = partyMap.get(p.partei) || { actual: null, proj: null };
        entry.proj = p;
        partyMap.set(p.partei, entry);
    });

    const sorted = [...partyMap.entries()].sort((a, b) => {
        const bTotal = (b[1].proj || b[1].actual).total;
        const aTotal = (a[1].proj || a[1].actual).total;
        return bTotal - aTotal;
    });

    const BAR_MAX_PX = 180;
    const maxSeats   = sorted.length > 0
        ? (sorted[0][1].proj || sorted[0][1].actual).total
        : 1;

    sorted.forEach(([partei, { actual, proj }]) => {
        const cfg         = PARTY_CONFIG[partei] || { color: '#888888', textColor: 'white' };
        const actualSeats = actual ? actual.total : 0;
        const projSeats   = proj   ? proj.total   : actualSeats;
        const pctText     = (proj || actual).prozent.toFixed(1).replace('.', ',');

        const actualH = maxSeats > 0 ? Math.max(0, Math.round(actualSeats / maxSeats * BAR_MAX_PX)) : 0;
        const projH   = maxSeats > 0 ? Math.max(0, Math.round(projSeats   / maxSeats * BAR_MAX_PX)) : 0;
        const extraH  = Math.max(0, projH - actualH);

        const col = document.createElement('div');
        col.className = 'wa-chart-col';

        if (hasBoth && extraH > 0) {
            col.innerHTML = `
                <div class="wa-chart-bar-area" style="height:${BAR_MAX_PX + 28}px">
                    <span class="wa-chart-seats">${projSeats} <small class="wa-chart-actual-hint">(${actualSeats})</small></span>
                    <div class="wa-chart-bar wa-prognose-bar" style="height:${extraH}px; background:${cfg.color}"></div>
                    <div class="wa-chart-bar" style="height:${Math.max(3, actualH)}px; background:${cfg.color}"></div>
                </div>
                <div class="wa-chart-name">${partei}</div>
                <div class="wa-chart-pct">${pctText}%</div>
            `;
        } else {
            const h = Math.max(3, hasBoth ? actualH : projH || actualH);
            const seats = hasBoth ? actualSeats : (projSeats || actualSeats);
            col.innerHTML = `
                <div class="wa-chart-bar-area" style="height:${BAR_MAX_PX + 28}px">
                    <span class="wa-chart-seats">${seats}</span>
                    <div class="wa-chart-bar" style="height:${h}px; background:${cfg.color}"></div>
                </div>
                <div class="wa-chart-name">${partei}</div>
                <div class="wa-chart-pct">${pctText}%</div>
            `;
        }

        chart.appendChild(col);
    });

    // Direktmandate-Auflistung (prognostiziert)
    const dmEl = document.getElementById('wa-sv-direktmandate');
    if (prog) {
        const progParties = prog.parties
            .filter(p => p.direktmandate > 0)
            .sort((a, b) => b.direktmandate - a.direktmandate);
        const actualParties = sv ? sv.parties.filter(p => p.direktmandate > 0) : [];
        const confirmedTotal = actualParties.reduce((s, p) => s + p.direktmandate, 0);

        const parts = progParties.map(p => {
            const cfg = PARTY_CONFIG[p.partei] || { color: '#888' };
            return `<span style="color:${cfg.color}; font-weight:600">${p.partei}:&nbsp;${p.direktmandate}</span>`;
        });

        dmEl.innerHTML =
            `<strong>Prognostizierte Direktmandate (${confirmedTotal} / 70 bestätigt):</strong> ` +
            parts.join('<span class="wa-dm-sep">,&nbsp;&nbsp;</span>');
    } else if (sv) {
        const actualParties = sv.parties
            .filter(p => p.direktmandate > 0)
            .sort((a, b) => b.direktmandate - a.direktmandate);
        const parts = actualParties.map(p => {
            const cfg = PARTY_CONFIG[p.partei] || { color: '#888' };
            return `<span style="color:${cfg.color}; font-weight:600">${p.partei}:&nbsp;${p.direktmandate}</span>`;
        });
        dmEl.innerHTML = `<strong>Direktmandate:</strong> ` + parts.join('<span class="wa-dm-sep">,&nbsp;&nbsp;</span>');
    } else {
        dmEl.innerHTML = '';
    }
}

function displayWahlkreise(direktmandate, prognose) {
    document.getElementById('wa-wahlkreis-section').classList.remove('hidden');
    const tbody = document.getElementById('wa-wahlkreis-tbody');
    tbody.innerHTML = '';

    for (let wkNr = 1; wkNr <= 70; wkNr++) {
        const wk   = direktmandate.ergebnisse[wkNr];
        const prog = prognose && prognose.progPerWK ? prognose.progPerWK[wkNr] : null;
        const row  = document.createElement('tr');

        if (!wk) {
            row.className = 'pending';
            row.innerHTML = `
                <td class="wk-id">${wkNr}</td>
                <td class="wk-name">${WK_NAMEN[wkNr] || `WK ${wkNr}`}</td>
                <td>–</td>
                <td class="wk-auszahlung">–</td>
                <td class="wk-stimmen">–</td>
                <td class="wk-vorsprung">–</td>
                <td class="wk-prognose">–</td>
                <td class="wk-status"><span class="status-badge pending">Keine Daten</span></td>
            `;
        } else {
            const pct        = (wk.auszaehlungsgrad * 100).toFixed(0);
            const isComplete = wk.auszaehlungsgrad >= 1.0;
            const isPartial  = wk.auszaehlungsgrad > 0 && !isComplete;

            const winnerBadge = wk.winner
                ? `<span class="wk-winner" style="${partyBadgeStyle(wk.winner)}">${wk.winner}</span>`
                : '<span class="wk-winner" style="background:#ccc;color:#555">–</span>';

            let stimmfuehrerText = '–';
            if (wk.winner && wk.gesamtStimmen > 0) {
                const anteil = (wk.stimmen[wk.winner] / wk.gesamtStimmen * 100).toFixed(1);
                stimmfuehrerText = isComplete
                    ? `${wk.winner} (${anteil.replace('.', ',')}%)`
                    : `${wk.winner}: ${anteil.replace('.', ',')}%`;
            }

            const vorsprungText = wk.winner && wk.vorsprung > 0
                ? `+${wk.vorsprung.toFixed(1).replace('.', ',')}%`
                : '–';

            const statusBadge = isComplete
                ? '<span class="status-badge complete">Vollständig</span>'
                : isPartial
                    ? `<span class="status-badge partial">${pct}% ausgezählt</span>`
                    : '<span class="status-badge pending">Ausstehend</span>';

            // Prognose-Spalte
            let prognoseBadge = '–';
            if (isComplete) {
                // Vollständig ausgezählt: Ergebnis ist sicher
                prognoseBadge = winnerBadge;
            } else if (prog && prog.prognoseWinner && prog.winProb > 0) {
                const probPct  = (prog.winProb * 100).toFixed(0);
                const cssClass = konfidenzClass(prog.winProb);
                prognoseBadge  = `
                    <span class="wk-winner" style="${partyBadgeStyle(prog.prognoseWinner)}">${prog.prognoseWinner}</span>
                    <span class="konfidenz-badge ${cssClass}">${probPct}%</span>
                `;
            }

            row.innerHTML = `
                <td class="wk-id">${wkNr}</td>
                <td class="wk-name">${wk.wkName}</td>
                <td>${winnerBadge}</td>
                <td class="wk-auszahlung">${pct}%</td>
                <td class="wk-stimmen">${stimmfuehrerText}</td>
                <td class="wk-vorsprung">${vorsprungText}</td>
                <td class="wk-prognose">${prognoseBadge}</td>
                <td class="wk-status">${statusBadge}</td>
            `;
        }

        tbody.appendChild(row);
    }
}

function setupKoalitionsrechner(sv) {
    document.getElementById('wa-koalition-section').classList.remove('hidden');
    const container = document.getElementById('wa-coalition-checkboxes');
    container.innerHTML = '';

    [...sv.parties]
        .sort((a, b) => b.total - a.total)
        .forEach(party => {
            const cfg   = PARTY_CONFIG[party.partei] || { color: '#888' };
            const label = document.createElement('label');
            label.className = 'coalition-label';
            label.innerHTML = `
                <input type="checkbox" value="${party.partei}" onchange="berechneKoalition()">
                <span style="color:${cfg.color}; font-weight:600">${party.partei}</span>
                <span style="color:#666; margin-left:4px">(${party.total} Sitze)</span>
            `;
            container.appendChild(label);
        });
}

function berechneKoalition() {
    if (!currentSitzverteilung) return;

    const checked = [...document.querySelectorAll('#wa-coalition-checkboxes input:checked')]
        .map(cb => cb.value);

    const resultsEl = document.getElementById('wa-coalition-results');
    if (checked.length === 0) { resultsEl.innerHTML = ''; return; }

    const totalSeats     = currentSitzverteilung.totalSeats;
    const majority       = Math.floor(totalSeats / 2) + 1;
    const coalitionSeats = currentSitzverteilung.parties
        .filter(p => checked.includes(p.partei))
        .reduce((sum, p) => sum + p.total, 0);

    const hasMajority = coalitionSeats >= majority;
    const cssClass    = hasMajority ? 'wa-coalition-yes' : 'wa-coalition-no';

    resultsEl.innerHTML = `
        <div class="wa-coalition-result ${cssClass}">
            <strong>${checked.join(' + ')}</strong>:
            ${coalitionSeats} von ${totalSeats} Sitzen
            ${hasMajority
                ? `<span class="wa-majority-badge wa-majority-yes">✓ Mehrheit (${majority} nötig)</span>`
                : `<span class="wa-majority-badge wa-majority-no">✗ Keine Mehrheit – fehlen noch ${majority - coalitionSeats} Sitze</span>`}
        </div>
    `;
}

// ============================================================
// DATEN LADEN
// ============================================================

function setStatus(msg, type) {
    const el = document.getElementById('wa-status');
    el.textContent = msg;
    el.className   = `wahlabend-status ${type || ''}`;
    if (msg) {
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}

async function loadFromFile() {
    const fileInput = document.getElementById('csv-file');
    if (!fileInput.files || fileInput.files.length === 0) {
        setStatus('Bitte zuerst eine CSV-Datei auswählen.', 'error');
        return;
    }

    const file = fileInput.files[0];
    setStatus(`Lade ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB) …`, 'info');

    try {
        const text = await file.text();
        processAndDisplay(text, `Datei: ${file.name}`);
    } catch (err) {
        setStatus(`Fehler beim Lesen der Datei: ${err.message}`, 'error');
    }
}

// Eigener Cloudflare Worker als CORS-Proxy (cors-proxy/ im Repo)
const CORS_PROXY_URL = 'https://ltw-cors-proxy.lukas-hornung.workers.dev';

async function fetchWithCorsProxy(url) {
    // Direkter Versuch zuerst
    try {
        const response = await fetch(url);
        if (response.ok) return await response.text();
    } catch (_) { /* CORS oder Netzwerkfehler – Proxy versuchen */ }

    // Eigener CORS-Proxy
    const proxyUrl = `${CORS_PROXY_URL}/?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Proxy-Fehler (HTTP ${response.status}): ${body || response.statusText}`);
    }
    return await response.text();
}

async function loadFromUrl() {
    const url = document.getElementById('csv-url').value.trim();
    if (!url) {
        setStatus('Bitte eine URL eingeben.', 'error');
        return;
    }

    setStatus(`Lade Daten von ${url} …`, 'info');

    try {
        const text = await fetchWithCorsProxy(url);
        processAndDisplay(text, `URL: ${url}`);
    } catch (err) {
        setStatus(`Fehler beim Abrufen: ${err.message}`, 'error');
    }
}

function processAndDisplay(csvText, source) {
    try {
        const rows = parseCSV(csvText);
        if (rows.length === 0) throw new Error('CSV enthält keine Datenzeilen.');

        const data = processData(rows);
        displayResults(data);

        const { gemeldet, gesamt } = data;
        const pct = gesamt > 0
            ? (gemeldet / gesamt * 100).toFixed(1).replace('.', ',')
            : '0,0';
        setStatus(
            `Daten geladen (${source}). ${rows.length.toLocaleString('de-DE')} Zeilen verarbeitet. ` +
            `${gemeldet.toLocaleString('de-DE')} von ${gesamt.toLocaleString('de-DE')} Wahlbezirken ausgezählt (${pct}%).`,
            'success'
        );
    } catch (err) {
        setStatus(`Verarbeitungsfehler: ${err.message}`, 'error');
        console.error('[wahlabend]', err);
    }
}

// ============================================================
// AUTO-REFRESH
// ============================================================

function toggleAutoRefresh() {
    const checkbox = document.getElementById('auto-refresh');
    if (checkbox.checked) {
        startAutoRefresh();
    } else {
        stopAutoRefresh();
    }
}

function startAutoRefresh() {
    const seconds = parseInt(document.getElementById('refresh-interval').value) || 60;
    stopAutoRefresh();
    scheduleNext(seconds);
}

function stopAutoRefresh() {
    if (autoRefreshTimer) { clearTimeout(autoRefreshTimer);  autoRefreshTimer = null; }
    if (countdownTimer)   { clearInterval(countdownTimer);   countdownTimer   = null; }
    document.getElementById('refresh-countdown').classList.add('hidden');
}

function scheduleNext(seconds) {
    let remaining = seconds;
    const el = document.getElementById('refresh-countdown');
    el.classList.remove('hidden');
    el.textContent = `Nächster Abruf in ${remaining}s`;

    countdownTimer = setInterval(() => {
        remaining--;
        el.textContent = `Nächster Abruf in ${remaining}s`;
        if (remaining <= 0) { clearInterval(countdownTimer); countdownTimer = null; }
    }, 1000);

    autoRefreshTimer = setTimeout(async () => {
        const url = document.getElementById('csv-url').value.trim();
        if (url) {
            await loadFromUrl();
        }
        if (document.getElementById('auto-refresh').checked) {
            scheduleNext(parseInt(document.getElementById('refresh-interval').value) || 60);
        }
    }, seconds * 1000);
}

// ============================================================
// INIT – Automatisches Laden beim Seitenaufruf
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('csv-url');
    if (!urlInput.value.trim()) {
        urlInput.value = DEFAULT_CSV_URL;
    }
    loadFromUrl();
});
