# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile  // コンパイルをscriptを実行するまえにしておく
npx hardhat clean  // HardhatError: HH700: Artifact for contractが出たら
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

// ローカルブロックチェーンを立ち上げる
npx hardhat node

// ローカルでデプロイ
npx hardhat run scripts/run.js
npx hardhat run scripts/newrun.js

// rinkebyでデプロイ
npx hardhat run scripts/deploy.js --network rinkeby
npx hardhat run scripts/newdeploy.js --network rinkeby

# rinkebyでデプロイしたコントラクトアドレス
WavePortal address:  0x42C77e699f2a9977833412e1ebafB63042b3d77e

