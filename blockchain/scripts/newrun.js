const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("NewWavePortal");
    
    // NewWavePortal.solをデプロイ
    const waveContract = await waveContractFactory.deploy();
    
    // デプロイを待つ
    await waveContract.deployed();
    console.log("Contract addy:", waveContract.address);
  
    // waveを取得
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
  
    // メッセージとともにwaveを登録
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait(); // トランザクションが完了するのを待つ
  
    // 新たなユーザーを取得し、再度メッセージを登録
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    await waveTxn.wait(); // トランザクションが完了するのを待つ
    
    // 全wave情報を取得
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();