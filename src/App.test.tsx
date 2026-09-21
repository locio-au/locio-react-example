import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { AddressDetails } from "./AddressDetails";
import type { Address } from "@locio-au/react";

const KEY = "lc_pub_exampleonly123456";

describe("the example app", () => {
  it("asks for a key rather than silently searching nothing", () => {
    render(<App publicKey="" />);
    expect(screen.getByText(/VITE_LOCIO_PUBLIC_KEY/)).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("renders a labelled address input once a key is set", () => {
    render(<App publicKey={KEY} />);
    expect(screen.getByRole("combobox", { name: /address/i })).toBeInTheDocument();
  });

  it("shows nothing picked until something is picked", () => {
    render(<App publicKey={KEY} />);
    expect(screen.queryByText(/address_detail_pid/)).not.toBeInTheDocument();
  });

  it("credits locio, and opens it safely in a new tab", () => {
    render(<App publicKey={KEY} />);
    const link = screen.getByRole("link", { name: /locio\.com\.au/i });
    expect(link).toHaveAttribute("href", "https://locio.com.au");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

const SAMPLE: Address = {
  id: "GAACT714845933",
  address_detail_pid: "GAACT714845933",
  formatted: "10 Rudd Street, Canberra ACT 2601",
  lat: -35.2809,
  lng: 149.13,
  mesh_block: "80006300000",
  locality: "Canberra",
  region: "Australian Capital Territory",
  components: { number_first: "10", street_name: "Rudd", street_type: "Street", postcode: "2601" },
};

describe("the details panel", () => {
  it("leads with the id worth storing", () => {
    render(<AddressDetails address={SAMPLE} />);
    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getAllByText("GAACT714845933").length).toBeGreaterThan(0);
  });

  // An address from another country carries `id` and nothing G-NAF publishes,
  // so a panel that only knew the G-NAF name would show a record with no id
  // at all. Australia is the only country with data today, which is exactly
  // when this is easy to get wrong and never notice.
  it("shows the id of an address that is not in G-NAF", () => {
    render(
      <AddressDetails
        address={{
          id: "5f2c1e1a-1f6d-4f7a-9d26-2a1c7f2b9f41",
          country_code: "US",
          formatted: "145 Sydney Road, Columbus OH 43215",
          lat: 39.9578,
          lng: -83.0031,
          locality: "Columbus",
        }}
      />,
    );
    expect(screen.getByText("5f2c1e1a-1f6d-4f7a-9d26-2a1c7f2b9f41")).toBeInTheDocument();
  });

  it("shows the coordinate and the mesh block", () => {
    render(<AddressDetails address={SAMPLE} />);
    expect(screen.getByText(/-35\.2809/)).toBeInTheDocument();
    expect(screen.getByText("80006300000")).toBeInTheDocument();
  });
});
