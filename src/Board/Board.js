import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { Draggable } from 'react-drag-and-drop';



import './Board.css';

const board = (props) => {

	return (
		<div className="Board">
			<div className="boardCanvas" id="board">
				{props.droppedUsers.map(function(droppedUser, i){
					return <div className="droppedUsers" key={i}>
								<ResizableBox width={100} height={100}>
									<Draggable type="user" >
										<img src={droppedUser.picture}/>
									</Draggable> 
								</ResizableBox>
							</div>;		
				})}
			</div>
		</div>
	)
}

export default board;