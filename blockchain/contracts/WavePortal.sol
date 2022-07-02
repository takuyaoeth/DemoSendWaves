// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    mapping(address => uint256) public totalOwnerWaves;
    uint256 totalWaves;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }
    // 関数を呼び出したアカウントを表示
    function wave() public {
        // waveを呼び出すたびに回数がカウントされていく
        totalOwnerWaves[msg.sender] += 1;
        totalWaves += 1;
        //console.log("%s has waved!", msg.sender);
    }
    // waveの合計カウント数を表示
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    // アカウントごとのwaveの合計カウント数を表示
    function getTotalOwnerWaves(address owner) public view returns (uint256) {
        console.log("%s has %d total waves!", owner, totalOwnerWaves[owner]);
        return totalOwnerWaves[owner];
    }
}