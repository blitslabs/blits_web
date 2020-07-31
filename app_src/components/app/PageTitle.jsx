import React, { Component, Fragment } from 'react'

class PageTitle extends Component {
    render() {
        return (
            <section id="page-title">

                <div className="container clearfix">
                    <h1>My Account</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Login</li>
                    </ol>
                </div>

            </section>
        )
    }
}

export default PageTitle