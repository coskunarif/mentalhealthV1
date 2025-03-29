@echo off
echo ===== Cleaning Project Environment =====
echo.

echo Removing node_modules directory...
if exist node_modules rmdir /s /q node_modules

echo Cleaning npm cache...
call npm cache clean --force

echo Reinstalling dependencies...
call npm install

echo.
echo ===== Running TypeScript Type Checking =====
echo.
call npx tsc --noEmit
if %errorlevel% neq 0 (
    echo Warning: TypeScript errors found. Proceed with caution.
    pause
)

echo.
echo ===== Resetting Metro Bundler Cache =====
echo.
echo Starting Metro bundler with reset cache option. Press Ctrl+C after it starts to continue...
echo.
call npx react-native start --reset-cache

echo.
echo ===== Rebuilding Firebase Functions =====
echo.
cd firebase\functions
if exist lib rmdir /s /q lib
call npm run build

echo.
echo ===== Deploying Firebase Functions =====
echo.
cd ..
call firebase deploy --only functions

echo.
echo ===== Deploying Firestore Rules and Indexes =====
echo.
call firebase deploy --only firestore:rules,firestore:indexes
cd ..

echo.
echo ===== Starting Expo Development Server =====
echo.
call npx expo start --clear

pause