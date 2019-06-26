import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function Dashboard(props) {
    const [userData, setUserData] = useState({})
    const userId = this.props.match.params.id
    useEffect(() => {
        axios.get('http:/localhost:8080/fetchuser/' + userId)
        .then(res => setUserData(res.data))
    })
    const {email, date} = userData
    return (
        <div className='container text-center'>
            <div className='row' >
                <div className='col md-6'>
                    Email: {email}
                </div>
                <div className='col md-6'>
                    Date: {date}
                </div>
            </div>
        </div>
    )
}
