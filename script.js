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
