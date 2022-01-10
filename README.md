# External Login
Wir haben in diesem Reposetory Beispiel Code für PHP und Deno (hier mit Typescript) diese können sofern andere Sprachen / Frameworks benutzt werden leicht adaptiert werden da es jeweils unter 100 Code Zeilen sind. Für jede Sprache haben wir eine eigene Readme mit informationen zu den benutzen Bibliotheken. Eine Allgemeine erklärung zur Schlüsselerzeugung ist hier zu finden.

## Schlüsselerzeugung mit OpenSSL
Wir benötigen ein min. 2048 Bit schlüsselpaar. Diese anleitung nimmt an, dass openSSL installiert ist und per Komandozeile ausgeführt werden kann.

Der Private Schlüssel ist sicher zu verwahren und NICHT in ein Versionskontrollsystem wie Git zu speichern. Der public key ist uns als pem Datei zu übermitteln.

```sh
# Generiere Key
openssl genrsa -des3 -out private.pem 2048

# Erzeuge PEM Datei für privaten Schlüssel
openssl rsa -in private.pem -out private_unencrypted.pem -outform PEM

# Erzeuge PEM Datei für öffentlichen Schlüssel
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

## JWT Bibliothek
Um gute JWT Bibliotheken zu finden hilft https://jwt.io/libraries .

## API
In jedem Fall hat man am Ende 2 funktionen die man Aufrufen kann in dem folgendem Format

```ts
function login(nutzer_id: string, target_url?: string): string
function register(nutzer_id: string, extra_data: any, target_url?: string): string
```

in `extra_data` müssen folgende Felder vorhanden sein:

1. vorname
1. nachname
1. strasse
1. plz
1. ort
1. land

Weitere Daten sind nicht vorgesehen.