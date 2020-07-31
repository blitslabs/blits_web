import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'


// Libraries
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';



// const data = [
//     {
//       name: 'Lun', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//       name: 'Mar', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//       name: 'Mie', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//       name: 'Jue', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//       name: 'Vie', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//       name: 'Sab', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//       name: 'Dom', uv: 3490, pv: 4300, amt: 2100,
//     },
//   ];

class MyLineChart extends Component {
    render() {
        const { data, dataType } = this.props      

        return (
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={dataType} stroke="#007bff" activeDot={{ r: 8 }} />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default MyLineChart