# UML: Adressabgleich Pfau GBGS

Diese Datei enthaelt die aktualisierten UML-/Mermaid-Diagramme fuer den Use Case `Adressabgleich Pfau GBGS`.

## Use Case Diagramm

```mermaid
flowchart LR
  User["PTI Nutzer"]
  Pfau["Pfau Bautranchensicht"]
  ProcessMenu["Prozess-Dropdown"]
  Wfmt["WFMT-Auftrag"]
  GbgsFunctions["GBGS-Funktionen"]
  AreaWizard["Gebietsdaten erfassen"]
  IdRules["Gebiets-ID-Regeln"]
  KlsWizard["KLS-BT-Liste vorschlagen"]
  Pst["PST erzeugt echte Liste 1"]
  Reconcile["Adressabgleich Pfau GBGS"]
  Vvm["VVM-ONGOING"]

  User --> Pfau
  Pfau --> ProcessMenu
  ProcessMenu --> Wfmt
  Wfmt -->|"erzeugt"| GbgsFunctions
  ProcessMenu --> GbgsFunctions
  GbgsFunctions --> AreaWizard
  AreaWizard --> IdRules
  GbgsFunctions --> KlsWizard
  KlsWizard --> Pst
  AreaWizard --> Reconcile
  Pst --> Reconcile
  Reconcile --> Vvm
```

## Aktivitaetsdiagramm: Einstieg und Funktionsauswahl

```mermaid
flowchart TD
  A["Bautranche in Pfau geoeffnet"] --> B["Prozessstatus laden"]
  B --> C{"WFMT-Auftrag erzeugt?"}
  C -- "Nein" --> D["GBGS-Funktionen deaktiviert/grau anzeigen"]
  D --> E["Nutzer erzeugt WFMT-Auftrag"]
  E --> B
  C -- "Ja" --> F["GBGS-Funktionen aktiv anzeigen"]
  F --> G["Nutzer waehlt GBGS-Funktionen"]
  G --> H{"Teilfunktion auswaehlen"}
  H -- "Gebietsdaten" --> I["Gebietsdaten-Wizard starten"]
  H -- "KLS-BT-Liste" --> J["KLS-BT-Listen-Wizard starten"]
```

## Aktivitaetsdiagramm: Gebietsdaten

```mermaid
flowchart TD
  A["Gebietsdaten-Wizard gestartet"] --> B["Ausbautreiber waehlen"]
  B --> C["Kontextsensitive ID-Regel anzeigen"]
  C --> D["Gebiets-ID eingeben"]
  D --> E{"Frontend-Format gueltig?"}
  E -- "Nein" --> F["Feldfehler mit Regelhinweis anzeigen"]
  F --> D
  E -- "Ja" --> G["Termine eingeben"]
  G --> H{"Termine plausibel?"}
  H -- "Nein" --> I["Terminfehler anzeigen"]
  I --> G
  H -- "Ja" --> J["Speichern ausloesen"]
  J --> K["Backend validiert Gebiets-ID"]
  K --> L{"Backend gueltig?"}
  L -- "Nein" --> M["Speichern ablehnen"]
  M --> D
  L -- "Ja" --> N["Gebietsdaten speichern"]
  N --> O["Erfolg anzeigen"]
```

## Aktivitaetsdiagramm: KLS-BT-Liste

```mermaid
flowchart TD
  A["KLS-BT-Listen-Wizard gestartet"] --> B["Bautranche ermitteln"]
  B --> C["KLS aus Bautranche laden"]
  C --> D{"KLS vorhanden?"}
  D -- "Nein" --> E["Leere Liste mit Hinweis anzeigen"]
  D -- "Ja" --> F["KLS-BT-Liste anzeigen"]
  F --> G{"Nutzeraktion"}
  G -- "Export" --> H["CSV/XLSX erzeugen"]
  G -- "PST bereitstellen" --> I["Uebergabe an PST vorbereiten"]
  H --> J["Aktion protokollieren"]
  I --> J
```

## Sequenzdiagramm: Prozess-Dropdown

```mermaid
sequenceDiagram
  actor User as PTI Nutzer
  participant UI as Pfau UI
  participant PROC as Prozessstatus API

  User->>UI: Oeffnet Bautranche
  UI->>PROC: GET /process-state
  PROC-->>UI: wfmtOrderCreated, gbgsFunctionsEnabled
  alt WFMT-Auftrag fehlt
    UI-->>User: GBGS-Funktionen deaktiviert anzeigen
  else WFMT-Auftrag vorhanden
    UI-->>User: GBGS-Funktionen aktiv anzeigen
  end
```

