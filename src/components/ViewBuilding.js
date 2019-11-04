/*

Note: I didn't use the given formate for this one,
and instead of adding RemoveBuilding.js, and AddBuilding.js
I wrapped all the functions up into ViewBuilding because I just found it easier.

*/


/*
import React from 'react';

class ViewBuilding extends React.Component {
	render() {
		return (
			<div>
				<p>
					{' '}
					<i>Click on a name to view more information</i>
				</p>
			</div>
		);
	}
}
export default ViewBuilding;
*/


import React from 'react';

export default ({data, selectedBuilding, selectedUpdate, highestID, itemDel, itemIns}) => {
	
	var addGO = false;
	var cooGO = false;
	var inpAdd = false;
	var inpCoo = false;
	var count = 0;
	var i = 0;
	var index;

	var newOne = {};
	var newCord = {};
			
	var newID = (highestID+1);
	var newCode = "";
	var newName = "";
	var newAddress = "";
	var newLat = 0;
	var newLong = 0;

	function getStart()
	{
		// finds the real index number of the item in the data array
		data
		.map(map2 => {
			if (map2.id === selectedBuilding) 
			{
				count = i;
			}	
			i++;
		});	// end data.map()
	
		// check if either address or coordinates are undefined
		data
		.filter(mapy => { return mapy.id === selectedBuilding; })	
		.map(mapy => {
			if (typeof mapy.address !== "undefined") 
			{
				addGO = true;
			}		
			if (typeof mapy.coordinates !== "undefined") 
			{
				cooGO = true;
			}		
		});	// end data.map()
	}
	
	function getIndexNum(code)
	{
		// finds the real index number of the item in the data array
		var indy = 0;
		var j = 0;
		var done = false;
		data
		.map(map3 => {
			if (map3.code.toLowerCase() > code.toLowerCase() && !done) 
			{
				indy = j;
				done = true;
			}	
			j++;
		});	// end data.map()
		
		return indy;
	}	// end getIndexNum()
	
	function insPaste()
	{
		if (selectedBuilding <= 0)
		{
			function formUpdate()
			{
				newOne.id = newID;
				newOne.code = newCode.value.toUpperCase();
				newOne.name = newName.value;
				newCord.latitude = newLat.value;
				newCord.longitude = newLong.value;
				newOne.coordinates = newCord;
				newOne.address = newAddress.value;
				index = getIndexNum(newOne.code);
			}	// end formUpdate()

			return (
				<div>
					<form id="myForm" method="GET">
	  					Name: 
	  					<input type="text" name="nameVal" 
							ref={(value) => {newName = value} }
							onChange={formUpdate.bind(this)}
	  					/><br />
	  					Code: 
	  					<input type="text" name="codeVal" 
							ref={(value) => {newCode = value} }
							onChange={formUpdate.bind(this)}
	  					/><br />
	  					Address: 
	  					<input type="text" name="addressVal" 
							ref={(value) => {newAddress = value} }
							onChange={formUpdate.bind(this)}
	  					/><br />
	  					Latitude: 
	  					<input type="text" name="latVal" 
							ref={(value) => {newLat = value} }
							onChange={formUpdate.bind(this)}
	  					/><br />
	  					Longitude: 
	  					<input type="text" name="longVal" 
							ref={(value) => {newLong = value} }
							onChange={formUpdate.bind(this)}
	  					/><br />
					<p align="center">
						<button key="insert" onClick={()=> itemIns(newOne, index)}>INSERT</button>
					</p>
					</form>
				</div>
			);
		}
	}

	function delPaste()
	{
		if (selectedBuilding > 0)
		{
			return (
				<p align="center">
					<button key="delete" onClick={()=> itemDel(data, count)}>DELETE</button>
					{' '}
					<button key="clear" onClick={()=> selectedUpdate(0)}>CLEAR</button>
				</p>
			);
		}
	}
	
	function printAddress()
	{
		if (addGO)
		{
			const { address } = data[count];

			return (
				<p>
					<strong>Address:</strong><br />
					<em>{address}</em>
				</p>
			);
		}
	}
	
	function printCoord()
	{
		if (cooGO)
		{
			const { coordinates } = data[count];
			const { latitude, longitude } = coordinates;
			
			return (
				<p>
					<strong>Coordinates:</strong><br />
					Lat: {latitude}, Long: {longitude}
				</p>
			);
		}
	}
	
	// output depending on if selected > 0 and if address/coordinates are undefined
	function expandBuilding(selectedBuilding) {
		if (selectedBuilding > 0)
		{
			const { id, code, name } = data[count];
			return (
				<p>
					<h3>{name}</h3>
					{ printAddress() }
					{ printCoord() }
					<table className="viewtable">
						<tr><th>ID</th><th>CODE</th></tr>
						<tr><td>{id}</td><td>{code}</td></tr>
					</table>
				</p>
				);	// end return()
		}
		else
		{
				return (
					<p><i>Click on a name to view more information</i></p>
				);
		}
	}	// end expandBuilding

	return (
		<div>
			{getStart()}
			{expandBuilding(selectedBuilding)}
			{delPaste()}
			{insPaste()}
		</div>
	);
}	// end function

