class GradeCalculator {
    constructor() {
        this.activitiesCount = 3;
        this.performancesCount = 2;
        this.recitationsCount = 4;
        
        this.initializeEventListeners();
        this.generateInputFields();
        this.updatePercentageTotal();
    }

    initializeEventListeners() {
        // Configuration inputs
        document.getElementById('activitiesCount').addEventListener('change', (e) => {
            this.activitiesCount = parseInt(e.target.value);
        });

        document.getElementById('performancesCount').addEventListener('change', (e) => {
            this.performancesCount = parseInt(e.target.value);
        });

        document.getElementById('recitationsCount').addEventListener('change', (e) => {
            this.recitationsCount = parseInt(e.target.value);
        });

        // Generate inputs button
        document.getElementById('generateInputs').addEventListener('click', () => {
            this.generateInputFields();
        });

        // Percentage inputs
        const percentageInputs = ['activitiesPercent', 'performancesPercent', 'examPercent', 'recitationsPercent'];
        percentageInputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                this.updatePercentageTotal();
            });
        });

        // Calculate button
        document.getElementById('calculateGrades').addEventListener('click', () => {
            this.calculateGrades();
        });

        // Clear button
        document.getElementById('clearAll').addEventListener('click', () => {
            this.clearAllInputs();
        });
    }

    generateInputFields() {
        this.generateActivitiesInputs();
        this.generatePerformancesInputs();
        this.generateRecitationsInputs();
    }

    generateActivitiesInputs() {
        const container = document.getElementById('activitiesInputs');
        container.innerHTML = '';

        for (let i = 0; i < this.activitiesCount; i++) {
            const inputDiv = document.createElement('div');
            inputDiv.className = 'input-item';
            
            inputDiv.innerHTML = `
                <label for="activity${i}">Activity ${i + 1}:</label>
                <input type="number" id="activity${i}" min="0" max="30" step="1">
            `;
            
            container.appendChild(inputDiv);
        }
    }

    generatePerformancesInputs() {
        const container = document.getElementById('performancesInputs');
        container.innerHTML = '';

        for (let i = 0; i < this.performancesCount; i++) {
            const inputDiv = document.createElement('div');
            inputDiv.className = 'input-item';
            
            inputDiv.innerHTML = `
                <label for="performance${i}">Performance ${i + 1}:</label>
                <input type="number" id="performance${i}" min="0" max="100" step="1">
            `;
            
            container.appendChild(inputDiv);
        }
    }

    generateRecitationsInputs() {
        const container = document.getElementById('recitationsInputs');
        container.innerHTML = '';

        for (let i = 0; i < this.recitationsCount; i++) {
            const inputDiv = document.createElement('div');
            inputDiv.className = 'input-item';
            
            inputDiv.innerHTML = `
                <label for="recitation${i}">Recitation ${i + 1}:</label>
                <input type="number" id="recitation${i}" min="0" max="20" step="1">
            `;
            
            container.appendChild(inputDiv);
        }
    }

    updatePercentageTotal() {
        const activities = parseFloat(document.getElementById('activitiesPercent').value) || 0;
        const performances = parseFloat(document.getElementById('performancesPercent').value) || 0;
        const exam = parseFloat(document.getElementById('examPercent').value) || 0;
        const recitations = parseFloat(document.getElementById('recitationsPercent').value) || 0;

        const total = activities + performances + exam + recitations;
        document.getElementById('totalPercentage').textContent = total.toFixed(1);

        // Visual feedback for percentage total
        const totalElement = document.getElementById('totalPercentage');
        if (total === 100) {
            totalElement.style.color = '#48bb78';
        } else {
            totalElement.style.color = '#e53e3e';
        }
    }

    getActivityScores() {
        const scores = [];
        for (let i = 0; i < this.activitiesCount; i++) {
            const value = document.getElementById(`activity${i}`).value;
            if (value !== '') {
                scores.push(parseFloat(value));
            }
        }
        return scores;
    }

    getPerformanceScores() {
        const scores = [];
        for (let i = 0; i < this.performancesCount; i++) {
            const value = document.getElementById(`performance${i}`).value;
            if (value !== '') {
                scores.push(parseFloat(value));
            }
        }
        return scores;
    }

    getRecitationScores() {
        const scores = [];
        for (let i = 0; i < this.recitationsCount; i++) {
            const value = document.getElementById(`recitation${i}`).value;
            if (value !== '') {
                scores.push(parseFloat(value));
            }
        }
        return scores;
    }

    calculateAverage(scores) {
        if (scores.length === 0) return 0;
        const sum = scores.reduce((total, score) => total + score, 0);
        return sum / scores.length;
    }

    // Calculate normalized average (converts scores to 100-point scale)
    calculateNormalizedAverage(scores, maxScore = 100) {
        if (scores.length === 0) return 0;
        const normalizedScores = scores.map(score => (score / maxScore) * 100);
        const sum = normalizedScores.reduce((total, score) => total + score, 0);
        return sum / normalizedScores.length;
    }

    getLetterGrade(numericGrade) {
        if (numericGrade >= 97) return 'A+';
        else if (numericGrade >= 93) return 'A';
        else if (numericGrade >= 90) return 'A-';
        else if (numericGrade >= 87) return 'B+';
        else if (numericGrade >= 83) return 'B';
        else if (numericGrade >= 80) return 'B-';
        else if (numericGrade >= 77) return 'C+';
        else if (numericGrade >= 73) return 'C';
        else if (numericGrade >= 70) return 'C-';
        else if (numericGrade >= 67) return 'D+';
        else if (numericGrade >= 65) return 'D';
        else return 'F';
    }

    validateInputs() {
        const totalPercentage = parseFloat(document.getElementById('totalPercentage').textContent);
        
        if (totalPercentage !== 100) {
            alert('Error: Total percentage must equal 100%. Current total: ' + totalPercentage + '%');
            return false;
        }

        // Check if at least some inputs are filled
        const activityScores = this.getActivityScores();
        const performanceScores = this.getPerformanceScores();
        const recitationScores = this.getRecitationScores();
        const midtermExam = document.getElementById('midtermExam').value;
        const finalExam = document.getElementById('finalExam').value;

        if (activityScores.length === 0 && performanceScores.length === 0 && 
            recitationScores.length === 0 && !midtermExam && !finalExam) {
            alert('Error: Please enter at least some scores to calculate grades.');
            return false;
        }

        return true;
    }

    calculateGrades() {
        if (!this.validateInputs()) {
            return;
        }

        // Get all scores
        const activityScores = this.getActivityScores();
        const performanceScores = this.getPerformanceScores();
        const recitationScores = this.getRecitationScores();
        const midtermExam = parseFloat(document.getElementById('midtermExam').value) || 0;
        const finalExam = parseFloat(document.getElementById('finalExam').value) || 0;

        // Calculate normalized averages (convert all to 100-point scale)
        const activityAvg = this.calculateNormalizedAverage(activityScores, 30);
        const performanceAvg = this.calculateNormalizedAverage(performanceScores, 100);
        const recitationAvg = this.calculateNormalizedAverage(recitationScores, 20);

        // Get percentages
        const activityPercent = parseFloat(document.getElementById('activitiesPercent').value) / 100;
        const performancePercent = parseFloat(document.getElementById('performancesPercent').value) / 100;
        const examPercent = parseFloat(document.getElementById('examPercent').value) / 100;
        const recitationPercent = parseFloat(document.getElementById('recitationsPercent').value) / 100;

        // Calculate midterm grade (excluding final exam)
        const midtermComponents = [
            { name: 'Activities', avg: activityAvg, percent: activityPercent },
            { name: 'Performances', avg: performanceAvg, percent: performancePercent },
            { name: 'Midterm Exam', avg: midtermExam, percent: examPercent },
            { name: 'Recitations', avg: recitationAvg, percent: recitationPercent }
        ];

        const midtermGrade = midtermComponents.reduce((total, component) => {
            return total + (component.avg * component.percent);
        }, 0);

        // Calculate final grade (replace midterm exam with final exam)
        const finalComponents = [
            { name: 'Activities', avg: activityAvg, percent: activityPercent },
            { name: 'Performances', avg: performanceAvg, percent: performancePercent },
            { name: 'Final Exam', avg: finalExam, percent: examPercent },
            { name: 'Recitations', avg: recitationAvg, percent: recitationPercent }
        ];

        const finalGrade = finalComponents.reduce((total, component) => {
            return total + (component.avg * component.percent);
        }, 0);

        // Display results
        this.displayResults(midtermGrade, finalGrade, {
            activityAvg,
            performanceAvg,
            recitationAvg,
            midtermExam,
            finalExam,
            activityPercent,
            performancePercent,
            examPercent,
            recitationPercent
        });
    }

    displayResults(midtermGrade, finalGrade, breakdown) {
        // Show results section
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.classList.add('show');

        // Display grades
        document.getElementById('midtermGrade').textContent = midtermGrade.toFixed(2);
        document.getElementById('finalGrade').textContent = finalGrade.toFixed(2);
        
        // Display letter grades
        document.getElementById('midtermLetter').textContent = this.getLetterGrade(midtermGrade);
        document.getElementById('finalLetter').textContent = this.getLetterGrade(finalGrade);

        // Display breakdown
        this.displayBreakdown(breakdown);

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    displayBreakdown(breakdown) {
        const container = document.getElementById('gradeBreakdown');
        container.innerHTML = '';

        const components = [
            { name: 'Activities Average', value: breakdown.activityAvg.toFixed(2), weight: (breakdown.activityPercent * 100).toFixed(0) + '%' },
            { name: 'Performances Average', value: breakdown.performanceAvg.toFixed(2), weight: (breakdown.performancePercent * 100).toFixed(0) + '%' },
            { name: 'Recitations Average', value: breakdown.recitationAvg.toFixed(2), weight: (breakdown.recitationPercent * 100).toFixed(0) + '%' },
            { name: 'Midterm Exam', value: breakdown.midtermExam.toFixed(2), weight: (breakdown.examPercent * 100).toFixed(0) + '%' },
            { name: 'Final Exam', value: breakdown.finalExam.toFixed(2), weight: (breakdown.examPercent * 100).toFixed(0) + '%' }
        ];

        components.forEach(component => {
            const div = document.createElement('div');
            div.className = 'breakdown-item';
            div.innerHTML = `
                <div class="category">${component.name} (${component.weight})</div>
                <div class="score">${component.value}</div>
            `;
            container.appendChild(div);
        });
    }

    clearAllInputs() {
        // Clear all activity inputs
        for (let i = 0; i < this.activitiesCount; i++) {
            const input = document.getElementById(`activity${i}`);
            if (input) input.value = '';
        }

        // Clear all performance inputs
        for (let i = 0; i < this.performancesCount; i++) {
            const input = document.getElementById(`performance${i}`);
            if (input) input.value = '';
        }

        // Clear all recitation inputs
        for (let i = 0; i < this.recitationsCount; i++) {
            const input = document.getElementById(`recitation${i}`);
            if (input) input.value = '';
        }

        // Clear exam inputs
        document.getElementById('midtermExam').value = '';
        document.getElementById('finalExam').value = '';

        // Hide results section
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.classList.remove('show');

        // Reset result displays
        document.getElementById('midtermGrade').textContent = '--';
        document.getElementById('finalGrade').textContent = '--';
        document.getElementById('midtermLetter').textContent = '--';
        document.getElementById('finalLetter').textContent = '--';

        // Clear breakdown
        document.getElementById('gradeBreakdown').innerHTML = '';

        // Show confirmation
        alert('All inputs have been cleared successfully.');
    }

    // Utility method to add input validation styling
    addInputValidation() {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                const value = parseFloat(e.target.value);
                const min = parseFloat(e.target.getAttribute('min')) || 0;
                const max = parseFloat(e.target.getAttribute('max')) || 100;

                if (e.target.value === '') {
                    e.target.classList.remove('valid', 'invalid');
                } else if (value >= min && value <= max) {
                    e.target.classList.remove('invalid');
                    e.target.classList.add('valid');
                } else {
                    e.target.classList.remove('valid');
                    e.target.classList.add('invalid');
                }
            });
        });
    }

    // Method to export results as text
    exportResults() {
        const midtermGrade = document.getElementById('midtermGrade').textContent;
        const finalGrade = document.getElementById('finalGrade').textContent;
        const midtermLetter = document.getElementById('midtermLetter').textContent;
        const finalLetter = document.getElementById('finalLetter').textContent;

        if (midtermGrade === '--') {
            alert('Please calculate grades first before exporting.');
            return;
        }

        const exportText = `
Grade Calculation Results
========================
Mid-term Grade: ${midtermGrade} (${midtermLetter})
Final Grade: ${finalGrade} (${finalLetter})

Configuration:
- Activities: ${this.activitiesCount} items
- Performances: ${this.performancesCount} items  
- Recitations: ${this.recitationsCount} items

Percentages:
- Activities: ${document.getElementById('activitiesPercent').value}%
- Performances: ${document.getElementById('performancesPercent').value}%
- Exams: ${document.getElementById('examPercent').value}%
- Recitations: ${document.getElementById('recitationsPercent').value}%

Generated on: ${new Date().toLocaleString()}
        `;

        // Create downloadable text file
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grade_calculation_results.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Method to save configuration
    saveConfiguration() {
        const config = {
            activitiesCount: this.activitiesCount,
            performancesCount: this.performancesCount,
            recitationsCount: this.recitationsCount,
            percentages: {
                activities: document.getElementById('activitiesPercent').value,
                performances: document.getElementById('performancesPercent').value,
                exam: document.getElementById('examPercent').value,
                recitations: document.getElementById('recitationsPercent').value
            }
        };

        // Since we can't use localStorage, we'll create a downloadable JSON file
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grade_calculator_config.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Initialize the calculator with enhanced features
    init() {
        this.addInputValidation();
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.calculateGrades();
            } else if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.clearAllInputs();
            }
        });

        // Add tooltips for better UX
        this.addTooltips();
    }

    addTooltips() {
        const tooltips = {
            'generateInputs': 'Click to generate input fields based on your configuration',
            'calculateGrades': 'Calculate your grades (Ctrl+Enter)',
            'clearAll': 'Clear all input fields (Ctrl+R)',
            'totalPercentage': 'Total percentage must equal 100%'
        };

        Object.keys(tooltips).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.title = tooltips[id];
            }
        });
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new GradeCalculator();
    calculator.init();
    
    // Add some helpful console messages for developers
    console.log('Grade Calculator initialized successfully!');
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl+Enter: Calculate grades');
    console.log('- Ctrl+R: Clear all inputs');
});