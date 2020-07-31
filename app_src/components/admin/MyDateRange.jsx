import React, { Component, Fragment } from 'react'
import { DateRange } from 'react-date-range';
import onClickOutside from "react-onclickoutside";
// Date Range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class MyDateRange extends Component {
    
    handleClickOutside = () => {
        this.props.handleToggleDateRange(false)
        return
    }

    render() {
        return (
            <DateRange
                ranges={[{
                    startDate: this.props.startDate,
                    endDate: this.props.endDate,
                    key: 'selection'
                }]}
                onChange={this.props.handleSelectDateRange}
            />
        )
    }
}

export default onClickOutside(MyDateRange)