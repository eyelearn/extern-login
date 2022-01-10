import { SignJWT, importPKCS8 } from "https://deno.land/x/jose@v4.3.8/index.ts";

/**
 * Partner ID ist eine Zahl die von eyelearn mitgeteilt wird
 */
const PARTNER_ID = 42;

/**
 * Das Zertifikat muss ein valides Zertifikat sein
 */
const PRIVATE_KEY = await importPKCS8(
  await Deno.readTextFile("./private_unencrypted.pem"),
  "RS512"
);

async function genJWT(
  payload: any,
  type: "login" | "register"
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({
      alg: "RS512",
    })
    .setIssuedAt()
    .setExpirationTime("10min")
    .setIssuer(PARTNER_ID.toString())
    .setSubject(type)
    .setAudience("eyesee.eyeLearn.at")
    .sign(PRIVATE_KEY);
}

/**
 *
 * @param nutzer_id Eineindeutige Nutzerzuordnung
 * @param targetURL Ziel URL
 * @returns Fertige URL
 */
export async function login(
  nutzer_id: string,
  targetURL: string = "https://eyesee.eyelearn.at/"
) {
  return handleURL(targetURL, await genJWT({ nutzer_id }, "login"));
}

/**
 *
 * @param nutzer_id Eineindeutige Nutzerzuordnung
 * @param extraData Zusätzliche Registrierungsdaten
 * @param targetURL Ziel URL
 * @returns Fertige URL
 */
export async function register(
  nutzer_id: string,
  extraData: RegisterData,
  targetURL: string = "https://eyesee.eyelearn.at/"
) {
  return handleURL(
    targetURL,
    await genJWT({ nutzer_id, ...extraData }, "login")
  );
}

interface RegisterData {
  vorname: string;
  nachname: string;
  strasse: string; //incl. Hausnummer
  plz: string;
  ort: string;
  land: string;
}

function handleURL(targetURL: string, jwt: string) {
  const url = new URL(targetURL);

  if (url.search.length > 0) {
    return targetURL + "&externaltoken=" + jwt;
  }

  return targetURL + "?externaltoken=" + jwt;
}
