# --- Configuración de rutas ---
$REPO_DIR = "C:\Users\Administrator\repositories\MentorHub-PF"
$BACKEND_DIR = "$REPO_DIR\back"
$FRONTEND_DIR = "$REPO_DIR\front"

# --- 1. Detener todos los procesos Node existentes ---
Write-Output "=== Deteniendo procesos anteriores ==="
taskkill /F /IM node.exe /T 2> $null

# --- 2. Actualizar repositorio ---
Write-Output "=== Actualizando código desde GitHub ==="
cd $REPO_DIR
git pull origin main

# --- 3. Despliegue del Backend ---
Write-Output "=== Desplegando Backend ==="
cd $BACKEND_DIR

npm install
npm run build

# Iniciar backend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BACKEND_DIR'; npm start" -WindowStyle Minimized
Write-Output "Backend iniciado en http://localhost:3000"

Start-Sleep -Seconds 10

# --- 4. Despliegue del Frontend ---
Write-Output "=== Desplegando Frontend ==="
cd $FRONTEND_DIR

npm install
npm run build

# Iniciar frontend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FRONTEND_DIR'; npm run preview" -WindowStyle Minimized
Write-Output "Frontend iniciado en http://localhost:4173"

# --- Verificación final ---
Write-Output "=== Procesos en ejecución ==="
Get-Process node | Select-Object Id, Path

Write-Output "=== ¡Despliegue completado! ==="