# Sequenzdiagramm KLS-BT-Liste

Quelle: Kapitel 13 Solutiondesign `Adressabgleich Pfau GBGS`.

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
