# DailyTasks – System zarządzania zadaniami

Aplikacja webowa do zarządzania codziennymi zadaniami. Projekt powstał w ramach nauki React, TypeScript, CSS oraz Node.js.

## Funkcjonalności

- Dodawanie nowych zadań.
- Wyświetlanie listy zadań.
- Oznaczanie zadań jako wykonane.
- Usuwanie zadań.
- Filtrowanie zadań: wszystkie, aktywne i wykonane.
- Pasek postępu pokazujący procent wykonanych zadań.
- Walidacja formularza.
- Zapisywanie zadań w pliku JSON.
- Obsługa błędów i stanu ładowania.

## Technologie

### Frontend
- React
- TypeScript
- CSS
- Vite

### Backend
- Node.js
- Express.js
- JSON jako lokalne przechowywanie danych

### Testy
- Vitest

## Wymagania

- Node.js
- npm
- Git

## Struktura projektu

```text
DailyTasks/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── tasks.json
├── public/
├── src/
│   ├── assets/
│   ├── componets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── Text.tsx
│   ├── taskUtils.ts
│   └── taskUtils.test.ts
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.ts
```

## Instalacja i uruchomienie

### 1. Pobranie projektu

```bash
git clone https://github.com/wariat5719-del/DailyTasks.git
cd DailyTasks
```

### 2. Instalacja frontendu

W głównym folderze projektu:

```bash
npm install
```

### 3. Instalacja backendu

```bash
cd backend
npm install
```

### 4. Uruchomienie backendu

Pozostając w folderze `backend`, uruchom:

```bash
node server.js
```

Backend będzie dostępny pod adresem:

`http://localhost:3001`

### 5. Uruchomienie frontendu

Otwórz drugi terminal i przejdź do głównego folderu projektu:

```bash
cd DailyTasks
npm run dev
```

Frontend będzie dostępny pod adresem:

`http://localhost:5173`

**Uwaga:** Backend i frontend muszą działać jednocześnie w dwóch osobnych terminalach.

## Testy

Aby uruchomić testy:

```bash
npm test
```

Aktualnie projekt zawiera 4 testy sprawdzające:
- filtrowanie aktywnych zadań,
- filtrowanie wykonanych zadań,
- obliczanie postępu,
- obsługę pustej listy zadań.

## Budowanie wersji produkcyjnej

```bash
npm run build
```

Pliki produkcyjne zostaną wygenerowane w folderze `dist`.

## Autor

Mateusz Kozłowski – projekt edukacyjny realizowany w ramach nauki React, TypeScript, CSS i Node.js.