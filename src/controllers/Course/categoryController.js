const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

const CategoryService = require('../../services/course/categoryService');

// Configure AWS
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const deleteFileFromS3 = async key => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        });
        await s3Client.send(command);
    } catch (err) {
        console.error('Failed to delete old file from S3:', err);
    }
};

// Get categories by name
const getCategoryByNameAsync = async (req, res, next) => {
    try {
        const { categoryName } = req.query;
        const result = await CategoryService.getCategoryByNameAsync(categoryName);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Category found', 1);
        } else {
            res.sendCommonValue({}, 'Category not found', 0);
        }
    } catch (error) {
        next(error);
    }
};

// Get categories lists
const getCategoryListAsync = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const search = req.query.search;
    const parentId = req.query.parentId;
    const result = await CategoryService.getCategoryListAsync(page, pageSize, search, parentId);

    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Category list retrieved', 1);
    } else {
        res.sendCommonValue({}, 'No categories found', 0);
    }
};

// Add categories
const addCategoryAsync = async (req, res) => {
    const { categoryName } = req.body;
    const checkCategoryNameResult = await CategoryService.getCategoryByNameAsync(categoryName);

    if (checkCategoryNameResult.isSuccess) {
        return res.sendCommonValue({}, 'Category name already exists', 0);
    }

    const addCategoryResult = await CategoryService.addCategoryAsync(req.body);

    if (addCategoryResult.isSuccess) {
        res.sendCommonValue(addCategoryResult.data, 'Category added successfully', 1);
    } else {
        res.sendCommonValue({}, 'Failed to add category', 0);
    }
};

// Delete categories by id
const deleteCategoryByIdAsync = async (req, res) => {
    const { id } = req.params;
    const result = await CategoryService.deleteCategoryByIdAsync(id);

    if (result.isSuccess) {
        res.sendCommonValue({}, 'Category deleted successfully', 1);
    } else {
        res.sendCommonValue({}, 'Category not found', 0);
    }
};

// Get categories by id
const getCategoryByIdAsync = async (req, res) => {
    const id = parseInt(req.query.id, 10);

    const result = await CategoryService.getCategoryByIdAsync(id);

    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Category found', 1);
    } else {
        res.sendCommonValue([], 'Category not found', 0);
    }
};

// Update categories by id
const updateCategoryByIdAsync = async (req, res) => {
    const id = parseInt(req.query.id, 10);
    const newCategoryData = req.body;

    try {
        if (req.file) {
            const file = req.file;
            const fileExtension = file.originalname.split('.').pop();
            const s3Key = `category-icons/${uuidv4()}.${fileExtension}`;

            const command = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: s3Key,
                Body: file.buffer,
                ContentType: file.mimetype,
            });

            await s3Client.send(command);

            newCategoryData.iconUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
        }

        // Check for duplicate category name outside of file upload logic
        const checkCategoryNameResult = await CategoryService.getCategoryByNameAsync(
            newCategoryData.categoryName
        );

        if (checkCategoryNameResult.isSuccess && checkCategoryNameResult.data.id !== id) {
            return res.sendCommonValue({}, 'Category name already exists', 0);
        }

        // Update category with new data
        const updateCategoryResult = await CategoryService.updateCategoryByIdAsync(
            id,
            newCategoryData
        );

        if (updateCategoryResult.isSuccess) {
            return res.sendCommonValue(
                updateCategoryResult.data,
                'Category updated successfully',
                1
            );
        } else {
            return res.sendCommonValue({}, 'Failed to update category', 0);
        }
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ error: 'Failed to update category' });
    }
};
// Update categories by name
const updateCategoryByNameAsync = async (req, res) => {
    const { name } = req.query;
    const newCategoryData = req.body;
    const checkCategoryNameResult = await CategoryService.getCategoryByNameAsync(
        newCategoryData.categoryName
    );

    if (checkCategoryNameResult.isSuccess) {
        return res.sendCommonValue({}, 'Category name already exists', 0);
    }

    const updateCategoryResult = await CategoryService.updateCategoryByNameAsync(
        name,
        newCategoryData
    );

    if (updateCategoryResult.isSuccess) {
        res.sendCommonValue(updateCategoryResult.data, 'Category updated successfully', 1);
    } else {
        res.sendCommonValue({}, 'Failed to update category', 0);
    }
};

// Get category tree
const getCategoryTreeAsync = async (req, res) => {
    const result = await CategoryService.getCategoryTreeAsync();

    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Category tree retrieved', 1);
    } else {
        res.sendCommonValue({}, 'No categories found', 0);
    }
};

module.exports = {
    getCategoryByNameAsync,
    getCategoryListAsync,
    addCategoryAsync,
    deleteCategoryByIdAsync,
    getCategoryByIdAsync,
    updateCategoryByIdAsync,
    updateCategoryByNameAsync,
    getCategoryTreeAsync,
};
