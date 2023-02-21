import { EntityIndex } from "@latticexyz/recs";
import { useCallback } from "react";
import { useWandererContext } from "../../contexts/WandererContext";
import { useMUD } from "../MUDContext";

export enum EquipmentAction {
  UNEQUIP,
  EQUIP,
}

export const useChangeCycleEquipment = () => {
  const { world, systems } = useMUD();
  const { selectedWandererEntity } = useWandererContext();

  return useCallback(
    async (action: EquipmentAction, equipmentSlot: EntityIndex, equipmentEntity: EntityIndex) => {
      if (!selectedWandererEntity) {
        throw new Error("No wanderer entity is selected");
      }
      const selectedWandererEntityId = world.entities[selectedWandererEntity];
      const equipmentSlotId = world.entities[equipmentSlot];
      const equipmentEntityId = world.entities[equipmentEntity];
      const tx = await systems["system.CycleEquipment"].executeTyped(
        action,
        selectedWandererEntityId,
        equipmentSlotId,
        equipmentEntityId
      );
      await tx.wait();
    },
    [world, systems, selectedWandererEntity]
  );
};
