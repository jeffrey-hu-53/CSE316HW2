import React from 'react';
import './App.css';

// IMPORT DATA MANAGEMENT AND TRANSACTION STUFF
import DBManager from './db/DBManager';

// THESE ARE OUR REACT COMPONENTS
import DeleteModal from './components/DeleteModal';
import Banner from './components/Banner.js'
import Sidebar from './components/Sidebar.js'
import Workspace from './components/Workspace.js';
import Statusbar from './components/Statusbar.js'
import EditToolbar from './components/EditToolbar';
import { traverseTwoPhase } from 'react-dom/test-utils';
import jsTPS from './components/jsTPS.js';
import ChangeItem_Transaction from './components/ChangeItem_Transaction';
import MoveItem_Transaction from './components/MoveItem_Transaction';


class App extends React.Component {
    constructor(props) {
        super(props);

        // added tps stack
        this.tps = new jsTPS();

        // THIS WILL TALK TO LOCAL STORAGE
        this.db = new DBManager();

        // GET THE SESSION DATA FROM OUR DATA MANAGER
        let loadedSessionData = this.db.queryGetSessionData();

        // SETUP THE INITIAL STATE
        this.state = {
            currentList : null,
            sessionData : loadedSessionData,
            currentDelete: null
        }
    }
    sortKeyNamePairsByName = (keyNamePairs) => {
        keyNamePairs.sort((keyPair1, keyPair2) => {
            // GET THE LISTS
            return keyPair1.name.localeCompare(keyPair2.name);
        });
    }
    // THIS FUNCTION BEGINS THE PROCESS OF CREATING A NEW LIST
    createNewList = () => {
        // FIRST FIGURE OUT WHAT THE NEW LIST'S KEY AND NAME WILL BE
        let newKey = this.state.sessionData.nextKey;
        let newName = "Untitled" + newKey;

        // MAKE THE NEW LIST
        let newList = {
            key: newKey,
            name: newName,
            items: ["?", "?", "?", "?", "?"]
        };

        // MAKE THE KEY,NAME OBJECT SO WE CAN KEEP IT IN OUR
        // SESSION DATA SO IT WILL BE IN OUR LIST OF LISTS
        let newKeyNamePair = { "key": newKey, "name": newName };
        let updatedPairs = [...this.state.sessionData.keyNamePairs, newKeyNamePair];
        this.sortKeyNamePairsByName(updatedPairs);

        // CHANGE THE APP STATE SO THAT IT THE CURRENT LIST IS
        // THIS NEW LIST AND UPDATE THE SESSION DATA SO THAT THE
        // NEXT LIST CAN BE MADE AS WELL. NOTE, THIS setState WILL
        // FORCE A CALL TO render, BUT THIS UPDATE IS ASYNCHRONOUS,
        // SO ANY AFTER EFFECTS THAT NEED TO USE THIS UPDATED STATE
        // SHOULD BE DONE VIA ITS CALLBACK
        this.setState(prevState => ({
            currentList: newList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey + 1,
                counter: prevState.sessionData.counter + 1,
                keyNamePairs: updatedPairs
            }
        }), () => {
            // PUTTING THIS NEW LIST IN PERMANENT STORAGE
            // IS AN AFTER EFFECT
            this.db.mutationCreateList(newList);
            this.db.mutationUpdateSessionData(this.state.sessionData);
        });
    }
    renameList = (key, newName) => {
        let newKeyNamePairs = [...this.state.sessionData.keyNamePairs];
        // NOW GO THROUGH THE ARRAY AND FIND THE ONE TO RENAME
        for (let i = 0; i < newKeyNamePairs.length; i++) {
            let pair = newKeyNamePairs[i];
            if (pair.key === key) {
                pair.name = newName;
            }
        }
        this.sortKeyNamePairsByName(newKeyNamePairs);

        // WE MAY HAVE TO RENAME THE currentList
        let currentList = this.state.currentList;
        if (currentList.key === key) {
            currentList.name = newName;
        }

        this.setState(prevState => ({
            currentList: prevState.currentList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey,
                counter: prevState.sessionData.counter,
                keyNamePairs: newKeyNamePairs
            }
        }), () => {
            // AN AFTER EFFECT IS THAT WE NEED TO MAKE SURE
            // THE TRANSACTION STACK IS CLEARED
            let list = this.db.queryGetList(key);
            list.name = newName;
            this.db.mutationUpdateList(list);
            this.db.mutationUpdateSessionData(this.state.sessionData);
        });
    }
    // THIS FUNCTION BEGINS THE PROCESS OF LOADING A LIST FOR EDITING
    loadList = (key) => {
        let newCurrentList = this.db.queryGetList(key);
        this.setState(prevState => ({
            currentList: newCurrentList,
            sessionData: prevState.sessionData
        }), () => {
            // ANY AFTER EFFECTS?
            
            console.log(this.state.currentList)
            console.log("After loading new list, tps size is: "+ this.tps.getSize())
        });
        this.tps.clearAllTransactions();
        
    }
    // THIS FUNCTION BEGINS THE PROCESS OF CLOSING THE CURRENT LIST
    closeCurrentList = () => {
        console.log("made it to closecurrentlist function")
        this.setState(prevState => ({
            currentList: null,
            listKeyPairMarkedForDeletion : prevState.listKeyPairMarkedForDeletion,
            sessionData: this.state.sessionData
        }), () => {
            // ANY AFTER EFFECTS?
            // this.tps.clearAllTransactions();
            console.log("After closing the list, tps size is: "+ this.tps.getSize())
        });
        this.tps.clearAllTransactions();
    }
    deleteList = (listToDelete) => {
        // SOMEHOW YOU ARE GOING TO HAVE TO FIGURE OUT
        // WHICH LIST IT IS THAT THE USER WANTS TO
        // DELETE AND MAKE THAT CONNECTION SO THAT THE
        // NAME PROPERLY DISPLAYS INSIDE THE MODAL
        this.showDeleteListModal();

        this.setState(prevState => ({
            currentDelete: listToDelete,
            currentList: this.state.currentList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey,
                counter: prevState.sessionData.counter,
                keyNamePairs: prevState.sessionData.keyNamePairs
            }
        }), () => {
            // AN AFTER EFFECT IS THAT WE NEED TO MAKE SURE
            // THE TRANSACTION STACK IS CLEARED
            // this.db.mutationUpdateList(this.state.currentList);
            this.db.mutationUpdateSessionData(this.state.sessionData);
        });
        console.log(this.state.sessionData.keyNamePairs)
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST
    showDeleteListModal() {
        let modal = document.getElementById("delete-modal");
        modal.classList.add("is-visible");
    }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    hideDeleteListModal() {
        let modal = document.getElementById("delete-modal");
        modal.classList.remove("is-visible");
    }

    removeList = () => {
        for (let i = 0; i < this.state.sessionData.keyNamePairs.length; i++){
            console.log(this.state.sessionData.keyNamePairs[i])
            if (this.state.currentDelete === this.state.sessionData.keyNamePairs[i]){
                console.log("delete " + this.state.sessionData.keyNamePairs[i].name)
                this.state.sessionData.keyNamePairs.splice(i, 1)
                break
            }
        }

        console.log(this.state.currentDelete.key)
        console.log(this.state.currentList.key)
        if (this.state.currentDelete.key != this.state.currentList.key){
            this.setState(prevState => ({
                currentDelete: null,
                currentList: this.state.currentList,
                sessionData: {
                    nextKey: prevState.sessionData.nextKey,
                    counter: prevState.sessionData.counter,
                    keyNamePairs: this.state.sessionData.keyNamePairs
                    
                }
            }), () => {
                this.db.mutationUpdateList(this.state.currentList);
                this.db.mutationUpdateSessionData(this.state.sessionData);
            });
        } else {
            this.setState(prevState => ({
                currentDelete: null,
                currentList: null,
                sessionData: {
                    nextKey: prevState.sessionData.nextKey,
                    counter: prevState.sessionData.counter,
                    keyNamePairs: this.state.sessionData.keyNamePairs
                    
                }
            }), () => {
                // this.db.mutationUpdateList(this.state.currentList);
                this.db.mutationUpdateSessionData(this.state.sessionData);
            });
        }
        

        this.hideDeleteListModal();
    }

    createChangeItemTrxn = (index, newName) => {
        let oldName = this.state.currentList.items[index]
        let trxn = new ChangeItem_Transaction(this, index, oldName, newName)
        this.tps.addTransaction(trxn)
    }

    renameItem = (index, newName) => {
        let items = this.state.currentList.items
        console.log(items)
        let oldName = ""
        for (let i = 0; i < items.length; i++){
            if (i === index){
                oldName = items[i];
                items[i] = newName;
                console.log("After changing the name of an item, tps size is: " + this.tps.getSize())
                break
            }
        }

        console.log(items)

        this.setState(prevState => ({
            currentList: this.state.currentList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey,
                counter: prevState.sessionData.counter,
                keyNamePairs: prevState.sessionData.keyNamePairs
            }
        }), () => {
            this.db.mutationUpdateList(this.state.currentList);
            this.db.mutationUpdateSessionData(this.state.sessionData);
        });
    }

    swapItemTrxn = (Dragged, Dropped) => {
        let trxn = new MoveItem_Transaction(this, Dragged, Dropped)
        this.tps.addTransaction(trxn)
    }

    swapItems = (DraggedIndex, DroppedOnIndex) => {
        let currentList = this.state.currentList;
        currentList.items.splice(
            DroppedOnIndex, 0, currentList.items.splice(DraggedIndex, 1)[0]);
        
        this.setState(prevState => ({
            currentList: this.state.currentList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey,
                counter: prevState.sessionData.counter,
                keyNamePairs: prevState.sessionData.keyNamePairs
            }
        }), () => {
            this.db.mutationUpdateList(this.state.currentList);
            this.db.mutationUpdateSessionData(this.state.sessionData);
            console.log("After swapping items, tps size is: " + this.tps.getSize())
        });
    }

    undoTransaction = () => {
        if (this.tps.hasTransactionToUndo()){
            this.tps.undoTransaction();
        } else {
            console.log("NOTHING TO UNDO");
        }
        
    }

    redoTransaction = () => {
        if (this.tps.hasTransactionToRedo()){
            this.tps.doTransaction();
        } else {
            console.log("NOTHING TO REDO");
        }
    }

    // undoActivate = () =>{
    //     if (this.tps.hasTransactionToUndo()){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // redoActivate = () =>{
    //     if (this.tps.hasTransactionToRedo()){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // closeActivate = () =>{
    //     if (this.state.currentList != null){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    render() {
        return (
            <div id="app-root">
                <Banner 
                    title='Top 5 Lister'
                    closeCallback={this.closeCurrentList}
                    undoCallback={this.undoTransaction}
                    redoCallback={this.redoTransaction} 
                    tps={this.tps}
                    currentList={this.state.currentList}/>
                <Sidebar
                    heading='Your Lists'
                    currentList={this.state.currentList}
                    keyNamePairs={this.state.sessionData.keyNamePairs}
                    createNewListCallback={this.createNewList}
                    deleteListCallback={this.deleteList}
                    loadListCallback={this.loadList}
                    renameListCallback={this.renameList}
                />
                <Workspace
                    currentList={this.state.currentList} 
                    createChangeTrxnCallback={this.createChangeItemTrxn}
                    renameItemCallback={this.renameItem}
                    onDragStartCallback={this.onDragStart}
                    onDragOverCallback={this.onDragOver}
                    onDragDropCallback={this.onDrop}
                    swapItemsCallback={this.swapItemTrxn}/>
                <Statusbar 
                    currentList={this.state.currentList} />
                <DeleteModal
                    listKeyPair={this.state.currentDelete}
                    hideDeleteListModalCallback={this.hideDeleteListModal}
                    removeListCallback={this.removeList}
                    // listToBeRemovedName={this.state.currentList.name}
                />
            </div>
        );
    }
}

export default App;
