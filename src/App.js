import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';

class App extends React.Component {

	// constructor
	constructor(props) {
		super(props);
    	this.state = {
    		filterText: '',
    		selectedBuilding: 0,
    		highestID: 148,
    		data: this.props.data
    	};
	}	// end constructor

	// This deletes an item
	itemDel(data, index) {
    	this.state.data.splice(index, 1);
    	this.setState(this.state.data);
    	this.setState({ selectedBuilding: 0 });
	}	// end itemDel()

	// Insert new item into data	
	itemIns(newOne, index) {
//		this.state.data.push(newOne); 
		this.state.data.splice(index, 0, newOne);
		var newHighest = newOne.id;
    	this.setState({ highestID: newHighest });
		this.setState(this.state.data);
		this.setState({ selectedBuilding: newHighest });
		console.log('highest id after add:', this.state.highestID);
	}	// end itemInsert()
  	
	filterUpdate(value) {
    	//Here you will need to set the filterText property of state to the value passed into this function
    	this.setState({ filterText: value });
	}	// end filterUpdate()

	selectedUpdate(id) {
    //Here you will need to update the selectedBuilding property of state to the id passed into this function
    	this.setState({ selectedBuilding: id });
	}	// end selectedUpdate()
	
  
  render() {
    
    return (
      <div className="bg">
<div className="row">
    	<header><h1>UF Directory App</h1></header>
</div>
        <Search
        	filterText={this.state.filterText}
        	filterUpdate = {this.filterUpdate.bind(this)}
        />

        <main>
          <div className="row">
            <div className="column1">
              <div className="tableWrapper">
                <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td>
                      <b>Code Building</b>
                    </td>
                  </tr>
                  <BuildingList
                  	filterText={this.state.filterText}
                  	selectedUpdate={this.selectedUpdate.bind(this)}
                  	selectedBuilding={this.state.selectedBuilding}
                    data={this.props.data}
                  />
                </tbody>
                </table>
              </div>
            </div>
            <div className="column2">
              <ViewBuilding 
              	selectedBuilding={this.state.selectedBuilding}
              	highestID={this.state.highestID}
              	selectedUpdate={this.selectedUpdate.bind(this)}
              	itemDel={this.itemDel.bind(this)}
              	itemIns={this.itemIns.bind(this)}
              	data={this.props.data}
              />
            </div>
          </div>
          <Credit />
        </main>
      </div>
    );
  }		// end render()

} // end class

export default App;

