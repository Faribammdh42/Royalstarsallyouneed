#!/bin/bash

echo "🚀 Starting fullstack APK build..."

# Clean up space
echo "🧹 Cleaning up disk space..."
rm -rf .next/cache
rm -rf node_modules/.cache
npm cache clean --force

# Install minimal dependencies
echo "📦 Installing Firebase..."
npm install firebase --no-save

# Build Next.js app
echo "🔨 Building Next.js app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Next.js build successful"
    
    # Check if out directory exists
    if [ -d "out" ]; then
        echo "📱 Preparing Android build..."
        
        # Copy built files to android assets
        mkdir -p android/app/src/main/assets/public
        cp -r out/* android/app/src/main/assets/public/
        
        # Build APK
        echo "🔧 Building APK..."
        cd android
        chmod +x gradlew
        ./gradlew assembleRelease
        
        if [ $? -eq 0 ]; then
            echo "✅ APK build successful!"
            echo "📦 APK location: android/app/build/outputs/apk/release/"
            ls -la app/build/outputs/apk/release/
        else
            echo "❌ APK build failed"
        fi
    else
        echo "❌ Next.js build output not found"
    fi
else
    echo "❌ Next.js build failed"
fi