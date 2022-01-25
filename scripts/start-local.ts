import path from "path";
import concurrently from "concurrently";

async function main() {
  const { result } = concurrently(
    [
      { command: "hardhat node", name: "hardhat-node" },
      { command: "yarn:deploy:localhost", name: "deploy-contracts" },
      {
        command: "yarn:serve",
        name: "catching-app",
        cwd: path.resolve(__dirname, "../catching-app"),
      },
    ],
    {
      killOthers: ["failure"],
    }
  );

  return result;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Something went wrong!");
    process.exit(1);
  });
