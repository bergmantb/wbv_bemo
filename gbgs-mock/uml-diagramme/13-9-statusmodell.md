# Statusmodell

Quelle: Kapitel 13 Solutiondesign `Adressabgleich Pfau GBGS`.

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
