// TODO: we assume that all cells belong to the same being.
// To make support of multiple beings

interface IWeapon {
    hit(cells: BaseCell[], damage: number);

}

class MuscleWeapon implements IWeapon {
    hit(cells: BaseCell[], damage: number) {
        if (cells.length > 0) {
            var being = cells[0].parentTissue.parentBeing;
            var self = this;
            var damagePerCell = cells.length > 0 ? damage / cells.length : 0;
            cells.forEach((cell) => { self.hitCell(cell, damagePerCell) });

            being.cells.forEach((cell) => { cell.image.alpha = cell.hp / cell.hpMax });
        }
    }

    private hitCell(cell: BaseCell, damage: number) {
        // RECURSION
        var self = this;
        var damageConsumedByCell;
        var damageConsumedByResistance;
        if (damage <= cell.muscleResistance) {
            damageConsumedByResistance = damage;
            damageConsumedByCell = 0;
        }
        else {
            damageConsumedByResistance = cell.muscleResistance;
            if (damage - cell.muscleResistance < cell.hp) damageConsumedByCell = damage;
            else damageConsumedByCell = cell.hp;
        }
        cell.hp -= damageConsumedByCell;
        var damageLeftForTransfer = damage - damageConsumedByCell - damageConsumedByResistance;
        if (damageLeftForTransfer > 0) {
            var neibs = [cell.upNeib, cell.leftNeib, cell.rightNeib, cell.downNeib].filter((neib) => { return !neib.isEmptyCell });
            if (neibs.length > 0) { 
                var damagePerNeib = damageLeftForTransfer / neibs.length;
                neibs.forEach((neib) => {
                    self.hitCell(neib, damagePerNeib);
                });
            }
        }
    }
}

class EnergyWeapon implements IWeapon {
    hit(cells: BaseCell[], damage: number) {
        if (cells.length > 0) {
            var being = cells[0].parentTissue.parentBeing;
            // var totalBeingResistance = ????
            being.cells.forEach((cell) => {
                //console.log(CellTypes[cell.gameType], "cell hp: " + cell.hp);
                if (damage > cell.energyResistance) {
                    if (damage - cell.energyResistance < cell.hp) cell.hp -= damage - cell.energyResistance;
                    else cell.hp = 0;
                }
            });
            being.cells.forEach((cell) => { cell.image.alpha = cell.hp / cell.hpMax; console.log(CellTypes[cell.gameType], cell.hpMax, cell.hp, cell.image.alpha) });
        }
    }

    
}

class ToxicWeapon implements IWeapon {
    hit(cells: BaseCell[], damage: number) { }
}

class CoreWeapon implements IWeapon {
    hit(cells: BaseCell[], damage: number) { }
}

