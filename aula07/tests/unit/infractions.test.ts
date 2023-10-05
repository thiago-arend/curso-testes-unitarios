import { generateInfractionsForUserMock, generateUserMock, generateUserWithNInfractions } from "../integration/factories/user-infractions-factory";
import * as infractionsRepository from "../../src/infractions-repository";
import * as usersRepository from "../../src/users-repository";
import * as infractionsService from "../../src/infractions-service";

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    const userMock = generateUserMock();
    const userInfracMoc = generateInfractionsForUserMock(3, userMock.id);

    jest.spyOn(usersRepository, "getUserByDocument").mockImplementationOnce((): any => {
      return userMock
    });

    jest.spyOn(infractionsRepository, "getInfractionsFrom").mockImplementationOnce((): any => {
      return userInfracMoc
    });

    const userInfractions = await infractionsService.getInfractionsFrom(userMock.licenseId);

    expect(infractionsRepository.getInfractionsFrom).toBeCalledWith(userMock.id);
    expect(userInfractions).toEqual({ ...userMock, infractions: userInfracMoc });
  });

  it("should throw an error when driver license does not exists", () => {
    const licenceIdMock = "doesn't matter";

    jest.spyOn(usersRepository, "getUserByDocument").mockImplementationOnce((): any => {
      return null // user not found
    });

    const promiseToBeRejected = infractionsService.getInfractionsFrom(licenceIdMock);

    expect(usersRepository.getUserByDocument).toBeCalledWith(licenceIdMock);
    expect(promiseToBeRejected).rejects.toEqual({ type: "NOT_FOUND", message: "Driver not found." });
  });

});
