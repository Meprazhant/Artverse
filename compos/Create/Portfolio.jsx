import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { render } from 'react-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


function Portfolio() {
    var session = useSession()
    var router = useRouter()
    var [userData, setUserData] = React.useState(null)
    var [loading, setLoading] = React.useState(true)

    function RenderPtheme() {
        for (var i = 0; i < Themes.length; i++) {
            if (Themes[i].slug === pTheme) {
                return (
                    <div className="cc-theme">
                        <img src={Themes[i].image} alt="theme" />
                        <h3>{Themes[i].name}</h3>
                    </div>
                )
            }
        }
    }


    const Themes =
        [
            {
                "slug": "basic",
                "name": "Basic",
                "image": "https://i.ibb.co/d0m64FJ/image.png",
            },
            {
                "slug": "programmer",
                "name": "Programmer",
                "image": "https://i.ibb.co/wQXYMnS/image.png",
            },
            {
                "slug": "artist",
                "name": "Artist",
                "image": "https://th.bing.com/th/id/R.1a7701d5b548bb68ad78794276222c4b?rik=31a6k70Iyab86Q&pid=ImgRaw&r=0",

            },
            {
                "slug": "retro",
                "name": "Cyberpunk",
                "image": "https://i.ibb.co/RcKK5vQ/image.png",
            },
            {
                "slug": "musician",
                "name": "Musician",
                "image": "https://th.bing.com/th/id/R.1f6a3f164aa9a0f2221b75b715c74909?rik=gw4Yu1TcL6m89A&pid=ImgRaw&r=0",
            }
        ]


    useEffect(() => {
        if (session.status === 'authenticated') {

        }
        if (session.status === 'unauthenticated') {
            router.push('/login')
        }
    }, [session.status])
    var [pfExists, setPfExists] = React.useState(false)
    var [pTheme, setPTheme] = React.useState("")
    var [createdDate, setCreatedDate] = React.useState("")
    var [updatedDate, setUpdatedDate] = React.useState("")
    var [portfolioVisited, setPortfolioVisited] = React.useState(0)

    function getDate(a, b) {
        dayjs.extend(relativeTime)
        var createDate = dayjs(a).fromNow()
        setCreatedDate(createDate)
        var updateDate = dayjs(b).fromNow()
        setUpdatedDate(updateDate)

    }
    function fetchPF(email) {
        fetch("/api/portfolio/" + email)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPortfolioVisited(data.views)
                getifPFecist()
                getDate(data.$createdAt, data.$updatedAt)
                if (data) {
                    setPTheme(data.theme)
                }
            }
            )
    }
    function getifPFecist() {
        fetch("/api/portfolio/check")
            .then(res => res.json())
            .then(data => {
                setPfExists(data)
                setLoading(false)
            }
            )
    }
    var [userName, setUserName] = React.useState("")
    function getUserData() {
        fetch("/api/users/getloggedin")
            .then(res => res.json())
            .then(data => {
                setUserData(data.user[0])
                var useremail = data.user[0].email
                var username = useremail.split("@")[0]
                setUserName(username)
                fetchPF(data.user[0].email)
                checkInfostatus(data.user[0])
            })

    }
    useEffect(() => {
        getUserData()

    }, [])
    var [infoStatus, setInfoStatus] = React.useState(0)

    function checkInfostatus(data) {
        // return how much percent user has filled his her data
        var count = 0
        if (data.name) {
            count = count + 1
        }
        if (data.email) {
            count = count + 1
        }
        if (data.bio) {
            count = count + 1
        }
        if (data.location) {
            count = count + 1
        }
        if (data.profession) {
            count = count + 1
        }

        var percent = (count / 5) * 100
        // round off
        percent = Math.round(percent)
        setInfoStatus(percent)
        if (percent !== 100) {
            router.push('/profile')
        }
    }
    return (
        <div className='create-portfolio'>
            {(loading) && <div className="explore-load">
                <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
            </div>}
            {(!loading) && <div className="create-portfolio__container">
                {(!pfExists) && <div className="cc-items">
                    <h2>You need a portfolio !!!</h2>
                    <p>Show your skills, projects and capabilities on your own portfolio website, start now by chosing the theme</p>
                </div>}
                {(pfExists) && <div className="cc-items">
                    <h2>Wanna Edit your  Portfolio?</h2>
                    <p>You have already made a portfolio, but you can edit it any time. Do you want to edit?</p>
                </div>}
                <div className="cc-items">
                    <div className="addTheme cc-themes">
                        <div className="cc-theme">
                            <div className="badge badge-info gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                info
                            </div>
                            <h2>Did you Know?</h2>
                            <p>You can add your own theme to ArtVerse, Since Artverse is an open-sourced project, you can help us by contributing in this project. Make your own Cool theme and publish.</p>
                            <div className="btns">
                                <button className='btn glass' onClick={() => router.push('https://github.com/Meprazhant/Artverse/', "blank")}>Contribute</button>
                                <div className="btn btn-primary">Learn More about Contribution</div>
                            </div>
                        </div>
                    </div>
                </div>


                {(pfExists) && <div className="cc-items cc-the">
                    <h2>Your Current Theme</h2>
                    <p>Edit the Old Theme, or choose new one from below.</p>
                    <div className="cc-wrapper">

                        <div className="cc-item-site cc-the">
                            {pTheme && <RenderPtheme />}
                            <div className="cc-btns">
                                <button className='btn btn-warning' onClick={() => router.push("/create/" + pTheme)}>Edit</button>
                                <button className='btn btn-regular' onClick={() => router.push('/portfolio/' + userName)}>Visit</button>
                            </div>
                        </div>
                        <div className="cc-det-site">
                            <h2>Your Portfolio Details</h2>
                            <div className="cc-det">
                                <div className="cc-det-item">
                                    <h3>Theme</h3>
                                    <p>{pTheme}</p>
                                </div>
                                <div className="cc-det-item">
                                    <h3>Info Status</h3>
                                    <p className='text bg-green-800 '>Published</p>
                                </div>
                                <div className="cc-det-item">
                                    <h3>Portfolio Link</h3>
                                    <a href={`https://artverses.vercel.app/portfolio/${userName}`} target='_blank'>https://artverse.vercel.app/portfolio/{userName}</a>
                                </div>
                                <div className="cc-det-item">
                                    <h3>Created</h3>
                                    <p>{createdDate}</p>
                                </div>
                                <div className="cc-det-item">
                                    <h3>Last time portfolio visited</h3>
                                    <p>{updatedDate}</p>
                                </div>
                                <div className="cc-det-item">
                                    <h3>Portfolio Visited</h3>
                                    <p>{portfolioVisited}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>}
                <div className="cc-items cc-the">
                    <h2>Choose a theme</h2>
                    <div className="cc-themes">
                        {Themes.map((theme, index) => (
                            <div className="cc-theme" key={index} onClick={() => router.push(theme.slug)}>
                                <img src={theme.image} alt="theme" />
                                <h3>{theme.name}</h3>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
            }
        </div>
    )
}

export default Portfolio