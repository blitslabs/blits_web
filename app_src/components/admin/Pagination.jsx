
import React, { Component, Fragment } from 'react'
import { withRouter, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'react-feather';

class Pagination extends Component {
    render() {

        const { pages, page, url } = this.props
       
        return (
            <nav aria-label="pagination pagination-sm">
                <ul className="pagination justify-content-end">
                    <li className="page-item"><a className="page-link" href={ url + '/1'} ><ChevronLeft /></a></li>
                    {
                        [...Array(pages)].map((e, i) => {
                            if (page == i + 1) {
                                return <li key={i} className="page-item active"><a className="page-link" href={url + '/' + (i+1)}>{i + 1}</a></li>
                            } else {
                                return <li key={i} className="page-item "><a className="page-link" href={url + '/' + (i+1)}>{i + 1}</a></li>
                            }
                        })
                    }
                    <li className="page-item"><a className="page-link" href={url + '/' + pages}><ChevronRight /></a></li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Pagination)