/**
 * Reusable Pagination Utility
 * Extracts page/limit from query params and returns skip, limit, and metadata.
 *
 * Usage:
 *   const { skip, limit, page } = getPagination(req.query);
 *   const data = await Model.find().skip(skip).limit(limit);
 *   const paginationMeta = getPaginationMeta(page, limit, totalCount);
 */

/**
 * Parse pagination parameters from query string
 * @param {Object} query - req.query object
 * @returns {{ page: number, limit: number, skip: number }}
 */
const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Build pagination metadata for the response
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of documents
 * @returns {{ page, limit, total, totalPages, hasNextPage, hasPrevPage }}
 */
const getPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

module.exports = { getPagination, getPaginationMeta };
