const post = require('../db/models/post');
const user = require('../db/models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createPost = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userId = req.user.id;
    const newPost = await post.create({
        title: body.title,
        // productImage: body.productImage,
        // price: body.price,
        // shortDescription: body.shortDescription,
        description: body.description,
        postUrl: body.postUrl,
        // category: body.category,
        // tags: body.tags,
        createdBy: userId,
    });

    return res.status(201).json({
        status: 'success',
        data: newPost,
    });
});

const getAllPost = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await post.findAll({
        include: user,
        where: { createdBy: userId },
    });

    return res.json({
        status: 'success',
        data: result,
    });
});

const getPostById = catchAsync(async (req, res, next) => {
    const postId = req.params.id;
    const result = await post.findByPk(postId, { include: user });
    if (!result) {
        return next(new AppError('Invalid post id', 400));
    }
    return res.json({
        status: 'success',
        data: result,
    });
});

const updatePost = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const postId = req.params.id;
    const body = req.body;

    const result = await post.findOne({
        where: { id: postId, createdBy: userId },
    });

    if (!result) {
        return next(new AppError('Invalid post id', 400));
    }

    result.title = body.title;
    // result.productImage = body.productImage;
    // result.price = body.price;
    // result.shortDescription = body.shortDescription;
    result.description = body.description;
    result.postUrl = body.postUrl;
    // result.category = body.category;
    // result.tags = body.tags;

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deletePost = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const postId = req.params.id;
    const body = req.body;

    const result = await post.findOne({
        where: { id: postId, createdBy: userId },
    });

    if (!result) {
        return next(new AppError('Invalid post id', 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

module.exports = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
};
