import React, { Component } from 'react';
import { Draggable } from 'react-drag-and-drop'

import './User.css';

const user = (props) => {
	return (
		<Draggable type="user" data={props.code}>
			<div className="User">
				<div className="userDetails">
					<img src={props.img}/> 
					<p>{props.code}. {props.name}</p>
				</div>
			</div>
		</Draggable>
	)
}


export default user;