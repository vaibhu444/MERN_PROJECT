import React, { useContext, useState } from "react";

import './PlaceItem.css'
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = (props) =>{

    const [showMap,setShowMap] = useState(false);
    const [showConfirmModal,setShowConfirmModal] = useState(false);
    const auth=useContext(AuthContext)

    const openMapHandler = ()=>setShowMap(true);

    const closeMapHandler = ()=>setShowMap(false);

    const showDeleteWarningHandler = () =>{
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = () =>{
        setShowConfirmModal(false);
    }

    const confirmDeleteHandler = () =>{
        console.log("deleting...")
    }

    return <React.Fragment>
        <Modal show={showMap} onCancel={closeMapHandler} header={props.address} contentClass="place-item__modal-content" footerClass="place-item__modal-actions" footer={<Button onClick={closeMapHandler}>CLOSE</Button>} >
            <div className="map-container">
                <h2>The Map !!</h2>
            </div>
        </Modal>
        <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?" footerClass="place-item__modal-actions" footer={
            <React.Fragment>
                <Button onClick={cancelDeleteHandler} inverse>CANCEL</Button>
                <Button onClick={confirmDeleteHandler} danger>DELETE</Button>
            </React.Fragment>
        }>
            <p>
                Do you want to proceed and delete this place ? please note that it can't undone thereafter.
            </p>
        </Modal>
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                    {auth.isLoggedIn && <Button to={`/places/${props.id}`}>Edit</Button> }
                    {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>Delete</Button>}
                </div>
            </Card>
        </li>
    </React.Fragment>
    
}

export default PlaceItem;