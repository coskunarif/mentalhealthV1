@echo off
setlocal enabledelayedexpansion

:: Set console colors
set "INFO=[36m[INFO][0m"
set "SUCCESS=[32m[SUCCESS][0m"
set "ERROR=[31m[ERROR][0m"
set "WARN=[33m[WARNING][0m"

echo %INFO% Starting direct-to-device deployment process...

:: Step 1: Clear all caches
echo %INFO% Clearing Metro bundler and Expo caches...
if exist "node_modules\.cache" (
  rmdir /s /q node_modules\.cache
  if %ERRORLEVEL% neq 0 (
    echo %ERROR% Failed to clear node_modules\.cache
  ) else (
    echo %SUCCESS% Cache cleared successfully
  )
) else (
  echo %WARN% Cache directory not found, skipping
)

:: Step 2: Run TypeScript syntax check
echo %INFO% Running TypeScript syntax check...
call npx tsc --noEmit
if %ERRORLEVEL% neq 0 (
  echo %ERROR% TypeScript check failed. Please fix type errors before continuing.
  set /p continue_anyway="Continue anyway? (y/n): "
  if /i not "!continue_anyway!"=="y" (
    echo %INFO% Aborting deployment due to TypeScript errors.
    exit /b 1
  )
) else (
  echo %SUCCESS% TypeScript check passed
)

:: Step 3: Run Firebase Symlinks script
echo %INFO% Running Firebase Symlinks script...
node firebase-symlinks.js
if %ERRORLEVEL% neq 0 (
  echo %ERROR% Failed to run Firebase Symlinks script
  exit /b 1
) else (
  echo %SUCCESS% Firebase Symlinks script executed successfully
)

:: Step 4: Run Fix Exports script
echo %INFO% Running Fix Exports script...
node fix-exports.js
if %ERRORLEVEL% neq 0 (
  echo %ERROR% Failed to run Fix Exports script
  exit /b 1
) else (
  echo %SUCCESS% Fix Exports script executed successfully
)

:: Handle custom config properly
set "CONFIG_PARAM="
if exist "rn-config-override.js" (
  set "CONFIG_PARAM=--config-file ./rn-config-override.js"
  echo %INFO% Using custom config from rn-config-override.js
)

:: Check if we should build a development client
set /p build_dev_client="Build development client for direct device installation? (y/n): "
if /i "%build_dev_client%"=="y" (
  echo %INFO% Building development client for Android...
  call npx expo prebuild --platform android --clean
  if %ERRORLEVEL% neq 0 (
    echo %ERROR% Failed to prepare Android build
    exit /b 1
  )
  
  call npx eas build --platform android --profile development --local
  if %ERRORLEVEL% neq 0 (
    echo %ERROR% Failed to build Android development client
    exit /b 1
  )
  
  echo %INFO% Installing to connected device...
  echo %INFO% Please make sure your device is connected via USB and USB debugging is enabled
  for /f %%f in ('dir /b /s *.apk') do (
    echo %INFO% Installing %%f to device...
    call adb install "%%f"
    if %ERRORLEVEL% neq 0 (
      echo %ERROR% Failed to install APK to device
      echo %ERROR% Make sure USB debugging is enabled and device is connected
      exit /b 1
    ) else (
      echo %SUCCESS% APK installed to device successfully
    )
  )
)

:: Start the development server with the correct config
echo %INFO% Starting development server for direct device connection...
if defined CONFIG_PARAM (
  call npx expo start --clear %CONFIG_PARAM%
) else (
  call npx expo start --clear
)

echo %SUCCESS% Process complete!
endlocal