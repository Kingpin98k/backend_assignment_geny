# Blog API with Comments - GenY Club Assignment

[🔥Link to Postman Collection🔥](https://api.postman.com/collections/28437070-8e3a41fc-50ef-425f-b6db-07302c790167?access_key=PMAT-01HEF5N4NDTD2PM24VMPKMYNZB)

I have implemented the assignment using Express as the backend framework. This README outlines the details for the Blog API with Comments, a part of the GenY Club assignment for both 1st and 2nd-year web development students. In this project, you will create a blog API that allows users to perform CRUD operations on blog posts and add comments to these posts, ensuring that only authorized users can access the system. You can choose between JWT or GoogleAuth for user authentication.

## Table of Contents
1. [Key Features](#key-features)
2. [Required Endpoints](#required-endpoints)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Authentication](#authentication)
6. [Endpoints](#endpoints)

## Key Features
- CRUD operations for blog posts.
- Users can add comments to blog posts.
- Comments support CRUD operations as well.
- Retrieve a list of all blog posts with comments.
- Ensure only authorized users can access the blog and its functionalities.

## Required Endpoints

### 1. Register a New User
**Endpoint:** POST /api/register
**Parameters:** 
- `username` (string)
- `email` (string)
- `password` (string)

**Actions:** Validates user information and creates a new user account.

### 2. User Authentication
**Endpoint:** POST /api/login
**Parameters:**
- `email` (string)
- `password` (string)

**Actions:** Validates credentials and generates a token for authorized access.

### Protected Blog and Comment Endpoints

### 3. Retrieve All Blog Posts with Comments
**Endpoint:** GET /api/posts

**Actions:** Retrieves all blog posts and associated comments. Accessible to authorized users.

### 4. Retrieve a Specific Blog Post with Comments by ID
**Endpoint:** GET /api/posts/:id

**Actions:** Retrieves a specific blog post and its comments. Accessible to authorized users.

### 5. Create a New Blog Post
**Endpoint:** POST /api/posts
**Parameters:** Blog post data (JSON)

**Actions:** Creates a new blog post. Accessible to authorized users.

### 6. Update an Existing Blog Post
**Endpoint:** PUT /api/posts/:id
**Parameters:** Blog post data (JSON)

**Actions:** Updates an existing blog post. Accessible to authorized users who own the blog post.

### 7. Delete a Blog Post
**Endpoint:** DELETE /api/posts/:id

**Actions:** Deletes a blog post. Accessible to authorized users who own the blog post.

### 8. Add a Comment to a Blog Post
**Endpoint:** POST /api/posts/:id/comments
**Parameters:** Comment data (JSON)

**Actions:** Adds a comment to a blog post. Accessible to authorized users.

### 9. Update a Comment
**Endpoint:** PUT /api/posts/:postId/comments/:commentId
**Parameters:** Comment data (JSON)

**Actions:** Updates a comment. Accessible to authorized users who own the comment.

### 10. Delete a Comment
**Endpoint:** DELETE /api/posts/:postId/comments/:commentId

**Actions:** Deletes a comment. Accessible to authorized users who own the comment.

## Installation
To get started with the Blog API, follow these steps:
1. Clone the repository.
2. Install the required dependencies.
3. Configure the database connection.
4. Set up authentication methods (JWT or GoogleAuth).
5. Start the server.

## Usage
You can use this API to build a blog platform where users can create, read, update, and delete blog posts. Users can also add comments to these blog posts. Make sure to implement user authentication to protect your data.

## Authentication
You can choose between JWT or GoogleAuth for user authentication. Follow the setup instructions in the project to configure your preferred method.

## Endpoints
Please refer to the "Required Endpoints" section above for details on the available endpoints.

Happy coding, and enjoy building your blog API with comments for the GenY Club assignment! If you have any questions or need further assistance, please reach out to the project maintainers.
