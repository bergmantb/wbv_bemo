# 13.8 Komponentendiagramm

```plantuml
@startuml
skinparam componentStyle rectangle
skinparam shadowing false

package "Pfau Frontend" {
  [Prozess-Dropdown] as PD
  [Disabled State\nGBGS-Funktionen] as DIS
  [GBGS-Funktionen Dialog] as MOD
  [Gebietsdaten-Wizard] as AREA
  [Kontextsensitive\nID-Regeln] as RULE
  [KLS-BT-Listen-Wizard] as KLSUI
}

package "Pfau Backend" {
  [Prozessstatus API] as PROC
  [GBGS-Funktionen API] as FAPI
  [Gebiets-ID Validator] as VALID
  database "Gebietsdaten\nPersistenz" as DATA
  [Bautranchen/KLS API] as KLSAPI
  [Export/Bereitstellung] as EXPORT
  [Audit Logging] as AUD
}

package "Umsysteme" {
  [WFMT] as WFMT
  [PST] as PST
  [GBGS] as GBGS
}

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
@enduml
```
