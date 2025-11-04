const Blog = require('../model/BlogModel');



function getAllBlog(req, res) {
console.log("getAllBlogs called");
}

function getBlogById(req, res) {
console.log("getBlogById called");
}

function createBlog(req, res) {
console.log("createBlog called");
}

function updateBlog(req, res) {
console.log("updateBlog called");
}


function deleteBlog(req, res) {
console.log("deleteBlog called");
}


module.exports = {

getAllBlog,
getBlogById,
createBlog,
updateBlog,
deleteBlog,

};