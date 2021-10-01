import React from "react";

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            class: "top5-item",
            text: this.props.itemName,
            key: this.props.key,
            index: this.props.index,
            editActive: false
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
        console.log("You are dragged over " + this.state.index);
        this.setState({
            class: "top5-item-dragged-to",
            text: this.props.itemName,
            key: this.props.key,
            index: this.props.index,
            editActive: false
        })
    }
    onDragLeave = (event) => {
        event.preventDefault();
        this.setState({
            class: "top5-item",
            text: this.props.itemName,
            key: this.props.key,
            index: this.props.index,
            editActive: false
        })
    }
    onDrop = (event) => {
        event.preventDefault();
        let draggedIndex = event.dataTransfer.getData("index");
        let droppedOnIndex = this.state.index;
        console.log("Dropped on index "+ this.state.index);
        if (draggedIndex != droppedOnIndex){
            this.props.swapItemsCallback(draggedIndex, droppedOnIndex);
        } else {
            console.log("Dropped on self so nothing happened");
        }

        this.setState({
            class: "top5-item",
            text: this.props.itemName,
            key: this.props.key,
            index: this.props.index,
            editActive: false
        })
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
                <div className = {this.state.class} onClick={this.handleClick} 
                onDragStart={this.onDragStart} 
                onDragOver={this.onDragOver} 
                onDrop={this.onDrop}
                onDragLeave={this.onDragLeave}
                draggable="true"> 
                    {
                        this.props.itemName
                    }
                </div>
            )
        }
    }
}