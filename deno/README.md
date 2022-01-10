# Deno beispiel
> Kann für NodeJS leicht adaptiert werden. Wir nutzen die Bibliothek jose für die JWT generierung

Dieser code darf NICHT im Browser ausgeführt werden da dann der private key an den Nutzer ausgegeben wird und dies ein Sicherheitsrisiko ist!

## Run
```sh
deno run --allow-read=private_unencrypted.pem ./test.ts
```

