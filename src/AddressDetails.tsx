import { addressId, type Address } from "@locio-au/react";

/**
 * What came back, laid out plainly.
 *
 * The point of the panel is to show which field you would actually store:
 * the id, not the formatted line, which changes whenever the register tidies
 * its punctuation.
 *
 * The id is read through addressId rather than off a field, because which
 * field holds it depends on where the address is: an Australian record
 * carries it under G-NAF's own column name as well, and a record from another
 * register carries only `id`.
 */
export function AddressDetails({ address }: { address: Address }) {
  const rows: Array<[string, string | undefined]> = [
    ["id", addressId(address)],
    ["address_detail_pid", address.address_detail_pid],
    ["formatted", address.formatted],
    ["lat, lng", `${address.lat}, ${address.lng}`],
    ["mesh_block", address.mesh_block],
    ["locality", address.locality],
    ["region", address.region],
    ["postcode", address.components?.postcode],
  ];

  return (
    <section className="panel" aria-label="Selected address">
      <h2 className="panel-title">Selected</h2>
      <dl className="rows">
        {rows.map(([key, value]) =>
          value ? (
            <div className="row" key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ) : null,
        )}
      </dl>
    </section>
  );
}
