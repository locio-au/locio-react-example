import { useState } from "react";
import { AddressAutocomplete, type Address } from "@locio-au/react";
import { AddressDetails } from "./AddressDetails";

const FIELD_CLASSES = {
  root: "field",
  label: "field-label",
  input: "field-input",
  list: "field-list",
  option: "field-option",
  status: "field-status",
};

export function App({
  publicKey = import.meta.env.VITE_LOCIO_PUBLIC_KEY ?? "",
}: {
  publicKey?: string;
}) {
  const [address, setAddress] = useState<Address | null>(null);

  return (
    <main className="page">
      <header className="head">
        <h1 className="title">Locio address autocomplete</h1>
        <p className="lede">
          A minimal page to try the published package against real G&#8209;NAF data.
          Type a street number and name, then pick one.
        </p>
      </header>

      {publicKey ? (
        <>
          <AddressAutocomplete
            publicKey={publicKey}
            styled={false}
            classNames={FIELD_CLASSES}
            label="Address"
            placeholder="Start typing an address"
            onSelect={setAddress}
          />
          {address ? (
            <AddressDetails address={address} />
          ) : (
            <p className="hint">Nothing picked yet.</p>
          )}
        </>
      ) : (
        <section className="panel" aria-label="Setup">
          <h2 className="panel-title">Set a key first</h2>
          <p className="hint">
            Put a public key in <code>.env.local</code> as{" "}
            <code>VITE_LOCIO_PUBLIC_KEY</code>, then restart the dev server. A public
            key carries an origin allow list, so it is safe in a browser. A secret
            key is not.
          </p>
          <p className="hint">
            <a
              href="https://locio.com.au/account/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              Create one in your account
            </a>
          </p>
        </section>
      )}

      {/* Attribution. Delete this block if you would rather not carry it. */}
      <footer className="foot">
        <p>
          Address search by{" "}
          <a href="https://locio.com.au" target="_blank" rel="noopener noreferrer">
            locio.com.au
          </a>
        </p>
      </footer>
    </main>
  );
}
