import React from "react";

export default class EditToolbar extends React.Component {
    render() {
        const{ closeCallback, undoCallback, redoCallback, tps, currentList} = this.props
        if (tps.hasTransactionToUndo() && tps.hasTransactionToRedo() && currentList!=null){
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
            )
        } else if (tps.hasTransactionToUndo() && tps.hasTransactionToRedo() && currentList==null){
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button-disabled">
                            &#x24E7;
                    </div>
                </div>
            )
        } else if (tps.hasTransactionToUndo() && !tps.hasTransactionToRedo() && currentList!=null){
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button-disabled"
                        // onClick={redoCallback}
                        >
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
            )
        } else if (tps.hasTransactionToUndo() && !tps.hasTransactionToRedo() && currentList==null){
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button-disabled"
                        // onClick={redoCallback}
                        >
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button-disabled"
                        // onClick={closeCallback}
                        >
                            &#x24E7;
                    </div>
                </div>
            )
        } else if (!tps.hasTransactionToUndo() && tps.hasTransactionToRedo() && currentList!=null){
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button-disabled"
                        // onClick={undoCallback}
                        >
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
            )
        } else if (!tps.hasTransactionToUndo() && tps.hasTransactionToRedo() && currentList==null){
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button-disabled"
                        // onClick={undoCallback}
                        >
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button-disabled">
                            &#x24E7;
                    </div>
                </div>
            )
        } else if (!tps.hasTransactionToUndo() && !tps.hasTransactionToRedo() && currentList!=null){
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button-disabled"
                        // onClick={undoCallback}
                        >
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button-disabled"
                        // onClick={redoCallback}
                        >
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
            )
        } else if (!tps.hasTransactionToUndo() && !tps.hasTransactionToRedo() && currentList==null){
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button-disabled"
                        // onClick={undoCallback}
                        >
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button-disabled"
                        // onClick={redoCallback}
                        >
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button-disabled"
                        // onClick={closeCallback}
                        >
                            &#x24E7;
                    </div>
                </div>
            )
        }
    }
}