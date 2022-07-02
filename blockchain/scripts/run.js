const main = async () => {
    // 実行アカウントを取得
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const accounts = await hre.ethers.getSigners();

    // コントラクトがコンパイルされる
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // デプロイする
    const waveContract = await waveContractFactory.deploy();
    // デプロイ後に実行
    await waveContract.deployed();
    // コントラクトアドレスを表示
    console.log("Contract deployed to:", waveContract.address);
    // 実行者のアドレスを表示
    console.log("Contract deployed by:", accounts[0].address);

    // getTotalWaves関数を呼び出す
    let WaveCount;
    // WaveCount = await waveContract.getTotalWaves();

    // 配列数分繰り返す20回
    for (const key in accounts) {
        // 0～20の数字をランダムで生成
        var rand = Math.floor(Math.random() * 20);

        // wave関数を呼び出す（ランダムなアカウントに実行させる）
        let waveTxn = await waveContract.connect(accounts[rand]).wave();

        // 処理を待つ
        await waveTxn.wait();
    }
    for (const key in accounts) {
        // getTotalWaves関数を呼び出す
        WaveCount = await waveContract.getTotalOwnerWaves(accounts[key].address);
    }
};
  
const runMain = async () => {
try {
    await main();
    process.exit(0); // exit Node process without error
} catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
}
// Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();