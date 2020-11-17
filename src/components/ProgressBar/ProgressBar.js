import React from 'react';
import './ProgressBar.css';


class ProgressBar extends React.Component{

    static defaultProps = {
        min: 0,
        max: 10,
        text: "value",
        value: 7,
        mainColor: "red",
        backColor: "rgba(255,0,0,0.05)"
    };

    render(){
        let functionalCss = {
            '--progress-val': this.props.value,
            '--progress-min': this.props.min,
            '--progress-max': this.props.max,
            '--progress-col': this.props.mainColor,
            '--progress-backcol': this.props.backColor
        };
        return <div className="progressbar" style={functionalCss}>
                    <div className="progressbar_value" />
                    <div className="progressbar_text">{this.props.text}</div>
                </div>;
    }
}


export default ProgressBar;