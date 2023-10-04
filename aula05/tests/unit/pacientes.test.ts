import { faker } from "@faker-js/faker";
import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => {
  return {
    v4: () => { return "valor simulado no mock!" }
  }
});

describe("generate protocols for pacients unit tests", () => {
  it("should generate a protocol for pacient", () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const priority = faker.datatype.boolean();
    
    const protocol = generateProtocolForPacient(firstName, lastName, priority);
    expect(protocol).toEqual({
      priority,
      pacient: `${firstName} ${lastName}`,
      protocol: "valor simulado no mock!",
      date: expect.any(Date)
    });
  });
});