import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <Container>
                <CssBaseline />
                <Button>
                    <Link to='/login'>Login</Link>
                </Button>
                <Button>
                    <Link to='/singup'>Signup</Link>
                </Button>

            </Container>
        </div>
    )
}
