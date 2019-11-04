import React from 'react';

class BuidlingList extends React.Component {
	render() {
		//console.log('This is my directory file', this.props.data);
		const { data, selectedUpdate, selectedBuilding, filterText } = this.props;

		// can search for building name or building code
		const buildingList = data
			.filter(directory => {
			// this broke something:
//				if (typeof directory.name !== "undefined" && typeof filterText !== "undefined") 
//				{
					return ((directory.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) || (directory.code.toLowerCase().indexOf(filterText.toLowerCase()) >= 0));
//				}		
			})
			.map(directory => {
				return (
					<tr key={directory.id} onClick={()=> selectedUpdate(directory.id)}>
						<td>{directory.code} </td>
						<td>{directory.name} </td>
					</tr>
			);
		});

		return <div>{buildingList}</div>;
	}
}
export default BuidlingList;
