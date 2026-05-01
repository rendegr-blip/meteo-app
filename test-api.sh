#!/bin/bash
# Script de test de l'API meteorologique

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="http://localhost:3001/api/weather"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Tests de l'API Meteo${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Test 1: Paris
echo -e "${GREEN}Test 1: Récupérer la météo de Paris${NC}"
curl -s "${API_URL}/Paris" | jq .
echo ""

# Test 2: London
echo -e "${GREEN}Test 2: Récupérer la météo de London${NC}"
curl -s "${API_URL}/London" | jq .
echo ""

# Test 3: New York
echo -e "${GREEN}Test 3: Récupérer la météo de New York${NC}"
curl -s "${API_URL}/New York" | jq .
echo ""

# Test 4: Ville inexistante
echo -e "${YELLOW}Test 4: Ville inexistante (test d'erreur)${NC}"
curl -s "${API_URL}/XyzInvalidCity123" | jq .
echo ""

echo -e "${YELLOW}========================================${NC}"
echo -e "${GREEN}Tests terminés!${NC}"
echo -e "${YELLOW}========================================${NC}"
