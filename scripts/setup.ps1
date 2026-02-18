# VenciTrack - Professional Setup Script (PowerShell)
Write-Host "VenciTrack - Professional Setup Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env already exists
$envExists = Test-Path ".env"
$regenerate = $false

if ($envExists) {
    Write-Host "Warning: .env file already exists." -ForegroundColor Yellow
    $response = Read-Host "Do you want to regenerate it? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        Remove-Item ".env"
        $regenerate = $true
    }
    else {
        Write-Host "Using existing .env file" -ForegroundColor Green
    }
}
else {
    $regenerate = $true
}

# Generate .env from template if needed
if ($regenerate) {
    Write-Host "Generating secure environment variables..." -ForegroundColor Cyan
    
    # Generate secure random values
    $POSTGRES_PASSWORD = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
    $NEXTAUTH_SECRET = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object { [char]$_ })
    
    # Create .env file content
    $envContent = @"
# --- VenciTrack Environment Configuration (AUTO-GENERATED) ---
# Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

# Database Configuration
POSTGRES_USER="vencitrack_admin"
POSTGRES_PASSWORD="$POSTGRES_PASSWORD"
POSTGRES_DB="vencitrack_db"
POSTGRES_HOST="localhost"
POSTGRES_PORT=5434

# Authentication Security
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
NEXTAUTH_URL="http://localhost:3002"
PORT=3001
"@

    # Write file with explicit encoding
    [System.IO.File]::WriteAllText("$PWD\.env", $envContent, [System.Text.Encoding]::UTF8)

    Write-Host ""
    Write-Host ".env file created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Generated Credentials (DB):" -ForegroundColor Cyan
    Write-Host "------------------------------------------" -ForegroundColor Gray
    Write-Host "Database User:     vencitrack_admin" -ForegroundColor White
    Write-Host "Database Password: $POSTGRES_PASSWORD" -ForegroundColor White
    Write-Host "NextAuth Secret:   $NEXTAUTH_SECRET" -ForegroundColor White
    Write-Host "------------------------------------------" -ForegroundColor Gray
    Write-Host ""
}

# Start Docker containers
Write-Host "Starting Docker containers..." -ForegroundColor Cyan
docker-compose up -d --build

Write-Host ""
Write-Host "VenciTrack startup initiated!" -ForegroundColor Green
Write-Host "Check status: docker-compose ps" -ForegroundColor White
Write-Host "View logs:    docker-compose logs -f" -ForegroundColor White
Write-Host "Access app:   http://localhost:3002" -ForegroundColor White
