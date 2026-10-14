
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Plus, Pencil, Trash2, LogOut , X} from "lucide-react"

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [checkingAccess, setCheckingAccess] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Wristwatches")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [inStock, setInStock] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)


  async function fetchProducts() {
    setLoading(true)
    setError("")

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      setProducts(data)
    }

    setLoading(false)
  }


  
async function uploadProductImage(file) {
  if (!file) return null

  // Check the file size (maximum 5 MB).
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be 5 MB or smaller.")
  }

  // Allow only supported image formats.
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ]

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Please select a JPG, PNG, WEBP, or GIF image.")
  }

  // Create a unique filename.
  const filePath = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`

  // Upload the file to Supabase Storage.
  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) {
    throw uploadError
  }

  // Get the public URL for the uploaded image.
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath)

  return data.publicUrl
}



      
    async function handleAddProduct(event) {
      event.preventDefault()

      setFormError("")
      setFormSuccess("")

      // Check that the product name and price are valid.
      const productName = name.trim()
      const productPrice = Number(price)

      if (!productName) {
        setFormError("Please enter a product name.")
        return
      }

      if (price === "" || !Number.isFinite(productPrice) || productPrice < 0) {
        setFormError("Please enter a valid price.")
        return
      }

      
      setSaving(true)

      try {
        const uploadedImage = imageFile
          ? await uploadProductImage(imageFile)
          : image.trim() || null

        const { error } = await supabase
          .from("products")
          .insert([
            {
              name: productName,
              category,
              price: productPrice,
              image: uploadedImage,
              in_stock: inStock,
            },
          ])

        if (error) {
          setFormError(error.message)
          setSaving(false)
          return
        }

        await fetchProducts()

        setName("")
        setCategory("Wristwatches")
        setPrice("")
        setImage("")
        setImageFile(null)
        setInStock(true)

        setFormSuccess("Product added successfully!")
      } catch (error) {
        setFormError(error.message || "Unable to upload the product image.")
      } finally {
        setSaving(false)
      }
    }
    
async function handleUpdateProduct(event) {
  event.preventDefault()

  if (!editingProduct) return

  setFormError("")
  setFormSuccess("")

  const productName = name.trim()
  const productPrice = Number(price)

  if (!productName) {
    setFormError("Please enter a product name.")
    return
  }

  if (price === "" || !Number.isFinite(productPrice) || productPrice < 0) {
    setFormError("Please enter a valid price.")
    return
  }

  
    setSaving(true)

    try {
      const updatedImage = imageFile
        ? await uploadProductImage(imageFile)
        : image.trim() || null

      const { error } = await supabase
        .from("products")
        .update({
          name: productName,
          category,
          price: productPrice,
          image: updatedImage,
          in_stock: inStock,
        })
        .eq("id", editingProduct.id)

      if (error) {
        setFormError(error.message)
        setSaving(false)
        return
      }

      await fetchProducts()

      setEditingProduct(null)
      setName("")
      setCategory("Wristwatches")
      setPrice("")
      setImage("")
      setImageFile(null)
      setInStock(true)
      setShowForm(false)
      setFormSuccess("Product updated successfully!")
    } catch (error) {
      setFormError(error.message || "Unable to upload the product image.")
    } finally {
      setSaving(false)
    }
}

async function handleDeleteProduct(product) {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
  )

  if (!confirmed) return

  setError("")

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", product.id)

  if (error) {
    setError(error.message)
    return
  }

  await fetchProducts()
}



    
function handleEditClick(product) {
  setEditingProduct(product)
  setName(product.name)
  setCategory(product.category)
  setPrice(String(product.price))
  setImage(product.image || "")
  setImageFile(null)
  setInStock(product.in_stock)
  setFormError("")
  setFormSuccess("")
  setShowForm(true)
}



    
  useEffect(() => {
    async function checkAdminAccess() {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        window.location.replace("/admin")
        return
      }

      const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_store_admin")

      if (adminError || !isAdmin) {
        await supabase.auth.signOut()
        window.location.replace("/admin")
        return
      }

      await fetchProducts()
      setCheckingAccess(false)
    }

    checkAdminAccess()
  }, [])


  async function handleLogout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      setError(error.message)
      return
    }

    window.location.href = "/admin"
  }

  if (checkingAccess) {
  return (
    <p className="p-10 text-center">
      Verifying administrator access...
    </p>
  )
}

  return (
    <main className="min-h-screen bg-brand-cream p-5 md:p-10">

      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-rose">
            Oyinsjewelries
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-burgundy">
            Product Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your store inventory.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-brand-rose/30 px-4 py-3 font-semibold cursor-pointer text-brand-burgundy hover:bg-brand-pink"
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <section className="mx-auto mt-10 max-w-6xl rounded-2xl bg-white p-5 shadow-sm md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-brand-burgundy">
              Your Products
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {products.length} product(s) in your database
            </p>
          </div>

          
          <button
            onClick={() => {
              setShowForm(!showForm)
              setFormError("")
              setFormSuccess("")
            }}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-brand-burgundy px-5 py-3 font-semibold text-white transition hover:bg-brand-rose"
          >
            {!showForm ? <Plus size={18} /> : <X size={18} /> }
            {showForm ? "Close Form" : "Add Product"}
          </button>

        </div>


    {showForm && (
      <form
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        className="mt-6 rounded-2xl border border-brand-pink bg-brand-cream p-5"
      >
        <h3 className="text-lg font-bold text-brand-burgundy">
          {editingProduct ? "Edit Product" : "Add a New Product"}
        </h3>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Gold Wristwatch"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3"
            >
              <option>Wristwatches</option>
              <option>Necklaces</option>
              <option>Earrings</option>
              <option>Bracelets</option>
              <option>Rings</option>
              <option>Hand Chains</option>
              <option>Anklets</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Price (₦)</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="e.g. 35000"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://example.com/product.jpg"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3"
            />
          </div>

        
          <div>
            <label className="text-sm font-semibold">
              Upload Product Photo
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) => {
                setImageFile(event.target.files?.[0] || null)
              }}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3"
            />

            <p className="mt-1 text-xs text-gray-500">
              Choose JPG, PNG, WEBP, or GIF. Maximum size: 5 MB.
            </p>
          </div>


        </div>

        <label className="mt-5 flex items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(event) => setInStock(event.target.checked)}
            className="h-4 w-4 accent-brand-rose"
          />
          Product is in stock
        </label>

        {formError && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {formError}
          </p>
        )}

        {formSuccess && (
          <p role="status" className="mt-4 text-sm text-green-700">
            {formSuccess}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 cursor-pointer rounded-full bg-brand-burgundy px-6 py-3 font-semibold text-white hover:bg-brand-rose disabled:opacity-60"
        >
          {saving ? "Saving Product..." : editingProduct ? "Update Product" : "Save Product"}
        </button>
      </form>
    )}

    {error && (
      <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">
        {error}
      </p>
    )}


        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="px-3 py-4">Product</th>
                  <th className="px-3 py-4">Category</th>
                  <th className="px-3 py-4">Price</th>
                  <th className="px-3 py-4">Stock</th>
                  <th className="px-3 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50">
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-brand-pink" />
                        )}

                        <span className="font-semibold text-brand-burgundy">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-4">{product.category}</td>

                    <td className="px-3 py-4 font-semibold">
                      ₦{Number(product.price).toLocaleString()}
                    </td>

                    <td className="px-3 py-4">
                      {product.in_stock ? "In stock" : "Out of stock"}
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex gap-2">
                        
                        <button
                          onClick={() => handleEditClick(product)}
                          title={`Edit ${product.name}`}
                          aria-label={`Edit ${product.name}`}
                          className="rounded-lg border cursor-pointer border-gray-200 p-2 transition hover:bg-brand-pink"
                        >
                          <Pencil size={16} />
                        </button>


                        
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          title={`Delete ${product.name}`}
                          aria-label={`Delete ${product.name}`}
                          className="rounded-lg cursor-pointer border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default AdminDashboard
