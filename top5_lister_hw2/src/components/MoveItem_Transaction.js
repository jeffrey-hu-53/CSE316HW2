import jsTPS_Transaction from './jsTPS.js';
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(initApp, initOld, initNew) {
        super();
        this.app = initApp;
        this.oldItemIndex = initOld;
        this.newItemIndex = initNew;
    }

    doTransaction() {
        this.app.swapItems(this.oldItemIndex, this.newItemIndex);
    }
    
    undoTransaction() {
        this.app.swapItems(this.newItemIndex, this.oldItemIndex);
    }
}