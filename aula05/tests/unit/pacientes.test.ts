import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => {
  return {
    v4: () => { return "valor simulado no mock!" }
  }
});

describe("generate protocols for pacients unit tests", () => {
  it("should generate a protocol for pacient", () => {
    const protocol = generateProtocolForPacient("João", "da Silva", true);
    expect(protocol).toEqual({
      ...protocol
    });
  });
});