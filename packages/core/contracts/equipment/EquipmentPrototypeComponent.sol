// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import { BoolBareComponent } from "std-contracts/components/BoolBareComponent.sol";

import { entityFromHash } from "@dk1a/solecslib/contracts/utils.sol";

uint256 constant ID = uint256(keccak256("component.EquipmentPrototype"));

/**
 * @dev Equipment protoEntity = hashed(namespace, name)
 */
function getEquipmentProtoEntity(string memory name) pure returns (uint256) {
  return entityFromHash("EquipmentPrototypeComponent", abi.encode(name));
}

contract EquipmentPrototypeComponent is BoolBareComponent {
  constructor(address world) BoolBareComponent(world, ID) {}
}