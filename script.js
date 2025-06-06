let currentFile = null;
let analysisResults = {};

// File upload handling
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const analyzeBtn = document.getElementById('analyzeBtn');

uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

function handleFileSelect(file) {
    currentFile = file;
    analyzeBtn.disabled = false;
    
    // Show file info
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const fileType = document.getElementById('fileType');
    
    fileName.textContent = `Name: ${file.name}`;
    fileSize.textContent = `Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`;
    fileType.textContent = `Type: ${file.name.endsWith('.apk') ? 'Android APK' : 'iOS IPA'}`;
    
    fileInfo.classList.remove('hidden');
}

function startAnalysis() {
    if (!currentFile) return;
    
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('hidden');
    
    // Simulate analysis progress
    simulateAnalysis();
}

function simulateAnalysis() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const steps = [
        { percent: 20, text: 'Extracting application files...' },
        { percent: 40, text: 'Analyzing permissions...' },
        { percent: 60, text: 'Scanning for security vulnerabilities...' },
        { percent: 80, text: 'Performing code analysis...' },
        { percent: 100, text: 'Analysis complete!' }
    ];
    
    let currentStep = 0;
    
    function updateProgress() {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            progressFill.style.width = step.percent + '%';
            progressText.textContent = step.text;
            currentStep++;
            setTimeout(updateProgress, 1500);
        } else {
            generateResults();
        }
    }
    
    updateProgress();
}

function generateResults() {
    // Generate mock analysis results
    analysisResults = {
        overview: {
            riskScore: Math.floor(Math.random() * 40) + 30, // 30-70
            totalIssues: Math.floor(Math.random() * 20) + 5,
            criticalIssues: Math.floor(Math.random() * 5) + 1,
            warnings: Math.floor(Math.random() * 10) + 3
        },
        permissions: generatePermissions(),
        security: generateSecurityIssues(),
        code: generateCodeIssues()
    };
    
    displayResults();
}

function generatePermissions() {
    const permissions = [
        'INTERNET', 'ACCESS_NETWORK_STATE', 'WRITE_EXTERNAL_STORAGE',
        'READ_EXTERNAL_STORAGE', 'CAMERA', 'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION', 'RECORD_AUDIO', 'READ_CONTACTS',
        'WRITE_CONTACTS', 'READ_SMS', 'SEND_SMS'
    ];
    
    const risks = ['low', 'medium', 'high'];
    return permissions.slice(0, Math.floor(Math.random() * 8) + 4).map(perm => ({
        name: perm,
        risk: risks[Math.floor(Math.random() * risks.length)],
        description: `Permission to ${perm.toLowerCase().replace(/_/g, ' ')}`
    }));
}

function generateSecurityIssues() {
    const issues = [
        { title: 'Insecure HTTP Communication', risk: 'high', description: 'Application uses HTTP instead of HTTPS' },
        { title: 'Weak Encryption', risk: 'medium', description: 'Uses deprecated encryption algorithms' },
        { title: 'Debug Mode Enabled', risk: 'medium', description: 'Application compiled in debug mode' },
        { title: 'Root Detection Missing', risk: 'low', description: 'No root detection implemented' },
        { title: 'Certificate Pinning Missing', risk: 'medium', description: 'SSL certificate pinning not implemented' }
    ];
    
    return issues.slice(0, Math.floor(Math.random() * 4) + 2);
}

function generateCodeIssues() {
    const issues = [
        { title: 'Hardcoded Secrets', risk: 'high', description: 'API keys found in source code' },
        { title: 'SQL Injection Vulnerability', risk: 'high', description: 'Unsafe SQL query construction' },
        { title: 'Memory Leaks', risk: 'medium', description: 'Potential memory leaks detected' },
        { title: 'Unused Code', risk: 'low', description: 'Dead code found in application' }
    ];
    
    return issues.slice(0, Math.floor(Math.random() * 3) + 1);
}

function displayResults() {
    displayOverview();
    displayPermissions();
    displaySecurity();
    displayCode();
}

function displayOverview() {
    const overviewGrid = document.getElementById('overviewGrid');
    const results = analysisResults.overview;
    
    overviewGrid.innerHTML = `
        <div class="analysis-card">
            <h3>Risk Score</h3>
            <div style="font-size: 2rem; font-weight: bold; color: ${results.riskScore > 60 ? '#e74c3c' : results.riskScore > 40 ? '#f39c12' : '#27ae60'};">
                ${results.riskScore}/100
            </div>
            <p>${results.riskScore > 60 ? 'High Risk' : results.riskScore > 40 ? 'Medium Risk' : 'Low Risk'}</p>
        </div>
        <div class="analysis-card">
            <h3>Total Issues</h3>
            <div style="font-size: 2rem; font-weight: bold; color: #667eea;">
                ${results.totalIssues}
            </div>
            <p>Issues found during analysis</p>
        </div>
        <div class="analysis-card">
            <h3>Critical Issues</h3>
            <div style="font-size: 2rem; font-weight: bold; color: #e74c3c;">
                ${results.criticalIssues}
            </div>
            <p>Require immediate attention</p>
        </div>
        <div class="analysis-card">
            <h3>Warnings</h3>
            <div style="font-size: 2rem; font-weight: bold; color: #f39c12;">
                ${results.warnings}
            </div>
            <p>Potential security concerns</p>
        </div>
    `;
}

function displayPermissions() {
    const permissionsContent = document.getElementById('permissionsContent');
    const permissions = analysisResults.permissions;
    
    let html = '<div class="analysis-grid">';
    permissions.forEach(perm => {
        html += `
            <div class="analysis-card risk-${perm.risk}">
                <h3>${perm.name}</h3>
                <p><strong>Risk Level:</strong> ${perm.risk.charAt(0).toUpperCase() + perm.risk.slice(1)}</p>
                <p>${perm.description}</p>
            </div>
        `;
    });
    html += '</div>';
    
    permissionsContent.innerHTML = html;
}

function displaySecurity() {
    const securityContent = document.getElementById('securityContent');
    const issues = analysisResults.security;
    
    let html = '<div class="analysis-grid">';
    issues.forEach(issue => {
        html += `
            <div class="analysis-card risk-${issue.risk}">
                <h3>${issue.title}</h3>
                <p><strong>Risk Level:</strong> ${issue.risk.charAt(0).toUpperCase() + issue.risk.slice(1)}</p>
                <p>${issue.description}</p>
            </div>
        `;
    });
    html += '</div>';
    
    securityContent.innerHTML = html;
}

function displayCode() {
    const codeContent = document.getElementById('codeContent');
    const issues = analysisResults.code;
    
    let html = '<div class="analysis-grid">';
    issues.forEach(issue => {
        html += `
            <div class="analysis-card risk-${issue.risk}">
                <h3>${issue.title}</h3>
                <p><strong>Risk Level:</strong> ${issue.risk.charAt(0).toUpperCase() + issue.risk.slice(1)}</p>
                <p>${issue.description}</p>
            </div>
        `;
    });
    html += '</div>';
    
    codeContent.innerHTML = html;
}

function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

function clearResults() {
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('fileInfo').classList.add('hidden');
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = 'Initializing analysis...';
    analyzeBtn.disabled = true;
    currentFile = null;
    fileInput.value = '';
}
