import { sql } from '../config/db.js';
import { handleError } from '../helpers/errors.js';

export const getProducts = async (req, res) => {
    // Get All Products From Database
    try {
        const products = await sql`select * from products order by created_at desc`;
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log(error);
        return handleError("Server Error", res);
    }
};

export const createProduct = async (req, res) => {
    // Create Product
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
        return handleError("Please fill all fields", res);
    }

    try {

        const newProduct = await sql`
        insert into products (name, price, image) 
        values (${name}, ${price}, ${image}) 
        returning *
        `;
        res.status(201).json({
            success: true,
            data: newProduct[0]
        });
        console.log("New product added : ", newProduct);

    } catch (error) {
        console.log("Error in createProduct: ", error);
        return handleError("Server Error", res);

    }
};

export const getProduct = async (req, res) => {
    // Get Product By ID
    const { id } = req.params;
    try {
        const product = await sql`select * from products where id = ${id}`;
        if (product.length === 0) {
            return handleError("Product not found", res);
        }
        res.status(200).json({
            success: true,
            data: product[0]
        });
    } catch (error) {
        console.log("error in getProduct: ", error);
        return handleError("Server Error", res);
    }

}

export const updateProduct = async (req, res) => {
    // Update Product
    const { id } = req.params;
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
        return handleError("Please fill all fields", res);
    }
    try {
        const product = await sql`select * from products where id = ${id}`;
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        const updatedProduct = await sql`update products set name = ${name}, price = ${price}, image = ${image} where id = ${id} returning *`;
        res.status(200).json({
            success: true,
            data: updatedProduct[0]
        });
    } catch (error) {
        console.log("error in updateProduct: ", error);
        return handleError("Server Error", res);
    }

}

export const deleteProduct = async (req, res) => {
    // Delete Product
    const { id } = req.params;
    try {
        const product = await sql`select * from products where id = ${id}`;
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        const deletedProduct = await sql`delete from products where id = ${id} returning *`;
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: deletedProduct[0]
        });
    } catch (error) {
        console.log("error in deleteProduct: ", error);
        return handleError("Server Error", res);
    }
}