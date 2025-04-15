export const handleError = (error, res) => {
    if(error == "Server Error") {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
    if(error == "Product not found") {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    if(error == "Please fill all fields") {
        return res.status(400).json({
            success: false,
            message: 'Please fill all fields'
        });
    }
    if(error == "Invalid ID") {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID'
        });
    }
    if(error == "Invalid Product") {
        return res.status(400).json({
            success: false,
            message: 'Invalid Product'
        });
    }
}