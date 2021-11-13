
import React from 'react';
import * as axios from 'axios'
import Users from './Users';

localStorage.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MThkMDBjYTI4NTc1MDBhODEzYzQ3YTMiLCJsb2dpbiI6InRlc3RvcyIsImFjbCI6WyI2MThkMDBjYTI4NTc1MDBhODEzYzQ3YTMiLCJ1c2VyIl19LCJpYXQiOjE2MzY2MzA4MTl9.i7iEIo_b5BK1v2UB5GrFzbp2NqLncBVZtOc0jLtab54'

class UsersAPIComponent extends React.Component {

    componentDidMount() {

        //         axios.post('graphql/', {
        //             query: `
        //         query users{
        //   UserFind(query:"[{}]") {
        //     _id
        //     createdAt
        //     login
        //     nick
        //   }
        // } `,
        //         }, { headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {} })
        //             .then((response) => {
        //                 console.log(response);
        //             });
        axios.get(`https://social-network.samuraijs.com/api/1.0/users`)
            .then(response => {
                this.props.setUsers(response.data.items);

            })

    }

    render() {
        return <Users />
    }


}

export default UsersAPIComponent;