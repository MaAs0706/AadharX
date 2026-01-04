// Simplified QR Scanner for Hackathon
class SimpleQRScanner {
    constructor() {
        this.scannerActive = false;
    }
    
    // Open scanner modal
    open() {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'flex';
            this.scannerActive = true;
            this.startMockScanner();
        }
    }
    
    // Close scanner
    close() {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'none';
            this.scannerActive = false;
        }
    }
    
    // Mock scanner animation (no actual camera)
    startMockScanner() {
        const scannerPlaceholder = document.querySelector('.qr-scanner-placeholder');
        if (!scannerPlaceholder) return;
        
        // Add scanning animation
        scannerPlaceholder.innerHTML = `
            <div class="scanner-animation">
                <div class="scanner-line"></div>
                <div class="qr-mock">
                    <div class="qr-pattern"></div>
                    <div class="qr-pattern"></div>
                    <div class="qr-pattern"></div>
                </div>
            </div>
            <p>Point camera at QR code...</p>
            <div class="scanning-text">
                <i class="fas fa-search"></i> Scanning...
            </div>
        `;
        
        // Add styles for animation
        const style = document.createElement('style');
        style.textContent = `
            .scanner-animation {
                position: relative;
                width: 200px;
                height: 200px;
                margin: 0 auto 1rem;
                border: 2px dashed #3b82f6;
                border-radius: 12px;
                overflow: hidden;
            }
            .scanner-line {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #3b82f6, transparent);
                animation: scan 2s linear infinite;
            }
            @keyframes scan {
                0% { top: 0; }
                100% { top: 100%; }
            }
            .scanning-text {
                margin-top: 1rem;
                color: #3b82f6;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
        
        // Simulate QR detection after 3 seconds
        setTimeout(() => {
            if (this.scannerActive) {
                this.simulateQRDetection();
            }
        }, 3000);
    }
    
    simulateQRDetection() {
        // Simulate finding a QR code
        const scannerPlaceholder = document.querySelector('.qr-scanner-placeholder');
        if (!scannerPlaceholder) return;
        
        scannerPlaceholder.innerHTML = `
            <div class="scan-success">
                <i class="fas fa-check-circle" style="color: #10b981; font-size: 3rem;"></i>
                <h3>QR Code Detected!</h3>
                <p>Aadhaar: 123456789012</p>
                <button class="btn primary" onclick="useScannedQR()">
                    <i class="fas fa-check"></i> Use This Data
                </button>
            </div>
        `;
    }
}

// Global scanner instance
const qrScanner = new SimpleQRScanner();

// Open QR scanner from emergency page
function openQRScanner() {
    qrScanner.open();
}

// Close QR scanner
function closeQRScanner() {
    qrScanner.close();
}

// Use the scanned QR data
function useScannedQR() {
    // Auto-fill the Aadhaar field
    document.getElementById('aadhaarInput').value = '123456789012';
    
    // Close scanner
    closeQRScanner();
    
    // Show success message
    showAlert('QR code scanned successfully! Medical data loading...', 'success');
    
    // Auto-fetch patient data after a delay
    setTimeout(() => {
        fetchPatientData();
    }, 1000);
}

// Process uploaded QR image
document.addEventListener('DOMContentLoaded', function() {
    const qrUpload = document.getElementById('qrUpload');
    if (qrUpload) {
        qrUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Simulate processing
                showAlert('Processing QR image...', 'info');
                
                setTimeout(() => {
                    // Always return the demo Aadhaar
                    document.getElementById('aadhaarInput').value = '123456789012';
                    showAlert('QR image processed successfully!', 'success');
                    fetchPatientData();
                }, 1500);
            }
        });
    }
});

// For form page QR scanner
function openFormQRScanner() {
    showAlert('QR Scanner would open here. For demo, enter Aadhaar manually.', 'info');
}