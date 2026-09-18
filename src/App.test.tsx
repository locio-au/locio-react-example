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
    expect(screen.getByText("address_detail_pid")).toBeInTheDocument();
    expect(screen.getByText("GAACT714845933")).toBeInTheDocument();
  });

  it("shows the coordinate and the mesh block", () => {
    render(<AddressDetails address={SAMPLE} />);
    expect(screen.getByText(/-35\.2809/)).toBeInTheDocument();
    expect(screen.getByText("80006300000")).toBeInTheDocument();
  });
});
