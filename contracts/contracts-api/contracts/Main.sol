// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Main{

    struct User{
        string walletId;
        mapping(string => string) files;
    }
    
    User user;
    
    function setContentId(string memory fileId, string memory cid) public  returns (string memory) {
        user.files[fileId] = cid;
        return "success";
    }
    
    function getContentId(string memory fileId) public view returns (string memory) {
        return user.files[fileId];
    }
    
    function setUser(string memory walletId) public {
        user.walletId = walletId;
    }
    
    function getUser() public view returns (string memory) {
        return user.walletId;
    }
}
