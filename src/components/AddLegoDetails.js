import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Form, Alert } from "react-bootstrap";
import firebase from '../firebase';

const AddLegoDetails = () => {
    const history = useHistory();
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [pieces, setPieces] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const handleAddLego = async (e) => {
        e.preventDefault();

        // Upload image to Firebase Storage
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${image.name}`);
        await imageRef.put(image);
        const imageUrl = await imageRef.getDownloadURL();

        try {
            const legosCollection = firebase.firestore().collection('legos');
            await legosCollection.add({
                category,
                description,
                imageUrl,
                name,
                pieces,
                price,
            });

            // Redirect back after adding the LEGO set
            history.push('/');
        } catch (error) {
            console.error('Error adding new lego:', error);
            setError('Failed to add LEGO set');
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <Card className="signup-card mt-5">
            <Card.Body>
                <h2 className="signup-title">Add LEGO</h2>
                {error && <Alert variant="danger" className="error-alert">{error}</Alert>}
                <Form onSubmit={handleAddLego}>
                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="pieces">
                        <Form.Label>Number of pieces:</Form.Label>
                        <Form.Control type="number" value={pieces} onChange={(e) => setPieces(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    </Form.Group>
                    <Button className="submit-button" type="submit">
                        Add LEGO
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddLegoDetails;
