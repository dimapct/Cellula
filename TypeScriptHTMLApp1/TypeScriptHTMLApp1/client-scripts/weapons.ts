// TODO: we assume that all cells belong to the same being.
// To make support of multiple beings

class BaseWeapon {
    hit(cells: BaseCell[], damage: number) {}

}

class MuscleWeapon extends BaseWeapon {
    hit(cells: BaseCell[], damage: number) {
        var damagePerCell = cells.length > 0 ? damage / cells.length : 0;
        //cells.forEach((cell) => {
        //    while (damage > 0) {
        //        cell
        //    }
        //});

        cells.forEach((cell) => { cell.image.alpha = cell.hp / cell.hpMax / 100 });
    }


}

class EnergyWeapon extends BaseWeapon {
    hit(cells: BaseCell[], damage: number) {
        if (cells.length > 0) {
            var being = cells[0].parentTissue.parentBeing;
            // var totalBeingResistance = ????
            being.cells.forEach((cell) => {
                console.log(CellTypes[cell.gameType], "cell hp: " + cell.hp);
                if (damage > cell.energyResistance) {
                    if (damage - cell.energyResistance < cell.hp) cell.hp -= damage - cell.energyResistance;
                    else cell.hp = 0;
                }
            });
            //being.cells.forEach((cell) => { cell.image.alpha = cell.hp / (cell.hpMax / 100) });
        }
    }

    
}

class ToxicWeapon extends BaseWeapon {
    hit(cells: BaseCell[], damage: number) { }
}