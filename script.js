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

// Initialize default parties
function initParties() {
    parties = [
        { name: 'CDU', percentage: 25, directMandates: 45 },
        { name: 'Grüne', percentage: 20, directMandates: 11 },
        { name: 'SPD', percentage: 10, directMandates: 0 },
        { name: 'AfD', percentage: 20, directMandates: 4 },
        { name: 'FDP', percentage: 5, directMandates: 0 },
        { name: 'Linke', percentage: 5, directMandates: 0 }
    ];
    renderPartyTable();
}

// Render the input table
function renderPartyTable() {
    const tbody = document.getElementById('party-tbody');
    tbody.innerHTML = '';
    
    parties.forEach((party, index) => {
        const row = document.createElement('tr');
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
}

// Validate direct mandate input in real-time
function validateDirectMandateInput(input) {
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
        
        // Final seats: at least direct mandates, otherwise proportional
        const finalTotal = Math.max(proportionalSeats, direct);
        
        // Überhang: wenn Direktmandate > proportionale Sitze bei finaler Größe
        if (direct > proportionalSeats) {
            overhangMandates[index] = direct - proportionalSeats;
        } else {
            overhangMandates[index] = 0;
        }
        
        // Listensitze: Sitze die über die Liste kommen (Gesamtsitze - Direktmandate)
        listSeats[index] = Math.max(0, finalTotal - direct);
        
        // Ausgleichsmandate: Differenz zwischen finaler und ursprünglicher Verteilung
        compensationSeats[index] = Math.max(0, proportionalSeats - initialListSeats[index]);
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
            <td>${listSeats[index]}</td>
            <td>${overhangMandates[index] || 0}</td>
            <td>${compensationSeats[index] || 0}</td>
            <td><strong>${finalSeats[index]}</strong></td>
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

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initParties();
    
    document.getElementById('add-party-btn').addEventListener('click', addParty);
    document.getElementById('calculate-btn').addEventListener('click', calculateSeats);
    
    // Make functions globally available for inline onclick handlers
    window.removeParty = removeParty;
    window.validatePercentageInput = validatePercentageInput;
    window.validateDirectMandateInput = validateDirectMandateInput;
    
    // Initial validation message update
    updateValidationMessage();
});
