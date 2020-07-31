
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Progress } from 'rsuite'
const { Circle, Line } = Progress

class CircularProgress extends Component {
    
    state = {
        percent: 50,
        status: null,
        color: ''
    }

    changePercent(nextPercent) {
        const percent = nextPercent < 0 ? 0 : nextPercent > 100 ? 100 : nextPercent;
        this.setState({
            percent,
            status: percent === 100 ? 'success' : null,
            color: percent === 100 ? '#52c41a' : '#3385ff'
        });
    }
    
    render() {
        const { percent, color, status } = this.state;
        return (
            <div>
                
                <Line percent={percent} strokeColor={color} status={status} />
                <div style={{ width: 220, marginTop: 10 }}>
                    {/* <Circle percent={percent} strokeColor={color} status={status} className="profile-circular-progress" /> */}
                </div>
            </div>
        );
    }

}

export default CircularProgress