import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';
import firebase from '../firebase';

const EditLegoDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [pieces, setPieces] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchLego = async () => {
            try {
                const legoDoc = await firebase.firestore().collection('legos').doc(id).get();
                const legoData = legoDoc.data();
                setCategory(legoData.category);
                setDescription(legoData.description);
                setName(legoData.name);
                setPieces(legoData.pieces);
                setPrice(legoData.price);
            } catch (error) {
                console.error('Error fetching lego details:', error);
            }
        };

        fetchLego();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const legosCollection = firebase.firestore().collection('legos');
            const updateData = {
                category,
                description,
                name,
                pieces,
                price,
            };

            // Update only if a new image is selected
            if (image) {
                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(`images/${image.name}`);
                await imageRef.put(image);
                updateData.imageUrl = await imageRef.getDownloadURL();
            }

            await legosCollection.doc(id).update(updateData);

            history.push('/');
        } catch (error) {
            console.error('Error updating lego details:', error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="signup-card mt-5">
            <h2 className="submit-title">Edit LEGO</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group as={Col} controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="category">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="pieces">
                    <Form.Label>Number of pieces:</Form.Label>
                    <Form.Control type="number" value={pieces} onChange={(e) => setPieces(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="price">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="image">
                    <Form.Label>Upload Image:</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
                <Button className="submit-button" variant="primary" type="submit">
                    Edit LEGO
                </Button>
            </Form>
        </div>
    );
};

export default EditLegoDetails;
