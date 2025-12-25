import { InMemoryCustomerRepo } from "../src/adapters/InMemoryCustomerRepo";
import { EarnPoints } from "../src/usecases/earnPoints";
import { RedeemPoints } from "../src/usecases/redeemPoints";

describe("Customer Loyalty Points", () => {
  let repo: InMemoryCustomerRepo;

  beforeEach(() => {
    repo = new InMemoryCustomerRepo();
  });

  test("should add points to a new customer", () => {
    const earn = new EarnPoints(repo);
    earn.run("user123", 100);

    const customer = repo.getById("user123");
    expect(customer).toBeDefined();
    expect(customer!.getPoints()).toBe(100);
  });

  test("should accumulate points when earned multiple times", () => {
    const earn = new EarnPoints(repo);
    earn.run("user123", 50);
    earn.run("user123", 30);

    const customer = repo.getById("user123");
    expect(customer).toBeDefined();
    expect(customer!.getPoints()).toBe(80);
  });

  test("should redeem points from existing customer", () => {
    const earn = new EarnPoints(repo);
    const redeem = new RedeemPoints(repo);

    earn.run("user123", 100);
    const result = redeem.run("user123", 40);

    expect(result).toBeNull();
    const customer = repo.getById("user123");
    expect(customer).toBeDefined();
    expect(customer!.getPoints()).toBe(60);
  });

  test("should not allow redeeming more points than available", () => {
    const earn = new EarnPoints(repo);
    const redeem = new RedeemPoints(repo);

    earn.run("user123", 50);
    const result = redeem.run("user123", 100);

    expect(result).toBe("Not enough points");

    const customer = repo.getById("user123");
    expect(customer).toBeDefined();
    expect(customer!.getPoints()).toBe(50);
  });

  test("should trigger low balance warning when points < 10", () => {
    const earn = new EarnPoints(repo);
    const redeem = new RedeemPoints(repo);

    earn.run("user123", 50);
    const result = redeem.run("user123", 45);

    expect(result).toBe(
      "Warning: Customer user123 has low balance (5) points."
    );

    const customer = repo.getById("user123");

    expect(customer).toBeDefined();
    expect(customer!.getPoints()).toBe(5);
  });

  test("redeeming all points reduces balance to zero without error", () => {
    const earn = new EarnPoints(repo);
    const redeem = new RedeemPoints(repo);

    earn.run("user123", 10);
    const result = redeem.run("user123", 10);

    expect(result).toBe(
      "Warning: Customer user123 has low balance (0) points."
    );
    const customer = repo.getById("user123");

    expect(customer).toBeDefined();
    expect(customer!.getPoints()).toBe(0);
  });

  test("redeeming points for a non-existing customer returns error", () => {
    const redeem = new RedeemPoints(repo);
    const result = redeem.run("ghostUser", 20);

    expect(result).toBe("Customer not found");
  });

  test("multiple customers have independent balances", () => {
    const earn = new EarnPoints(repo);
    const redeem = new RedeemPoints(repo);

    earn.run("alice", 50);
    earn.run("bob", 30);

    redeem.run("alice", 20);

    const alice = repo.getById("alice");
    const bob = repo.getById("bob");

    expect(alice?.getPoints()).toBe(30);
    expect(bob?.getPoints()).toBe(30);
  });
});
