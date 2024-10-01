import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, Table, Image } from "react-bootstrap";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

const Banner = () => {
    const [bannerData, setBannerData] = useState({
        title: "",
        desc: "",
        price: "",
        image: null
    });
    const [banners, setBanners] = useState([]);
    const imagePath = "https://biznetusa.com/uploads/banners/";

    useEffect(() => {
        // Fetch banners on component mount
        const fetchBanners = async () => {
            try {
                const response = await fetch("https://biznetusa.com/api/get-banners");
                const data = await response.json();
                if (data.status === 200) {
                    setBanners(data.banners);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        fetchBanners();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerData({ ...bannerData, [name]: value });
    };

    const handleFileChange = (e) => {
        setBannerData({ ...bannerData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", bannerData.title);
        formData.append("desc", bannerData.desc);
        formData.append("price", bannerData.price);
        formData.append("image", bannerData.image);

        try {
            const response = await fetch("https://biznetusa.com/api/store-banner", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                alert("Banner uploaded successfully");
                setBannerData({ title: "", desc: "", price: "", image: null }); // Reset form
                const newBanner = await response.json();
                setBanners([...banners, newBanner.banners[0]]); // Update banner list
            } else {
                alert("Error uploading banner");
            }
        } catch (error) {
            console.error("Error uploading banner:", error);
            alert("An error occurred while uploading the banner.");
        }
    };

    return (
        <>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className=" col-lg-9 d-flex">

                        <Container fluid className="mt-4">
                            <Row>
                                <Col md={12} className="mx-auto">
                                    <Card className="shadow p-4">
                                        <Card.Title>Upload New Banner</Card.Title>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="title">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    value={bannerData.title}
                                                    onChange={handleChange}
                                                    placeholder="Enter banner title"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="desc">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="desc"
                                                    value={bannerData.desc}
                                                    onChange={handleChange}
                                                    placeholder="Enter banner description"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="price">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="price"
                                                    value={bannerData.price}
                                                    onChange={handleChange}
                                                    placeholder="Enter price"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="image">
                                                <Form.Label>Banner Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="image"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                            </Form.Group>

                                            <Button type="submit" variant="primary" className="mt-3">
                                                Upload Banner
                                            </Button>
                                        </Form>
                                    </Card>

                                    <Card className="shadow p-4 mt-4">
                                        <Card.Title>Existing Banners</Card.Title>
                                        <Table responsive bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                    <th>Image</th>
                                                    <th>Created At</th>
                                                    <th>Updated At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {banners.map((banner) => (
                                                    <tr key={banner.id}>
                                                        <td>{banner.id}</td>
                                                        <td>{banner.title}</td>
                                                        <td>{banner.desc}</td>
                                                        <td>{banner.price}</td>
                                                        <td>
                                                            {banner.image ? (
                                                                <Image
                                                                    src={`${imagePath}${banner.image}`}
                                                                    alt={banner.title}
                                                                    width={100}
                                                                />
                                                            ) : (
                                                                "No Image"
                                                            )}
                                                        </td>
                                                        <td>{new Date(banner.created_at).toLocaleString()}</td>
                                                        <td>{new Date(banner.updated_at).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
