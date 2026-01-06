const Blog = require('../model/BlogModel');


function getAllBlog(req, res) {

        Blog.find()
              .then(blogs => res.status(200).json({ success: true, data: blogs }))  
                .catch(err => res.status(500).json({ success: false, error: err.message }));
}

function getBlogById(req, res) {
console.log("getBlogById called");
}

function createBlog(req, res) {
    try {
        const newBlog = new Blog(req.body);
        newBlog.save()
            .then(blog => res.status(201).json({ success: true, data: blog }))
            .catch(err => res.status(500).json({ success: false, error: err.message }));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

function updateBlog(req, res) {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ success: false, error: 'Missing blog id' });

        if (req.body._id) delete req.body._id;

        const update = { ...req.body };

        Blog.findByIdAndUpdate(id, update, { new: true })
            .then(updated => {
                if (!updated) return res.status(404).json({ success: false, error: 'Blog not found' });
                return res.status(200).json({ success: true, data: updated });
            })
            .catch(err => res.status(500).json({ success: false, error: err.message }));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
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