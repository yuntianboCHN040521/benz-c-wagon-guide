@echo off
rem ============================================================
rem  Mercedes-Benz C-Class Estate Database - local preview
rem  Double-click this file to serve the site and open it.
rem  Close this window to stop the server.
rem ============================================================
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo.
  echo   [X] Python not found in PATH.
  echo.
  echo   You can still use the site without a server:
  echo   just double-click  index.html
  echo.
  pause
  exit /b 1
)

echo.
echo   Serving:  %CD%
echo   URL:      http://127.0.0.1:8099/
echo.
echo   Opening browser in a moment... (close this window to stop)
echo.

start /b "" cmd /c "ping -n 3 127.0.0.1 >nul & start "" http://127.0.0.1:8099/"
python -m http.server 8099 --bind 127.0.0.1

echo.
echo   Server stopped.
pause
