import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const AdminFrontpage = () => {
    return (
        <Row>

            <Col md={{span: 4, offset: 4}}>
                <h1>Admin</h1>
                <p className='mainText admin'>Velkommen til admin siden. I denne del af hjemmesiden kan du rette data på hjemmesiden <br />
                    Brug navigationsbaren til at finde den kategori af data du vil rette.
                </p>
            </Col>



        </Row>
    )
}

export default AdminFrontpage