## Sequenzdiagramm: Gebietsdaten speichern

```mermaid
sequenceDiagram
  actor User as PTI Nutzer
  participant UI as Pfau UI
  participant VAL as Gebiets-ID Validator
  participant API as GBGS-Funktionen API
  participant DB as Pfau Persistenz

  User->>UI: Waehlt Gebietsdaten erfassen
  UI-->>User: Zeigt reduzierte Felder
  User->>UI: Waehlt Ausbautreiber
  UI-->>User: Zeigt passende Bildungsregel
  User->>UI: Gibt Gebiets-ID und Termine ein
  UI->>VAL: validate(areaType, gebietsId)
  VAL-->>UI: valid/invalid
  alt ungueltig
    UI-->>User: Feldfehler anzeigen
  else gueltig
    UI->>API: POST /area-data
    API->>VAL: validate(areaType, gebietsId)
    VAL-->>API: valid
    API->>DB: save(areaData)
    DB-->>API: saved
    API-->>UI: Erfolg
    UI-->>User: Speichern bestaetigen
  end
```

## Sequenzdiagramm: KLS-BT-Liste

```mermaid
sequenceDiagram
  actor User as PTI Nutzer
  participant UI as Pfau UI
  participant API as GBGS-Funktionen API
  participant KLS as Bautranchen/KLS Service
  participant AUD as Audit Log
  participant PST as PST

  User->>UI: Waehlt KLS-BT-Liste fuer PST
  UI->>API: GET /kls-list
  API->>KLS: getKlsForBautranche(bautrancheId)
  KLS-->>API: KLS-Liste
  API-->>UI: KLS-BT-Listenvorschlag
  UI-->>User: Liste anzeigen
  User->>UI: Exportieren/Bereitstellen
  UI->>API: createKlsBtListArtifact()
  API->>AUD: log action
  opt PST-Schnittstelle vorhanden
    API->>PST: provideKlsBtList()
    PST-->>API: accepted
  end
  API-->>UI: Ergebnis
```

## Komponentendiagramm

```mermaid
flowchart TB
  subgraph Frontend["Pfau Frontend"]
    PD["Prozess-Dropdown"]
    DIS["Disabled State GBGS-Funktionen"]
    MOD["GBGS-Funktionen Dialog"]
    AREA["Gebietsdaten-Wizard"]
    RULE["Kontextsensitive ID-Regeln"]
    KLSUI["KLS-BT-Listen-Wizard"]
  end

  subgraph Backend["Pfau Backend"]
    PROC["Prozessstatus API"]
    FAPI["GBGS-Funktionen API"]
    VALID["Gebiets-ID Validator"]
    DATA["Gebietsdaten Persistenz"]
    KLSAPI["Bautranchen/KLS API"]
    EXPORT["Export/Bereitstellung"]
    AUD["Audit Logging"]
  end

  subgraph External["Umsysteme"]
    WFMT["WFMT"]
    PST["PST"]
    GBGS["GBGS"]
  end

  PD --> PROC
  PROC --> WFMT
  PROC --> DIS
  PD --> MOD
  MOD --> AREA
  AREA --> RULE
  RULE --> VALID
  AREA --> FAPI
  FAPI --> DATA
  MOD --> KLSUI
  KLSUI --> KLSAPI
  KLSAPI --> EXPORT
  EXPORT --> PST
  FAPI --> AUD
  EXPORT --> AUD
  FAPI --> GBGS
```

## Statusmodell

```mermaid
stateDiagram-v2
  [*] --> WFMT_FEHLT
  WFMT_FEHLT: GBGS-Funktionen deaktiviert
  WFMT_FEHLT --> WFMT_ERZEUGT: WFMT-Auftrag erzeugt
  WFMT_ERZEUGT: GBGS-Funktionen aktiv
  WFMT_ERZEUGT --> GEBIETSDATEN_ERFASST: Gebietsdaten gespeichert
  GEBIETSDATEN_ERFASST --> KLS_LISTE_ERSTELLT: KLS-BT-Liste exportiert/bereitgestellt
  KLS_LISTE_ERSTELLT --> ADRESSABGLEICH_BEREIT: Input fuer Adressabgleich vorhanden
  ADRESSABGLEICH_BEREIT --> [*]
```
