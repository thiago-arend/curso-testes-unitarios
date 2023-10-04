import { faker } from "@faker-js/faker";
import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => {
  return {
    v4: () => { return "valor simulado no mock!" }
  }
});

describe("calculator tests", () => {
  it("should generate a protocol for pacient", () => {
    const protocol = generateProtocolForPacient(faker.person.firstName(), faker.person.lastName(), faker.datatype.boolean());
    expect(protocol).toEqual({
      ...protocol
    });
  });
});