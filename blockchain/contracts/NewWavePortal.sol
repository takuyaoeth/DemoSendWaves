// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract NewWavePortal {
    uint256 totalWaves;

    // フロント側にイベントを発行
    event NewWave(address indexed from, uint256 timestamp, string message);

    // 構造体 senderのアドレス、メッセージ、waveをした日時を格納
    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    // 変数宣言
    Wave[] waves;

    constructor() {
        console.log("I AM SMART CONTRACT. POG.");
    }

    // waveすると同時にメッセージを送る
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        // 変数へ情報を格納
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // フロント側へ送信
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // 格納したwaves情報を全取得
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        // Optional: Add this line if you want to see the contract print the value!
        // We'll also print it over in run.js as well.
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}