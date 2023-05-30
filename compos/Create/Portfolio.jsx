import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Portfolio() {
    var session = useSession()
    var router = useRouter()
    var [userData, setUserData] = React.useState(null)
    var [loading, setLoading] = React.useState(true)

    useEffect(() => {
        if (session.status === 'authenticated') {

        }
        if (session.status === 'unauthenticated') {
            router.push('/login')
        }
    }, [session.status])
    function getUserData() {
        fetch("/api/users/getloggedin")
            .then(res => res.json())
            .then(data => {
                console.log(data.user[0])
                setUserData(data.user[0])
                checkInfostatus(data.user[0])
                setLoading(false)
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
    }
    return (
        <div className='create-portfolio'>
            {(loading) && <div className="explore-load">
                <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
            </div>}
            {(!loading) && <div className="create-portfolio__container">
                <div className="cc-items">
                    <h2>You need a portfolio !!!</h2>
                    <p>Show your skills, projects and capabilities on your own portfolio website, start now by chosing the theme</p>
                </div>
                <div className="cc-items cc-the">
                    <h2>Choose a theme</h2>
                    <div className="cc-themes">
                        <div className="cc-theme" onClick={() => router.push("dark")}>
                            <img src="https://th.bing.com/th/id/R.9f1b720be13a8887f1d2f1476b194b13?rik=qWlPYc8EyeuaXQ&pid=ImgRaw&r=0" alt="theme" />
                            <h3>Dark</h3>
                        </div>
                    </div>
                </div>

            </div>
            }
        </div>
    )
}

export default Portfolio