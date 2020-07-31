import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Loading from '../Loading'
import Navbar from './ExternalNavbar'
import PageTitle from './PageTitle'
import './styles.css'

class ExternalFooter extends Component {

    componentDidMount() {
        document.title = "Registro"

    }


    render() {
        return (
            <footer id="footer" className="dark" style={{ paddingTop: '0px' }}>
                <div className="container">
                    {/* Footer Widgets
                    ============================================= */}
                    <div className="footer-widgets-wrap">
                        <div className="row col-mb-50">
                            <div className="col-lg-8">
                                <div className="row col-mb-50">
                                    <div className="col-md-4">
                                        <div className="widget clearfix">
                                            <img src="images/footer-widget-logo.png" alt="Image" className="footer-logo" />
                                            <p>We believe in <strong>Simple</strong>, <strong>Creative</strong> &amp; <strong>Flexible</strong> Design Standards.</p>
                                            <div style={{ background: 'url("images/world-map.png") no-repeat center center', backgroundSize: '100%' }}>
                                                <address>
                                                    <strong>Headquarters:</strong><br />
                              795 Folsom Ave, Suite 600<br />
                              San Francisco, CA 94107<br />
                                                </address>
                                                <abbr title="Phone Number"><strong>Phone:</strong></abbr> (1) 8547 632521<br />
                                                <abbr title="Fax"><strong>Fax:</strong></abbr> (1) 11 4752 1433<br />
                                                <abbr title="Email Address"><strong>Email:</strong></abbr> info@canvas.com
                          </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="widget widget_links clearfix">
                                            <h4>Blogroll</h4>
                                            <ul>
                                                <li><a href="https://codex.wordpress.org/">Documentation</a></li>
                                                <li><a href="https://wordpress.org/support/forum/requests-and-feedback">Feedback</a></li>
                                                <li><a href="https://wordpress.org/extend/plugins/">Plugins</a></li>
                                                <li><a href="https://wordpress.org/support/">Support Forums</a></li>
                                                <li><a href="https://wordpress.org/extend/themes/">Themes</a></li>
                                                <li><a href="https://wordpress.org/news/">Canvas Blog</a></li>
                                                <li><a href="https://planet.wordpress.org/">Canvas Planet</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="widget clearfix">
                                            <h4>Recent Posts</h4>
                                            <div className="posts-sm row col-mb-30" id="post-list-footer">
                                                <div className="entry col-12">
                                                    <div className="grid-inner row">
                                                        <div className="col">
                                                            <div className="entry-title">
                                                                <h4><a href="#">Lorem ipsum dolor sit amet, consectetur</a></h4>
                                                            </div>
                                                            <div className="entry-meta">
                                                                <ul>
                                                                    <li>10th July 2021</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="entry col-12">
                                                    <div className="grid-inner row">
                                                        <div className="col">
                                                            <div className="entry-title">
                                                                <h4><a href="#">Elit Assumenda vel amet dolorum quasi</a></h4>
                                                            </div>
                                                            <div className="entry-meta">
                                                                <ul>
                                                                    <li>10th July 2021</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="entry col-12">
                                                    <div className="grid-inner row">
                                                        <div className="col">
                                                            <div className="entry-title">
                                                                <h4><a href="#">Debitis nihil placeat, illum est nisi</a></h4>
                                                            </div>
                                                            <div className="entry-meta">
                                                                <ul>
                                                                    <li>10th July 2021</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="row col-mb-50">
                                    <div className="col-md-4 col-lg-12">
                                        <div className="widget clearfix" style={{ marginBottom: '-20px' }}>
                                            <div className="row">
                                                <div className="col-lg-6 bottommargin-sm">
                                                    <div className="counter counter-small"><span data-from={50} data-to={15065421} data-refresh-interval={80} data-speed={3000} data-comma="true">15,065,421</span></div>
                                                    <h5 className="mb-0">Total Downloads</h5>
                                                </div>
                                                <div className="col-lg-6 bottommargin-sm">
                                                    <div className="counter counter-small"><span data-from={100} data-to={18465} data-refresh-interval={50} data-speed={2000} data-comma="true">18,465</span></div>
                                                    <h5 className="mb-0">Clients</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-lg-12">
                                        <div className="widget subscribe-widget clearfix">
                                            <h5><strong>Subscribe</strong> to Our Newsletter to get Important News, Amazing Offers &amp; Inside Scoops:</h5>
                                            <div className="widget-subscribe-form-result" />
                                            <form id="widget-subscribe-form" action="include/subscribe.php" method="post" className="mb-0" noValidate="novalidate">
                                                <div className="input-group mx-auto">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="icon-email2" /></div>
                                                    </div>
                                                    <input type="email" id="widget-subscribe-form-email" name="widget-subscribe-form-email" className="form-control required email" placeholder="Enter your Email" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-success" type="submit">Subscribe</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-lg-12">
                                        <div className="widget clearfix" style={{ marginBottom: '-20px' }}>
                                            <div className="row">
                                                <div className="col-6 col-md-12 col-lg-6 clearfix bottommargin-sm">
                                                    <a href="#" className="social-icon si-dark si-colored si-facebook mb-0" style={{ marginRight: '10px' }}>
                                                        <i className="icon-facebook" />
                                                        <i className="icon-facebook" />
                                                    </a>
                                                    <a href="#"><small style={{ display: 'block', marginTop: '3px' }}><strong>Like us</strong><br />on Facebook</small></a>
                                                </div>
                                                <div className="col-6 col-md-12 col-lg-6 clearfix">
                                                    <a href="#" className="social-icon si-dark si-colored si-rss mb-0" style={{ marginRight: '10px' }}>
                                                        <i className="icon-rss" />
                                                        <i className="icon-rss" />
                                                    </a>
                                                    <a href="#"><small style={{ display: 'block', marginTop: '3px' }}><strong>Subscribe</strong><br />to RSS Feeds</small></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{/* .footer-widgets-wrap end */}
                </div>
                {/* Copyrights
                ============================================= */}
                <div id="copyrights">
                    <div className="container">
                        <div className="row col-mb-30">
                            <div className="col-md-6 text-center text-md-left">
                                Copyrights © 2020 All Rights Reserved by Canvas Inc.<br />
                                <div className="copyright-links"><a href="#">Terms of Use</a> / <a href="#">Privacy Policy</a></div>
                            </div>
                            <div className="col-md-6 text-center text-md-right">
                                <div className="d-flex justify-content-center justify-content-md-end">
                                    <a href="#" className="social-icon si-small si-borderless si-facebook">
                                        <i className="icon-facebook" />
                                        <i className="icon-facebook" />
                                    </a>
                                    <a href="#" className="social-icon si-small si-borderless si-twitter">
                                        <i className="icon-twitter" />
                                        <i className="icon-twitter" />
                                    </a>
                                    <a href="#" className="social-icon si-small si-borderless si-gplus">
                                        <i className="icon-gplus" />
                                        <i className="icon-gplus" />
                                    </a>
                                    <a href="#" className="social-icon si-small si-borderless si-pinterest">
                                        <i className="icon-pinterest" />
                                        <i className="icon-pinterest" />
                                    </a>
                                    <a href="#" className="social-icon si-small si-borderless si-vimeo">
                                        <i className="icon-vimeo" />
                                        <i className="icon-vimeo" />
                                    </a>
                                    <a href="#" className="social-icon si-small si-borderless si-github">
                                        <i className="icon-github" />
                                        <i className="icon-github" />
                                    </a>
                                    <a href="#" className="social-icon si-small si-borderless si-yahoo">
                                        <i className="icon-yahoo" />
                                        <i className="icon-yahoo" />
                                    </a>
                                    <a href="#" className="social-icon si-small si-borderless si-linkedin">
                                        <i className="icon-linkedin" />
                                        <i className="icon-linkedin" />
                                    </a>
                                </div>
                                <div className="clear" />
                                <i className="icon-envelope2" /> info@canvas.com <span className="middot">·</span> <i className="icon-headphones" /> +1-11-6541-6369 <span className="middot">·</span> <i className="icon-skype2" /> CanvasOnSkype
                  </div>
                        </div>
                    </div>
                </div>{/* #copyrights end */}
            </footer>
        )
    }

}

export default ExternalFooter