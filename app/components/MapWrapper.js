import React, { useEffect, Component } from "react";

class Map extends Component {
    constructor(props) {
      super(props);
      this.state = {
        htmlContent: '',
      };
    }
  
    componentDidMount() {
      // Fetch the HTML file (adjust the file path or URL accordingly)
      fetch('funny.html')
        .then((response) => response.text())
        .then((htmlContent) => {
          this.setState({ htmlContent });
          console.log(htmlContent)
        })
        .catch((error) => {
          console.error('Error fetching HTML file:', error);
        });
    }
  
    render() {
      const { htmlContent } = this.state;
  
      return (
        <div>
          {/* Render the fetched HTML content */}
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      );
    }
  }
  
  export default Map;