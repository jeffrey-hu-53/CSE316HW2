import React from "react";
import EditToolbar from "./EditToolbar";

export default class Banner extends React.Component {
    render() {
        const { title, closeCallback, undoCallback, redoCallback, tps, currentList} = this.props;
        return (
            <div id="top5-banner">
                {title}
                <EditToolbar closeCallback={closeCallback} 
                undoCallback={undoCallback} 
                redoCallback={redoCallback}
                // undoActive={undoActive}
                // redoActive={redoActive}
                // closeActive={closeActive}
                tps={tps}
                currentList={currentList}
                />
            </div>
        );
    }
}