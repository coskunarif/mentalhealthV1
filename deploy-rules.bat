@echo off
echo Deploying Firestore security rules...
firebase deploy --only firestore:rules
echo Rules deployment complete.
