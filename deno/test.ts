import { login, register } from "./mod.ts";

console.log(await login("abc"));
console.log(
  await register("abc", {
    vorname: "Max",
    nachname: "Mustermann",
    strasse: "Musterweg 42",
    plz: "00000",
    ort: "Beispielhausen",
    land: "Österreich",
  })
);
