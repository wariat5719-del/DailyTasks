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

## Struktura projektu

```text
DailyTasks/
├── backend/
│   ├── server.js
│   ├── tasks.json
│   └── package.json
├── src/
│   ├── componets/
│   │   └── TaskItem.tsx
│   ├── taskUtils.ts
│   ├── taskUtils.test.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── public/
├── index.html
├── package.json
└── README.md
```

## Instalacja i uruchomienie

### 1. Pobranie projektu

```bash
git clone https://github.com/wariat5719-del/DailyTasks.git
cd DailyTasks
```

### 2. Instalacja frontendu

```bash
npm install
```

### 3. Instalacja backendu

```bash
cd backend
npm install
```

### 4. Uruchomienie backendu

W folderze `backend`:

```bash
node server.js
```

Backend działa pod adresem:

`http://localhost:3001`

### 5. Uruchomienie frontendu

Otwórz drugi terminal w głównym folderze projektu:

```bash
npm run dev
```

Frontend będzie dostępny pod adresem:

`http://localhost:5173`

## Testy

Uruchomienie testów:

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

Mateusz Kozłowski – nauka React, TypeScript, CSS i Node.js.