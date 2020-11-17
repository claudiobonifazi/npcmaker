import React from 'react';
import './Portrait.css';

class Portrait extends React.Component{

    static defaultProps = {
        img: null,
        borderColor: "#000000",
        size: 512
    };

    render(){
        let container = {
            '--portrait-bd-col': this.props.borderColor,
            '--portrait-size': this.props.size
        };
        let html = <div className="portrait" style={container}>
                        <img width={this.props.size} height={this.props.size} draggable={false} loading="lazy" src={this.props.img} />
                    </div>;
        return html;
    }
}

export default Portrait;