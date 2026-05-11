:: ============================================================
:: Employee Task Management System — Quick Start Script
:: Run this AFTER pasting your Atlas URI into server/.env
:: ============================================================

@echo off
echo.
echo =============================================
echo   Employee Task Management — MERN Startup
echo =============================================
echo.

:: --- Step 1: Install backend dependencies ---
echo [1/3] Installing backend packages...
cd /d "d:\private\me website\employee-task-management\server"
npm install

:: --- Step 2: Seed admin account ---
echo.
echo [2/3] Seeding admin account...
node utils/seedAdmin.js

:: --- Step 3: Start backend ---
echo.
echo [3/3] Starting backend server...
echo.
echo Backend: http://localhost:5000
echo Admin login: admin@taskmanager.com / Admin@123
echo.
npm run dev
