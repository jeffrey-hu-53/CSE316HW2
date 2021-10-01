import React from "react";
import ItemCard from "./ItemCard";
export default class Workspace extends React.Component {
    render() {
        // console.log("workspace curr list: ", this.props.currentList);
        // console.log("props: " + this.props);
        let currentList = this.props.currentList;
        console.log(currentList);
        let items = currentList === null ? [] : currentList.items;
        console.log(items);
        return (
            <div id="top5-workspace">
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number">1.</div>
                        <div className="item-number">2.</div>
                        <div className="item-number">3.</div>
                        <div className="item-number">4.</div>
                        <div className="item-number">5.</div>
                    </div>
                    <div id = "edit-items">
                    {
                    currentList !== null ?   
                        this.props.currentList.items.map((itemName, index) => (
                            <ItemCard
                                renameItemCallback = {this.props.renameItemCallback}
                                onDragStartCallback={this.props.onDragStartCallBack}
                                onDragOverCallback={this.props.onDragOverCallback}
                                onDragDropCallback={this.props.onDropCallback}
                                itemName = {itemName}
                                // key = {this.props.currentList.items.indexOf(itemName)}
                                key = {"item-" + index}
                                index = {index}
                            /> 
                        ))

                        :

                        <div>
                        </div>
                    }    
                    </div>
                </div>
            </div>
        )
    }
}