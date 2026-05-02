
import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import LoadingStyle from "../../../utils/loadingStyle"
const SparePartsProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  // Category State
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState("existing");

  // Add Product Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    make: "",
    forModel: "",
    year: "",
    condition: "",
    horizontalPosition: "",
    verticalPosition: "",
    categoryName: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch All Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/Products/Provider/my-products");
      const data = res.data?.data || res.data || [];
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/Products/Provider/Categories");
        const data = res.data?.data || res.data || [];
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/Products/Delete-product/${productId}`);
      alert("✅ Product deleted successfully!");
      fetchProducts(); // تحديث الجدول بعد الحذف
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.productId);

    // تظهير الفئة إذا كانت موجودة أو جديدة
    const isExistingCat = categories.some(c => (c.name || c) === product.categoryName);
    setCategoryType(isExistingCat ? "existing" : "new");

    // معالجة حالة المنتج (عشان لو جيالك كلمات نحولها لأرقام للراديو باتونز)
    let condValue = String(product.condition || "").toLowerCase().trim();
    if (condValue === "new") condValue = "1";
    else if (condValue === "used") condValue = "2";
    else if (condValue === "refurbished") condValue = "3";

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stockQuantity: product.stockQuantity || "",
      make: product.make || "",
      forModel: product.forModel || "",
      year: product.year || "",
      condition: condValue,
      horizontalPosition: String(product.horizontalPosition || ""),
      verticalPosition: String(product.verticalPosition || ""),
      categoryName: product.categoryName || "",
    });

    // معالجة عرض الصورة القديمة في الـ Preview
    const SERVER_URL = "http://careboxapi.runasp.net";
    const rawPath = (product.images && product.images.length > 0)
      ? product.images[0].imageUrl
      : (product.imageUrl || "");

    const fullImageUrl = rawPath && !rawPath.startsWith("http")
      ? `${SERVER_URL}${rawPath.startsWith("/") ? "" : "/"}${rawPath}`
      : rawPath;

    setPreviewUrl(fullImageUrl || null);
    setImageFile(null); // بنخلي الفايل بـ null عشان لو مرفعش صورة جديدة يفضل القديم

    setShowAddModal(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  //   const resetForm = () => {
  //   setFormData({
  //     name: "", description: "", price: "", stockQuantity: "",
  //     make: "", forModel: "", year: "", condition: "",
  //     horizontalPosition: "1", verticalPosition: "1", categoryName: ""
  //   });
  //   setImageFile(null);
  //   setPreviewUrl(null);
  //   setCategoryType("existing");  
  // };

  const resetForm = () => {
    setFormData({
      name: "", description: "", price: "", stockQuantity: "",
      make: "", forModel: "", year: "", condition: "",
      horizontalPosition: "1", verticalPosition: "1", categoryName: ""
    });
    setImageFile(null);
    setPreviewUrl(null);
    setCategoryType("existing");
    setEditingProductId(null); // تصفير الـ ID
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.name || !formData.price || !formData.stockQuantity || !formData.categoryName) {
  //     alert("Please fill all required fields");
  //     return;
  //   }

  //   const data = new FormData();
  //   data.append("Name", formData.name);
  //   data.append("Description", formData.description);
  //   data.append("Price", formData.price);
  //   data.append("StockQuantity", formData.stockQuantity);
  //   data.append("Make", formData.make);
  //   data.append("ForModel", formData.forModel);
  //   data.append("Year", formData.year);
  //   data.append("Condition", formData.condition);
  //       // Horizontal & Vertical Position (اختياري)
  //   if (formData.horizontalPosition) {
  //     data.append("HorizontalPosition", formData.horizontalPosition);
  //   }
  //   if (formData.verticalPosition) {
  //     data.append("VerticalPosition", formData.verticalPosition);
  //   }
  //   data.append("CategoryName", formData.categoryName);

  //   if (imageFile) {
  //     data.append("Image", imageFile);
  //   }

  //   try {
  //     await api.post("/Products/Provider/add-product", data, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     alert("✅ Product added successfully!");

  //     // إضافة الكاتيجوري الجديد للقائمة المحلية
  //     if (categoryType === "new" && formData.categoryName) {
  //       const newCatName = formData.categoryName.trim();
  //       if (!categories.some(cat => cat === newCatName)) {
  //         setCategories([...categories, newCatName]);
  //       }
  //     }

  //     setShowAddModal(false);
  //     fetchProducts();
  //     resetForm();
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Failed to add product: " + (err.response?.data?.message || err.message));
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stockQuantity || !formData.categoryName) {
      alert("Please fill all required fields");
      return;
    }

    const data = new FormData();
    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("Price", formData.price);
    data.append("StockQuantity", formData.stockQuantity);
    data.append("Make", formData.make);
    data.append("ForModel", formData.forModel);
    data.append("Year", formData.year);
    data.append("Condition", formData.condition);

    if (formData.horizontalPosition) data.append("HorizontalPosition", formData.horizontalPosition);
    if (formData.verticalPosition) data.append("VerticalPosition", formData.verticalPosition);
    data.append("CategoryName", formData.categoryName);

    if (imageFile) {
      data.append("Image", imageFile); // هتتبعت بس لو اختار صورة جديدة
    }

    try {
      if (editingProductId) {
        // تعديل (PUT)
        await api.put(`/Products/Update-product/${editingProductId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product updated successfully!");
      } else {
        // إضافة (POST)
        await api.post("/Products/Provider/add-product", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product added successfully!");
      }

      if (categoryType === "new" && formData.categoryName) {
        const newCatName = formData.categoryName.trim();
        if (!categories.some(cat => (cat.name || cat) === newCatName)) {
          setCategories([...categories, newCatName]);
        }
      }

      setShowAddModal(false);
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error(err);
      alert(`❌ Failed to ${editingProductId ? 'update' : 'add'} product: ` + (err.response?.data?.message || err.message));
    }
  };

  // Filtered and Sorted Products
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(term)
      );
    }

    // Filter by Category
    if (filterCategory) {
      result = result.filter(p => p.categoryName === filterCategory);
    }

    // Filter by Condition
    if (filterCondition) {
      result = result.filter(p => String(p.condition) === filterCondition);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "stock-high") {
      result.sort((a, b) => Number(b.stockQuantity) - Number(a.stockQuantity));
    } else {
      // newest (افتراضي)
      result.sort((a, b) => (b.productId || 0) - (a.productId || 0));
    }

    return result;
  }, [products, searchTerm, filterCategory, filterCondition, sortBy]);
  return (
    <div className="p-4 p-lg-5 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Products</h2>
        <button
          className="btn btn-dark px-4 py-2 d-flex align-items-center gap-2"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          <i className="fas fa-plus"></i> Add New Product
        </button>
      </div>
      {/* Filters & Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body py-3">
          <div className="row g-3 align-items-center">
            <div className="col-lg-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              <select
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat.name || cat}>
                    {cat.name || cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-lg-2">
              <select
                className="form-select"
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
              >
                <option value="">All Conditions</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>

            <div className="col-lg-3 text-lg-end">
              <div className="d-flex align-items-center justify-content-lg-end gap-2">
                <span className="text-muted small">Sort by:</span>
                <select
                  className="form-select w-auto"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="stock-high">Stock: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <LoadingStyle />
                  <td colSpan="6" className="text-center py-5">Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  // --- منطق "البروفايل" لبناء رابط الصورة ---
                  const SERVER_URL = "http://careboxapi.runasp.net";

                  // بنجيب المسار من المصفوفة images (أول عنصر) زي ما الكونسول قال
                  const rawPath = (product.images && product.images.length > 0)
                    ? product.images[0].imageUrl
                    : (product.imageUrl || ""); // احتياطي لو الاسم اتغير

                  const fullImageUrl = rawPath && !rawPath.startsWith("http")
                    ? `${SERVER_URL}${rawPath.startsWith("/") ? "" : "/"}${rawPath}`
                    : (rawPath || "https://via.placeholder.com/60?text=No+Img");
                  // ---------------------------------------

                  return (
                    <tr key={product.productId}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {/* استبدلنا السطر القديم بالصورة المظبوطة */}
                          <img
                            src={fullImageUrl}
                            alt={product.name}
                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                            onError={(e) => { e.target.src = "https://via.placeholder.com/60?text=No+Img"; }}
                          />
                          <div>
                            <div className="fw-semibold">{product.name}</div>
                            <small className="text-muted">ID: {product.productId}</small>
                          </div>
                        </div>
                      </td>
                      <td>{product.categoryName || "—"}</td>
                      <td>
                        <Badge
                          bg={
                            product.condition === "New" ? "success" :
                              product.condition === "Used" ? "warning" :
                                "secondary"
                          }
                        >
                          {product.condition}
                        </Badge>
                      </td>
                      <td><strong>{Number(product.price || 0).toLocaleString()} EGP</strong></td>
                      <td>
                        <span className={product.stockQuantity < 10 ? "text-danger fw-bold" : ""}>
                          {product.stockQuantity}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-link text-primary p-1 me-2"
                          onClick={() => handleEditClick(product)}
                        >
                          <i className="fas fa-pencil"></i>
                        </button>
                        <button
                          className="btn btn-link text-danger p-1"
                          onClick={() => handleDelete(product.productId)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================== Add New Product Modal ====================== */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingProductId ? "Edit Product" : "Add New Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Product Image */}
            <div className="mb-4">
              <Form.Label className="fw-semibold">Product Image</Form.Label>
              <div
                className="border border-2 border-dashed rounded-3 p-5 text-center"
                style={{ backgroundColor: "#f8f9fa", cursor: "pointer" }}
                onClick={() => document.getElementById("imageInput").click()}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="img-fluid" style={{ maxHeight: "200px" }} />
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                    <p className="mb-1 fw-medium">Click to upload or drag and drop</p>
                    <small className="text-muted">PNG, JPG, GIF (max 800×400px)</small>
                  </>
                )}
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Premium Ceramic Brake Pads"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <div className="btn-group w-100 mb-3" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="categoryType"
                      id="existing"
                      value="existing"
                      checked={categoryType === "existing"}
                      onChange={(e) => setCategoryType(e.target.value)}
                    />
                    <label className="btn btn-outline-dark" htmlFor="existing">Existing Category</label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="categoryType"
                      id="new"
                      value="new"
                      checked={categoryType === "new"}
                      onChange={(e) => setCategoryType(e.target.value)}
                    />
                    <label className="btn btn-outline-dark" htmlFor="new">New Category</label>
                  </div>

                  {categoryType === "existing" && (
                    <Form.Select
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select existing category...</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </Form.Select>
                  )}

                  {categoryType === "new" && (
                    <Form.Control
                      type="text"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleChange}
                      placeholder="e.g. Air Conditioning Repair"
                      required
                    />
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price (LE)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Brand (Make)</Form.Label>
                  <Form.Control
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="Toyota"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="forModel"
                    value={formData.forModel}
                    onChange={handleChange}
                    placeholder="Corolla"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Position - اختياري */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Vertical Position <span className="text-muted"></span></Form.Label>
                  <Form.Select
                    name="verticalPosition"
                    value={formData.verticalPosition}
                    onChange={handleChange}
                  >
                    <option value="">none</option>
                    <option value="1">Front</option>
                    <option value="2">Rear</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Horizontal Position <span className="text-muted"></span></Form.Label>
                  <Form.Select
                    name="horizontalPosition"
                    value={formData.horizontalPosition}
                    onChange={handleChange}
                  >
                    <option value="">none</option>
                    <option value="1">Right</option>
                    <option value="2">Left</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Condition</Form.Label>
                  <div className="d-flex gap-4 mt-2">
                    <Form.Check
                      type="radio"
                      label="New"
                      name="condition"
                      value="1"
                      checked={formData.condition === "1"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Used"
                      name="condition"
                      value="2"
                      checked={formData.condition === "2"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Refurbished"
                      name="condition"
                      value="3"
                      checked={formData.condition === "3"}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product..."
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            {editingProductId ? "Update Product" : "Save Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SparePartsProducts;