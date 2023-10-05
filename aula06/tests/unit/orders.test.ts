import * as orderService from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";
import { faker } from "@faker-js/faker";

type OrderMockData = {
  protocol: string,
  status: string
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const order: OrderInput = {
      client: faker.person.firstName(),
      description: faker.commerce.productDescription()
    };

    const protocol = "fake protocol";

    jest.spyOn(orderRepository, "create").mockImplementationOnce((): any => {
      return {
        protocol,
        status: "IN_PREPARATION"
      }
    });

    const createdOrder = await orderService.createOrder(order);

    expect(orderRepository.create).toBeCalledWith(order);
    expect(createdOrder).toEqual({
      protocol,
      status: "IN_PREPARATION"
    });
  });

  it("should return an order based on the protocol", async () => {
    const mockData: OrderMockData = {
      protocol: new Date().getTime().toString(),
      status: "IN_PREPARATION"
    }

    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => {
      return mockData
    });

    const returnedOrder = await orderService.getOrderByProtocol(mockData.protocol);

    expect(orderRepository.getByProtocol).toBeCalledWith(mockData.protocol);
    expect(returnedOrder).toEqual(mockData);
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    const invalidProtocol = new Date("2025-01-01").getTime().toString();

    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => {
      return null // prisma default return for resource not found
    });

    const returnedOrder = await orderService.getOrderByProtocol(invalidProtocol);

    expect(orderRepository.getByProtocol).toBeCalledWith(invalidProtocol);
    expect(returnedOrder).toEqual({
      protocol: invalidProtocol,
      status: "INVALID"
    });
  });
});