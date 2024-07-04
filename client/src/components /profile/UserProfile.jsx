// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
// import { getUserData } from '../../managers/TaskManager.js';


// export const ProfileView = ({ loggedInUser }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (loggedInUser && loggedInUser.id) {
//       getUserData(loggedInUser.id).then((data) => {
//         setUserData(data);
//       });
//     }
//   }, [loggedInUser]);

//   if (!userData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <Container className="d-flex justify-content-center align-items-center min-vh-100">
//       <Row className="w-100">
//         <Col sm="12" md="8" lg="6" className="mx-auto">
//           <Card className="shadow-sm p-3 mb-5 bg-white rounded">
//             <CardBody>
//               <CardTitle tag="h3">Profile</CardTitle>
//               <CardText><strong>First Name:</strong> {userData.FirstName}</CardText>
//               <CardText><strong>Last Name:</strong> {userData.LastName}</CardText>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };
