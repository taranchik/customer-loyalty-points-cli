import { InMemoryCustomerRepo } from "./adapters/InMemoryCustomerRepo";
import { EarnPoints } from "./usecases/earnPoints";
import { RedeemPoints } from "./usecases/redeemPoints";

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("Usage:");
  console.log("  earn <customerId> <points>");
  console.log("  redeem <customerId> <points>");
  process.exit(1);
}

const [action, customerId, pointsRaw] = args;
const points = Number(pointsRaw);

if (Number.isNaN(points)) {
  console.log("Points must be a number");
  process.exit(1);
}

const repo = new InMemoryCustomerRepo();

if (action === "earn") {
  new EarnPoints(repo).run(customerId, points);
  console.log("Points added");
  process.exit(0);
}

if (action === "redeem") {
  const result = new RedeemPoints(repo).run(customerId, points);
  console.log(result ?? "Redeemed");
  process.exit(0);
}

console.log(`Unknown command: ${action}`);
process.exit(1);
