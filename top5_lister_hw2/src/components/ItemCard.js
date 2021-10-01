import React from "react";

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.itemName,
            key: this.props.key,
            index: this.props.index,
            editActive: false,
        }
    }

    // handleDragStart = (event) =>{
        
    // }

    // handleDragOver = (event) =>{
    //     this.props.onDragOverCallback(event);
    // }

    // handleOnDrop = (event) =>{
    //     this.props.onDropCallback(event);
    // }

    onDragStart = (event) => {
        event.dataTransfer.setData("index", this.state.index);
        console.log("Picked up index " + this.state.index);
    }
    onDragOver = (event) => {
        event.preventDefault();
    }
    onDrop = (event) => {
        event.preventDefault();
        let draggedIndex = event.dataTransfer.getData("index");
        let droppedOnIndex = this.state.index;
        console.log("Dropped on index " + this.state.index);
        this.props.swapItemsCallback(draggedIndex, droppedOnIndex);
    }
    
    handleClick = (event) => {
        if (event.detail === 1) {
            console.log("itemcard single click")
        }
        else if (event.detail === 2) {
            this.handleToggleEdit(event);
            console.log("itemcard double click")
        }
    }
    handleToggleEdit = (event) => {
        this.setState({
            editActive: !this.state.editActive
        });
    }
    
    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
    }
    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleBlur();
        }
    }
    handleBlur = () => {
        let index = this.props.index;
        let textValue = this.state.text;
        console.log("ListCard handleBlur: " + textValue);
        this.props.renameItemCallback(index, textValue);
        this.handleToggleEdit();
    }

    render() {
        
        // const { keyNamePair, selected } = this.props;
        if (this.state.editActive) {
            return (
                <input
                    // id={"list-" + keyNamePair.name}
                    className='top5-item'
                    type='text'
                    onKeyPress={this.handleKeyPress}
                    onBlur={this.handleBlur}
                    onChange={this.handleUpdate}
                    autoFocus
                    // defaultValue={keyNamePair.name}
                />)
        }
        else {
            return (
                <div className = "top5-item" onClick={this.handleClick} 
                onDragStart={this.onDragStart} 
                onDragOver={this.onDragOver} 
                onDrop={this.onDrop}
                draggable="true"> 
                    {
                        this.props.itemName
                    }
                </div>
            )
        }
    }
}